/**
 * Loyalty Rewards Backend Server
 * Handles off-chain signature generation, user management, and blockchain interactions
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console()
  ]
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Blockchain setup
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.infura.io/v3/your-project-id');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000000', provider);

// Contract ABI (simplified - full ABI would be generated from compilation)
const CONTRACT_ABI = [
  "function registerUser() external",
  "function recordPurchase(address merchant, uint256 purchaseAmount, bytes memory signature) external",
  "function stakeTokens(uint256 amount, uint256 duration) external",
  "function unstakeTokens() external",
  "function getUserStats(address user) external view returns (uint256, uint256, uint256, uint256, uint256, uint8, uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "event PurchaseRecorded(address indexed user, address indexed merchant, uint256 amount, uint256 tokensEarned)",
  "event TokensStaked(address indexed user, uint256 amount, uint256 duration)"
];

const contractAddress = process.env.CONTRACT_ADDRESS;
let contract;

if (contractAddress) {
  contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
}

// In-memory cache for pending transactions
const pendingTransactions = new Map();
const userSessions = new Map();

// Routes

/**
 * @route GET /api/health
 * @desc Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    blockchain: {
      connected: provider ? true : false,
      network: process.env.NETWORK || 'sepolia'
    }
  });
});

/**
 * @route POST /api/auth/nonce
 * @desc Generate a nonce for wallet authentication
 */
app.post('/api/auth/nonce', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }
    
    const nonce = ethers.hexlify(ethers.randomBytes(32));
    const timestamp = Date.now();
    
    userSessions.set(walletAddress.toLowerCase(), {
      nonce,
      timestamp,
      authenticated: false
    });
    
    logger.info(`Nonce generated for ${walletAddress}`);
    
    res.json({
      nonce,
      message: `Sign this message to authenticate: ${nonce}`
    });
  } catch (error) {
    logger.error('Error generating nonce:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route POST /api/auth/verify
 * @desc Verify wallet signature and authenticate user
 */
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;
    
    if (!walletAddress || !signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const session = userSessions.get(walletAddress.toLowerCase());
    if (!session) {
      return res.status(400).json({ error: 'No active session found' });
    }
    
    // Verify signature
    const message = `Sign this message to authenticate: ${session.nonce}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    session.authenticated = true;
    session.authenticatedAt = Date.now();
    
    logger.info(`User authenticated: ${walletAddress}`);
    
    res.json({
      success: true,
      walletAddress,
      authenticated: true
    });
  } catch (error) {
    logger.error('Error verifying signature:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route POST /api/rewards/generate-signature
 * @desc Generate signature for purchase recording
 */
app.post('/api/rewards/generate-signature', async (req, res) => {
  try {
    const { walletAddress, merchantAddress, purchaseAmount, timestamp } = req.body;
    
    // Validate inputs
    if (!walletAddress || !merchantAddress || !purchaseAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!ethers.isAddress(walletAddress) || !ethers.isAddress(merchantAddress)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }
    
    // Check user authentication
    const session = userSessions.get(walletAddress.toLowerCase());
    if (!session || !session.authenticated) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Create message hash
    const messageHash = ethers.keccak256(
      ethers.solidityPacked(
        ['address', 'address', 'uint256', 'uint256'],
        [walletAddress, merchantAddress, purchaseAmount, timestamp || Date.now()]
      )
    );
    
    // Sign the message
    const signature = await signer.signMessage(ethers.getBytes(messageHash));
    
    // Store pending transaction
    const txId = ethers.keccak256(ethers.toUtf8Bytes(`${walletAddress}-${Date.now()}`));
    pendingTransactions.set(txId, {
      walletAddress,
      merchantAddress,
      purchaseAmount,
      signature,
      timestamp: Date.now(),
      status: 'pending'
    });
    
    logger.info(`Signature generated for purchase: ${txId}`);
    
    res.json({
      success: true,
      txId,
      signature,
      messageHash,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes expiry
    });
  } catch (error) {
    logger.error('Error generating signature:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route GET /api/rewards/user-stats/:walletAddress
 * @desc Get user loyalty stats from blockchain
 */
app.get('/api/rewards/user-stats/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    if (!ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }
    
    if (!contract) {
      return res.status(503).json({ error: 'Contract not initialized' });
    }
    
    const stats = await contract.getUserStats(walletAddress);
    const balance = await contract.balanceOf(walletAddress);
    
    const tierNames = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
    
    res.json({
      success: true,
      data: {
        totalPurchases: stats[0].toString(),
        totalSpent: ethers.formatEther(stats[1]),
        tokensEarned: ethers.formatEther(stats[2]),
        tokensStaked: ethers.formatEther(stats[3]),
        pendingStakingReward: ethers.formatEther(stats[4]),
        currentTier: tierNames[stats[5]],
        nextTierProgress: stats[6].toString(),
        tokenBalance: ethers.formatEther(balance)
      }
    });
  } catch (error) {
    logger.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

/**
 * @route POST /api/rewards/calculate-reward
 * @desc Calculate potential reward for a purchase (off-chain estimation)
 */
app.post('/api/rewards/calculate-reward', async (req, res) => {
  try {
    const { walletAddress, purchaseAmount, merchantAddress } = req.body;
    
    if (!walletAddress || !purchaseAmount || !merchantAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Get user stats
    let userTier = 0; // BRONZE default
    let activityBonus = 0;
    let stakingBonus = 0;
    
    if (contract) {
      try {
        const stats = await contract.getUserStats(walletAddress);
        userTier = Number(stats[5]);
        
        // Calculate activity bonus
        const lastActivity = Number(stats[0]) > 0 ? Date.now() / 1000 : 0;
        const daysSinceActivity = Math.floor((Date.now() / 1000 - lastActivity) / 86400);
        
        if (daysSinceActivity <= 7) activityBonus = 20;
        else if (daysSinceActivity <= 30) activityBonus = 10;
        
        // Calculate staking bonus
        const staked = Number(ethers.formatEther(stats[3]));
        const balance = Number(ethers.formatEther(await contract.balanceOf(walletAddress)));
        if (staked > 0 && balance > 0) {
          const stakeRatio = (staked / (balance + staked)) * 100;
          stakingBonus = Math.min(stakeRatio * 0.25, 25);
        }
      } catch (e) {
        logger.warn('Could not fetch user stats, using defaults');
      }
    }
    
    // Tier multipliers
    const tierMultipliers = [1, 1.25, 1.5, 2, 3];
    const baseMultiplier = tierMultipliers[userTier];
    const totalMultiplier = baseMultiplier + (activityBonus / 100) + (stakingBonus / 100);
    
    // Calculate reward (assuming 10% base reward rate)
    const baseReward = Number(purchaseAmount) * 0.1;
    const finalReward = baseReward * totalMultiplier;
    
    res.json({
      success: true,
      data: {
        purchaseAmount,
        baseReward: baseReward.toFixed(4),
        finalReward: finalReward.toFixed(4),
        multiplier: totalMultiplier.toFixed(2),
        breakdown: {
          tierMultiplier: baseMultiplier,
          activityBonus: `${activityBonus}%`,
          stakingBonus: `${stakingBonus.toFixed(2)}%`,
          userTier: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'][userTier]
        }
      }
    });
  } catch (error) {
    logger.error('Error calculating reward:', error);
    res.status(500).json({ error: 'Calculation failed' });
  }
});

/**
 * @route GET /api/merchants
 * @desc Get list of registered merchants
 */
app.get('/api/merchants', async (req, res) => {
  // This would typically come from a database
  // For demo purposes, returning mock data
  res.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'Demo Merchant 1',
        address: '0x1234567890123456789012345678901234567890',
        rewardRate: '10%',
        isActive: true
      },
      {
        id: '2',
        name: 'Demo Merchant 2',
        address: '0x0987654321098765432109876543210987654321',
        rewardRate: '15%',
        isActive: true
      }
    ]
  });
});

/**
 * @route GET /api/achievements
 * @desc Get available achievements
 */
app.get('/api/achievements', async (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'FIRST_PURCHASE',
        name: 'First Steps',
        description: 'Complete your first purchase',
        tokenReward: '100',
        requiredPurchases: 1,
        requiredSpending: '0'
      },
      {
        id: 'BIG_SPENDER',
        name: 'Big Spender',
        description: 'Spend over 1 ETH in total',
        tokenReward: '1000',
        requiredPurchases: 0,
        requiredSpending: '1'
      },
      {
        id: 'LOYAL_CUSTOMER',
        name: 'Loyal Customer',
        description: 'Make 10 purchases',
        tokenReward: '500',
        requiredPurchases: 10,
        requiredSpending: '0'
      },
      {
        id: 'DIAMOND_HANDS',
        name: 'Diamond Hands',
        description: 'Stake tokens for 30 days',
        tokenReward: '2000',
        requiredPurchases: 0,
        requiredSpending: '0'
      }
    ]
  });
});

/**
 * @route POST /api/webhook/transaction
 * @desc Webhook for transaction events from blockchain
 */
app.post('/api/webhook/transaction', async (req, res) => {
  try {
    const { txHash, event, data } = req.body;
    
    logger.info(`Webhook received: ${event} - ${txHash}`);
    
    // Process the event
    // This would update database, send notifications, etc.
    
    res.json({ success: true });
  } catch (error) {
    logger.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; * Loyalty Rewards Backend Server
 * Handles off-chain signature generation, user management, and blockchain interactions
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console()
  ]
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Blockchain setup
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.infura.io/v3/your-project-id');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000000', provider);

// Contract ABI (simplified - full ABI would be generated from compilation)
const CONTRACT_ABI = [
  "function registerUser() external",
  "function recordPurchase(address merchant, uint256 purchaseAmount, bytes memory signature) external",
  "function stakeTokens(uint256 amount, uint256 duration) external",
  "function unstakeTokens() external",
  "function getUserStats(address user) external view returns (uint256, uint256, uint256, uint256, uint256, uint8, uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "event PurchaseRecorded(address indexed user, address indexed merchant, uint256 amount, uint256 tokensEarned)",
  "event TokensStaked(address indexed user, uint256 amount, uint256 duration)"
];

const contractAddress = process.env.CONTRACT_ADDRESS;
let contract;

if (contractAddress) {
  contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
}

// In-memory cache for pending transactions
const pendingTransactions = new Map();
const userSessions = new Map();

// Routes

/**
 * @route GET /api/health
 * @desc Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    blockchain: {
      connected: provider ? true : false,
      network: process.env.NETWORK || 'sepolia'
    }
  });
});

/**
 * @route POST /api/auth/nonce
 * @desc Generate a nonce for wallet authentication
 */
app.post('/api/auth/nonce', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }
    
    const nonce = ethers.hexlify(ethers.randomBytes(32));
    const timestamp = Date.now();
    
    userSessions.set(walletAddress.toLowerCase(), {
      nonce,
      timestamp,
      authenticated: false
    });
    
    logger.info(`Nonce generated for ${walletAddress}`);
    
    res.json({
      nonce,
      message: `Sign this message to authenticate: ${nonce}`
    });
  } catch (error) {
    logger.error('Error generating nonce:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route POST /api/auth/verify
 * @desc Verify wallet signature and authenticate user
 */
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;
    
    if (!walletAddress || !signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const session = userSessions.get(walletAddress.toLowerCase());
    if (!session) {
      return res.status(400).json({ error: 'No active session found' });
    }
    
    // Verify signature
    const message = `Sign this message to authenticate: ${session.nonce}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);
    
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    session.authenticated = true;
    session.authenticatedAt = Date.now();
    
    logger.info(`User authenticated: ${walletAddress}`);
    
    res.json({
      success: true,
      walletAddress,
      authenticated: true
    });
  } catch (error) {
    logger.error('Error verifying signature:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route POST /api/rewards/generate-signature
 * @desc Generate signature for purchase recording
 */
app.post('/api/rewards/generate-signature', async (req, res) => {
  try {
    const { walletAddress, merchantAddress, purchaseAmount, timestamp } = req.body;
    
    // Validate inputs
    if (!walletAddress || !merchantAddress || !purchaseAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!ethers.isAddress(walletAddress) || !ethers.isAddress(merchantAddress)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }
    
    // Check user authentication
    const session = userSessions.get(walletAddress.toLowerCase());
    if (!session || !session.authenticated) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Create message hash
    const messageHash = ethers.keccak256(
      ethers.solidityPacked(
        ['address', 'address', 'uint256', 'uint256'],
        [walletAddress, merchantAddress, purchaseAmount, timestamp || Date.now()]
      )
    );
    
    // Sign the message
    const signature = await signer.signMessage(ethers.getBytes(messageHash));
    
    // Store pending transaction
    const txId = ethers.keccak256(ethers.toUtf8Bytes(`${walletAddress}-${Date.now()}`));
    pendingTransactions.set(txId, {
      walletAddress,
      merchantAddress,
      purchaseAmount,
      signature,
      timestamp: Date.now(),
      status: 'pending'
    });
    
    logger.info(`Signature generated for purchase: ${txId}`);
    
    res.json({
      success: true,
      txId,
      signature,
      messageHash,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes expiry
    });
  } catch (error) {
    logger.error('Error generating signature:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route GET /api/rewards/user-stats/:walletAddress
 * @desc Get user loyalty stats from blockchain
 */
app.get('/api/rewards/user-stats/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    if (!ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }
    
    if (!contract) {
      return res.status(503).json({ error: 'Contract not initialized' });
    }
    
    const stats = await contract.getUserStats(walletAddress);
    const balance = await contract.balanceOf(walletAddress);
    
    const tierNames = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
    
    res.json({
      success: true,
      data: {
        totalPurchases: stats[0].toString(),
        totalSpent: ethers.formatEther(stats[1]),
        tokensEarned: ethers.formatEther(stats[2]),
        tokensStaked: ethers.formatEther(stats[3]),
        pendingStakingReward: ethers.formatEther(stats[4]),
        currentTier: tierNames[stats[5]],
        nextTierProgress: stats[6].toString(),
        tokenBalance: ethers.formatEther(balance)
      }
    });
  } catch (error) {
    logger.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

/**
 * @route POST /api/rewards/calculate-reward
 * @desc Calculate potential reward for a purchase (off-chain estimation)
 */
app.post('/api/rewards/calculate-reward', async (req, res) => {
  try {
    const { walletAddress, purchaseAmount, merchantAddress } = req.body;
    
    if (!walletAddress || !purchaseAmount || !merchantAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Get user stats
    let userTier = 0; // BRONZE default
    let activityBonus = 0;
    let stakingBonus = 0;
    
    if (contract) {
      try {
        const stats = await contract.getUserStats(walletAddress);
        userTier = Number(stats[5]);
        
        // Calculate activity bonus
        const lastActivity = Number(stats[0]) > 0 ? Date.now() / 1000 : 0;
        const daysSinceActivity = Math.floor((Date.now() / 1000 - lastActivity) / 86400);
        
        if (daysSinceActivity <= 7) activityBonus = 20;
        else if (daysSinceActivity <= 30) activityBonus = 10;
        
        // Calculate staking bonus
        const staked = Number(ethers.formatEther(stats[3]));
        const balance = Number(ethers.formatEther(await contract.balanceOf(walletAddress)));
        if (staked > 0 && balance > 0) {
          const stakeRatio = (staked / (balance + staked)) * 100;
          stakingBonus = Math.min(stakeRatio * 0.25, 25);
        }
      } catch (e) {
        logger.warn('Could not fetch user stats, using defaults');
      }
    }
    
    // Tier multipliers
    const tierMultipliers = [1, 1.25, 1.5, 2, 3];
    const baseMultiplier = tierMultipliers[userTier];
    const totalMultiplier = baseMultiplier + (activityBonus / 100) + (stakingBonus / 100);
    
    // Calculate reward (assuming 10% base reward rate)
    const baseReward = Number(purchaseAmount) * 0.1;
    const finalReward = baseReward * totalMultiplier;
    
    res.json({
      success: true,
      data: {
        purchaseAmount,
        baseReward: baseReward.toFixed(4),
        finalReward: finalReward.toFixed(4),
        multiplier: totalMultiplier.toFixed(2),
        breakdown: {
          tierMultiplier: baseMultiplier,
          activityBonus: `${activityBonus}%`,
          stakingBonus: `${stakingBonus.toFixed(2)}%`,
          userTier: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'][userTier]
        }
      }
    });
  } catch (error) {
    logger.error('Error calculating reward:', error);
    res.status(500).json({ error: 'Calculation failed' });
  }
});

/**
 * @route GET /api/merchants
 * @desc Get list of registered merchants
 */
app.get('/api/merchants', async (req, res) => {
  // This would typically come from a database
  // For demo purposes, returning mock data
  res.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'Demo Merchant 1',
        address: '0x1234567890123456789012345678901234567890',
        rewardRate: '10%',
        isActive: true
      },
      {
        id: '2',
        name: 'Demo Merchant 2',
        address: '0x0987654321098765432109876543210987654321',
        rewardRate: '15%',
        isActive: true
      }
    ]
  });
});

/**
 * @route GET /api/achievements
 * @desc Get available achievements
 */
app.get('/api/achievements', async (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'FIRST_PURCHASE',
        name: 'First Steps',
        description: 'Complete your first purchase',
        tokenReward: '100',
        requiredPurchases: 1,
        requiredSpending: '0'
      },
      {
        id: 'BIG_SPENDER',
        name: 'Big Spender',
        description: 'Spend over 1 ETH in total',
        tokenReward: '1000',
        requiredPurchases: 0,
        requiredSpending: '1'
      },
      {
        id: 'LOYAL_CUSTOMER',
        name: 'Loyal Customer',
        description: 'Make 10 purchases',
        tokenReward: '500',
        requiredPurchases: 10,
        requiredSpending: '0'
      },
      {
        id: 'DIAMOND_HANDS',
        name: 'Diamond Hands',
        description: 'Stake tokens for 30 days',
        tokenReward: '2000',
        requiredPurchases: 0,
        requiredSpending: '0'
      }
    ]
  });
});

/**
 * @route POST /api/webhook/transaction
 * @desc Webhook for transaction events from blockchain
 */
app.post('/api/webhook/transaction', async (req, res) => {
  try {
    const { txHash, event, data } = req.body;
    
    logger.info(`Webhook received: ${event} - ${txHash}`);
    
    // Process the event
    // This would update database, send notifications, etc.
    
    res.json({ success: true });
  } catch (error) {
    logger.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
