/**
 * Loyalty Rewards dApp - Frontend Application
 * Handles wallet connection, blockchain interactions, and UI updates
 */

// Configuration
const CONFIG = {
    CONTRACT_ADDRESS: localStorage.getItem('contractAddress') || '',
    BACKEND_URL: 'http://localhost:3000',
    NETWORK: 'sepolia',
    RPC_URL: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
};

// Contract ABI (simplified)
const CONTRACT_ABI = [
    "function registerUser() external",
    "function recordPurchase(address merchant, uint256 purchaseAmount, bytes memory signature) external",
    "function stakeTokens(uint256 amount, uint256 duration) external",
    "function unstakeTokens() external",
    "function getUserStats(address user) external view returns (uint256, uint256, uint256, uint256, uint256, uint8, uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function calculateStakingReward(address user) external view returns (uint256)",
    "function users(address) external view returns (uint256, uint256, uint256, uint256, uint256, uint8, uint256, bool)",
    "event PurchaseRecorded(address indexed user, address indexed merchant, uint256 amount, uint256 tokensEarned)",
    "event TokensStaked(address indexed user, uint256 amount, uint256 duration)"
];

// State
let provider = null;
let signer = null;
let contract = null;
let userAddress = null;
let isConnected = false;

// Mock data for demo purposes
const MOCK_DATA = {
    achievements: [
        { id: 'FIRST_PURCHASE', name: 'First Steps', description: 'Complete your first purchase', reward: '100', completed: true },
        { id: 'BIG_SPENDER', name: 'Big Spender', description: 'Spend over 1 ETH in total', reward: '1000', completed: false },
        { id: 'LOYAL_CUSTOMER', name: 'Loyal Customer', description: 'Make 10 purchases', reward: '500', completed: false },
        { id: 'DIAMOND_HANDS', name: 'Diamond Hands', description: 'Stake tokens for 30 days', reward: '2000', completed: false }
    ],
    merchants: [
        { id: '1', name: 'Tech Store', rate: '10%', address: '0x1234567890123456789012345678901234567890' },
        { id: '2', name: 'Fashion Hub', rate: '15%', address: '0x0987654321098765432109876543210987654321' },
        { id: '3', name: 'Grocery Plus', rate: '8%', address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd' }
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    checkExistingConnection();
    loadAchievements();
    loadMerchants();
    animateHeroStats();
});

// Event Listeners
function initializeEventListeners() {
    // Wallet connection
    document.getElementById('connectWallet')?.addEventListener('click', connectWallet);
    document.getElementById('connectWalletHero')?.addEventListener('click', connectWallet);
    
    // Staking
    document.getElementById('stakeBtn')?.addEventListener('click', openStakeModal);
    document.getElementById('closeStakeModal')?.addEventListener('click', closeStakeModal);
    document.getElementById('confirmModalStake')?.addEventListener('click', handleStake);
    document.getElementById('confirmStakeBtn')?.addEventListener('click', handleStake);
    document.getElementById('unstakeBtn')?.addEventListener('click', handleUnstake);
    
    // Staking inputs
    const stakeAmountInput = document.getElementById('stakeAmount');
    const stakeDurationSelect = document.getElementById('stakeDuration');
    
    stakeAmountInput?.addEventListener('input', updateEstimatedReward);
    stakeDurationSelect?.addEventListener('change', updateEstimatedReward);
    
    // Simulate purchase
    document.getElementById('simulatePurchaseBtn')?.addEventListener('click', simulatePurchase);
    
    // Duration buttons in modal
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.duration-btn').forEach(b => {
                b.style.background = 'var(--bg-light)';
                b.style.color = 'var(--text-primary)';
            });
            e.target.style.background = 'var(--primary)';
            e.target.style.color = 'white';
        });
    });
}

// Check for existing connection
async function checkExistingConnection() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await connectWallet();
            }
        } catch (error) {
            console.log('No existing connection');
        }
    }
}

// Connect Wallet
async function connectWallet() {
    if (!window.ethereum) {
        showToast('Please install MetaMask!', 'error');
        return;
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];
        
        // Initialize provider and signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        // Initialize contract
        if (CONFIG.CONTRACT_ADDRESS) {
            contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        }
        
        isConnected = true;
        
        // Update UI
        updateWalletUI();
        showDashboard();
        
        // Load user data
        await loadUserData();
        
        // Setup event listeners for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', () => window.location.reload());
        
        showToast('Wallet connected successfully!', 'success');
    } catch (error) {
        console.error('Connection error:', error);
        showToast('Failed to connect wallet', 'error');
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected
        isConnected = false;
        userAddress = null;
        hideDashboard();
        updateWalletUI();
    } else {
        userAddress = accounts[0];
        loadUserData();
        updateWalletUI();
    }
}

// Update wallet button UI
function updateWalletUI() {
    const walletBtn = document.getElementById('connectWallet');
    if (isConnected && userAddress) {
        walletBtn.innerHTML = `<span>${formatAddress(userAddress)}</span>`;
        walletBtn.classList.add('connected');
    } else {
        walletBtn.innerHTML = '<span>Connect Wallet</span>';
        walletBtn.classList.remove('connected');
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('dashboard').style.display = 'grid';
    document.getElementById('notConnected').style.display = 'none';
}

// Hide dashboard
function hideDashboard() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('notConnected').style.display = 'block';
}

// Load user data from blockchain
async function loadUserData() {
    if (!contract || !userAddress) return;

    try {
        // Get user stats
        const stats = await contract.getUserStats(userAddress);
        const balance = await contract.balanceOf(userAddress);
        
        // Update UI with blockchain data
        document.getElementById('tokenBalance').textContent = parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
        document.getElementById('stakedBalance').textContent = parseFloat(ethers.utils.formatEther(stats[3])).toFixed(2);
        document.getElementById('totalEarned').textContent = parseFloat(ethers.utils.formatEther(stats[2])).toFixed(2);
        document.getElementById('totalPurchases').textContent = stats[0].toString();
        document.getElementById('totalSpent').textContent = parseFloat(ethers.utils.formatEther(stats[1])).toFixed(4) + ' ETH';
        
        // Calculate pending rewards
        const pendingReward = await contract.calculateStakingReward(userAddress);
        document.getElementById('pendingRewards').textContent = parseFloat(ethers.utils.formatEther(pendingReward)).toFixed(2);
        
        // Update tier
        const tierNames = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
        const tierColors = ['tier-bronze', 'tier-silver', 'tier-gold', 'tier-platinum', 'tier-diamond'];
        const currentTier = stats[5];
        
        const tierBadge = document.getElementById('userTier');
        tierBadge.textContent = tierNames[currentTier];
        tierBadge.className = `tier-badge ${tierColors[currentTier]}`;
        
        // Update tier progress
        const progress = stats[6].toNumber();
        document.getElementById('tierProgressBar').style.width = `${progress}%`;
        document.getElementById('tierProgressText').textContent = `${progress}%`;
        
    } catch (error) {
        console.error('Error loading user data:', error);
        // Use mock data if contract call fails
        loadMockUserData();
    }
}

// Load mock user data for demo
function loadMockUserData() {
    document.getElementById('tokenBalance').textContent = '1,250.00';
    document.getElementById('stakedBalance').textContent = '500.00';
    document.getElementById('totalEarned').textContent = '1,750.00';
    document.getElementById('totalPurchases').textContent = '12';
    document.getElementById('totalSpent').textContent = '2.5 ETH';
    document.getElementById('pendingRewards').textContent = '12.50';
    
    document.getElementById('tierProgressBar').style.width = '65%';
    document.getElementById('tierProgressText').textContent = '65%';
}

// Load achievements
function loadAchievements() {
    const container = document.getElementById('achievementList');
    if (!container) return;

    container.innerHTML = MOCK_DATA.achievements.map(achievement => `
        <div class="achievement-item ${achievement.completed ? 'completed' : ''}">
            <div class="achievement-icon">${achievement.completed ? '✅' : '🔒'}</div>
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
            <div class="achievement-reward">+${achievement.reward}</div>
        </div>
    `).join('');
}

// Load merchants
function loadMerchants() {
    const container = document.getElementById('merchantList');
    if (!container) return;

    container.innerHTML = MOCK_DATA.merchants.map(merchant => `
        <div class="merchant-item">
            <div class="merchant-info">
                <div class="merchant-logo">${merchant.name.charAt(0)}</div>
                <div>
                    <div class="merchant-name">${merchant.name}</div>
                    <div class="merchant-rate">${merchant.rate} rewards</div>
                </div>
            </div>
            <button class="btn btn-secondary" style="width: auto; padding: 0.5rem 1rem; margin: 0;" onclick="shopAtMerchant('${merchant.id}')">
                Shop
            </button>
        </div>
    `).join('');
}

// Shop at merchant
function shopAtMerchant(merchantId) {
    showToast(`Redirecting to merchant ${merchantId}...`, 'success');
    // In a real app, this would redirect to the merchant's website
}

// Staking functions
function openStakeModal() {
    document.getElementById('stakeModal').classList.add('active');
}

function closeStakeModal() {
    document.getElementById('stakeModal').classList.remove('active');
}

function updateEstimatedReward() {
    const amount = parseFloat(document.getElementById('stakeAmount')?.value || 0);
    const duration = parseInt(document.getElementById('stakeDuration')?.value || 7);
    
    // Calculate estimated reward (5% APY)
    const apy = 0.05;
    const reward = amount * apy * (duration / 365);
    
    document.getElementById('estimatedReward').textContent = `${reward.toFixed(2)} LOYAL`;
}

async function handleStake() {
    if (!isConnected) {
        showToast('Please connect your wallet first', 'error');
        return;
    }

    const amount = document.getElementById('stakeAmount')?.value || document.getElementById('modalStakeAmount')?.value;
    const duration = document.getElementById('stakeDuration')?.value || 7;

    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }

    try {
        showToast('Processing stake transaction...', 'warning');
        
        if (contract) {
            const amountWei = ethers.utils.parseEther(amount.toString());
            const durationSeconds = parseInt(duration) * 24 * 60 * 60;
            
            const tx = await contract.stakeTokens(amountWei, durationSeconds);
            await tx.wait();
        }
        
        showToast('Tokens staked successfully!', 'success');
        closeStakeModal();
        await loadUserData();
    } catch (error) {
        console.error('Staking error:', error);
        showToast('Failed to stake tokens', 'error');
    }
}

async function handleUnstake() {
    if (!isConnected) {
        showToast('Please connect your wallet first', 'error');
        return;
    }

    try {
        showToast('Processing unstake transaction...', 'warning');
        
        if (contract) {
            const tx = await contract.unstakeTokens();
            await tx.wait();
        }
        
        showToast('Tokens unstaked successfully!', 'success');
        await loadUserData();
    } catch (error) {
        console.error('Unstaking error:', error);
        showToast('Failed to unstake tokens', 'error');
    }
}

// Simulate purchase
async function simulatePurchase() {
    if (!isConnected) {
        showToast('Please connect your wallet first', 'error');
        return;
    }

    try {
        showToast('Simulating purchase...', 'warning');
        
        // In a real app, this would call the backend to generate a signature
        // and then call the contract's recordPurchase function
        
        // Mock success
        setTimeout(() => {
            showToast('Purchase recorded! You earned 50 LOYAL tokens!', 'success');
            loadMockUserData();
        }, 2000);
        
    } catch (error) {
        console.error('Purchase error:', error);
        showToast('Failed to record purchase', 'error');
    }
}

// Toast notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span>${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Utility functions
function formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function animateHeroStats() {
    const stats = [
        { id: 'totalUsers', target: 12543 },
        { id: 'totalRewards', target: 2500000 },
        { id: 'totalStaked', target: 850000 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (!element) return;

        let current = 0;
        const increment = stat.target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
            }
            element.textContent = formatNumber(Math.floor(current));
        }, 20);
    });
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Backend API calls
async function fetchFromBackend(endpoint, options = {}) {
    try {
        const response = await fetch(`${CONFIG.BACKEND_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Backend fetch error:', error);
        throw error;
    }
}

// Export functions for global access
window.shopAtMerchant = shopAtMerchant; * Loyalty Rewards dApp - Frontend Application
 * Handles wallet connection, blockchain interactions, and UI updates
 */

// Configuration
const CONFIG = {
    CONTRACT_ADDRESS: localStorage.getItem('contractAddress') || '',
    BACKEND_URL: 'http://localhost:3000',
    NETWORK: 'sepolia',
    RPC_URL: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
};

// Contract ABI (simplified)
const CONTRACT_ABI = [
    "function registerUser() external",
    "function recordPurchase(address merchant, uint256 purchaseAmount, bytes memory signature) external",
    "function stakeTokens(uint256 amount, uint256 duration) external",
    "function unstakeTokens() external",
    "function getUserStats(address user) external view returns (uint256, uint256, uint256, uint256, uint256, uint8, uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function calculateStakingReward(address user) external view returns (uint256)",
    "function users(address) external view returns (uint256, uint256, uint256, uint256, uint256, uint8, uint256, bool)",
    "event PurchaseRecorded(address indexed user, address indexed merchant, uint256 amount, uint256 tokensEarned)",
    "event TokensStaked(address indexed user, uint256 amount, uint256 duration)"
];

// State
let provider = null;
let signer = null;
let contract = null;
let userAddress = null;
let isConnected = false;

// Mock data for demo purposes
const MOCK_DATA = {
    achievements: [
        { id: 'FIRST_PURCHASE', name: 'First Steps', description: 'Complete your first purchase', reward: '100', completed: true },
        { id: 'BIG_SPENDER', name: 'Big Spender', description: 'Spend over 1 ETH in total', reward: '1000', completed: false },
        { id: 'LOYAL_CUSTOMER', name: 'Loyal Customer', description: 'Make 10 purchases', reward: '500', completed: false },
        { id: 'DIAMOND_HANDS', name: 'Diamond Hands', description: 'Stake tokens for 30 days', reward: '2000', completed: false }
    ],
    merchants: [
        { id: '1', name: 'Tech Store', rate: '10%', address: '0x1234567890123456789012345678901234567890' },
        { id: '2', name: 'Fashion Hub', rate: '15%', address: '0x0987654321098765432109876543210987654321' },
        { id: '3', name: 'Grocery Plus', rate: '8%', address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd' }
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    checkExistingConnection();
    loadAchievements();
    loadMerchants();
    animateHeroStats();
});

// Event Listeners
function initializeEventListeners() {
    // Wallet connection
    document.getElementById('connectWallet')?.addEventListener('click', connectWallet);
    document.getElementById('connectWalletHero')?.addEventListener('click', connectWallet);
    
    // Staking
    document.getElementById('stakeBtn')?.addEventListener('click', openStakeModal);
    document.getElementById('closeStakeModal')?.addEventListener('click', closeStakeModal);
    document.getElementById('confirmModalStake')?.addEventListener('click', handleStake);
    document.getElementById('confirmStakeBtn')?.addEventListener('click', handleStake);
    document.getElementById('unstakeBtn')?.addEventListener('click', handleUnstake);
    
    // Staking inputs
    const stakeAmountInput = document.getElementById('stakeAmount');
    const stakeDurationSelect = document.getElementById('stakeDuration');
    
    stakeAmountInput?.addEventListener('input', updateEstimatedReward);
    stakeDurationSelect?.addEventListener('change', updateEstimatedReward);
    
    // Simulate purchase
    document.getElementById('simulatePurchaseBtn')?.addEventListener('click', simulatePurchase);
    
    // Duration buttons in modal
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.duration-btn').forEach(b => {
                b.style.background = 'var(--bg-light)';
                b.style.color = 'var(--text-primary)';
            });
            e.target.style.background = 'var(--primary)';
            e.target.style.color = 'white';
        });
    });
}

// Check for existing connection
async function checkExistingConnection() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await connectWallet();
            }
        } catch (error) {
            console.log('No existing connection');
        }
    }
}

// Connect Wallet
async function connectWallet() {
    if (!window.ethereum) {
        showToast('Please install MetaMask!', 'error');
        return;
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];
        
        // Initialize provider and signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        // Initialize contract
        if (CONFIG.CONTRACT_ADDRESS) {
            contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        }
        
        isConnected = true;
        
        // Update UI
        updateWalletUI();
        showDashboard();
        
        // Load user data
        await loadUserData();
        
        // Setup event listeners for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', () => window.location.reload());
        
        showToast('Wallet connected successfully!', 'success');
    } catch (error) {
        console.error('Connection error:', error);
        showToast('Failed to connect wallet', 'error');
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected
        isConnected = false;
        userAddress = null;
        hideDashboard();
        updateWalletUI();
    } else {
        userAddress = accounts[0];
        loadUserData();
        updateWalletUI();
    }
}

// Update wallet button UI
function updateWalletUI() {
    const walletBtn = document.getElementById('connectWallet');
    if (isConnected && userAddress) {
        walletBtn.innerHTML = `<span>${formatAddress(userAddress)}</span>`;
        walletBtn.classList.add('connected');
    } else {
        walletBtn.innerHTML = '<span>Connect Wallet</span>';
        walletBtn.classList.remove('connected');
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('dashboard').style.display = 'grid';
    document.getElementById('notConnected').style.display = 'none';
}

// Hide dashboard
function hideDashboard() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('notConnected').style.display = 'block';
}

// Load user data from blockchain
async function loadUserData() {
    if (!contract || !userAddress) return;

    try {
        // Get user stats
        const stats = await contract.getUserStats(userAddress);
        const balance = await contract.balanceOf(userAddress);
        
        // Update UI with blockchain data
        document.getElementById('tokenBalance').textContent = parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
        document.getElementById('stakedBalance').textContent = parseFloat(ethers.utils.formatEther(stats[3])).toFixed(2);
        document.getElementById('totalEarned').textContent = parseFloat(ethers.utils.formatEther(stats[2])).toFixed(2);
        document.getElementById('totalPurchases').textContent = stats[0].toString();
        document.getElementById('totalSpent').textContent = parseFloat(ethers.utils.formatEther(stats[1])).toFixed(4) + ' ETH';
        
        // Calculate pending rewards
        const pendingReward = await contract.calculateStakingReward(userAddress);
        document.getElementById('pendingRewards').textContent = parseFloat(ethers.utils.formatEther(pendingReward)).toFixed(2);
        
        // Update tier
        const tierNames = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
        const tierColors = ['tier-bronze', 'tier-silver', 'tier-gold', 'tier-platinum', 'tier-diamond'];
        const currentTier = stats[5];
        
        const tierBadge = document.getElementById('userTier');
        tierBadge.textContent = tierNames[currentTier];
        tierBadge.className = `tier-badge ${tierColors[currentTier]}`;
        
        // Update tier progress
        const progress = stats[6].toNumber();
        document.getElementById('tierProgressBar').style.width = `${progress}%`;
        document.getElementById('tierProgressText').textContent = `${progress}%`;
        
    } catch (error) {
        console.error('Error loading user data:', error);
        // Use mock data if contract call fails
        loadMockUserData();
    }
}

// Load mock user data for demo
function loadMockUserData() {
    document.getElementById('tokenBalance').textContent = '1,250.00';
    document.getElementById('stakedBalance').textContent = '500.00';
    document.getElementById('totalEarned').textContent = '1,750.00';
    document.getElementById('totalPurchases').textContent = '12';
    document.getElementById('totalSpent').textContent = '2.5 ETH';
    document.getElementById('pendingRewards').textContent = '12.50';
    
    document.getElementById('tierProgressBar').style.width = '65%';
    document.getElementById('tierProgressText').textContent = '65%';
}

// Load achievements
function loadAchievements() {
    const container = document.getElementById('achievementList');
    if (!container) return;

    container.innerHTML = MOCK_DATA.achievements.map(achievement => `
        <div class="achievement-item ${achievement.completed ? 'completed' : ''}">
            <div class="achievement-icon">${achievement.completed ? '✅' : '🔒'}</div>
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
            <div class="achievement-reward">+${achievement.reward}</div>
        </div>
    `).join('');
}

// Load merchants
function loadMerchants() {
    const container = document.getElementById('merchantList');
    if (!container) return;

    container.innerHTML = MOCK_DATA.merchants.map(merchant => `
        <div class="merchant-item">
            <div class="merchant-info">
                <div class="merchant-logo">${merchant.name.charAt(0)}</div>
                <div>
                    <div class="merchant-name">${merchant.name}</div>
                    <div class="merchant-rate">${merchant.rate} rewards</div>
                </div>
            </div>
            <button class="btn btn-secondary" style="width: auto; padding: 0.5rem 1rem; margin: 0;" onclick="shopAtMerchant('${merchant.id}')">
                Shop
            </button>
        </div>
    `).join('');
}

// Shop at merchant
function shopAtMerchant(merchantId) {
    showToast(`Redirecting to merchant ${merchantId}...`, 'success');
    // In a real app, this would redirect to the merchant's website
}

// Staking functions
function openStakeModal() {
    document.getElementById('stakeModal').classList.add('active');
}

function closeStakeModal() {
    document.getElementById('stakeModal').classList.remove('active');
}

function updateEstimatedReward() {
    const amount = parseFloat(document.getElementById('stakeAmount')?.value || 0);
    const duration = parseInt(document.getElementById('stakeDuration')?.value || 7);
    
    // Calculate estimated reward (5% APY)
    const apy = 0.05;
    const reward = amount * apy * (duration / 365);
    
    document.getElementById('estimatedReward').textContent = `${reward.toFixed(2)} LOYAL`;
}

async function handleStake() {
    if (!isConnected) {
        showToast('Please connect your wallet first', 'error');
        return;
    }

    const amount = document.getElementById('stakeAmount')?.value || document.getElementById('modalStakeAmount')?.value;
    const duration = document.getElementById('stakeDuration')?.value || 7;

    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }

    try {
        showToast('Processing stake transaction...', 'warning');
        
        if (contract) {
            const amountWei = ethers.utils.parseEther(amount.toString());
            const durationSeconds = parseInt(duration) * 24 * 60 * 60;
            
            const tx = await contract.stakeTokens(amountWei, durationSeconds);
            await tx.wait();
        }
        
        showToast('Tokens staked successfully!', 'success');
        closeStakeModal();
        await loadUserData();
    } catch (error) {
        console.error('Staking error:', error);
        showToast('Failed to stake tokens', 'error');
    }
}

async function handleUnstake() {
    if (!isConnected) {
        showToast('Please connect your wallet first', 'error');
        return;
    }

    try {
        showToast('Processing unstake transaction...', 'warning');
        
        if (contract) {
            const tx = await contract.unstakeTokens();
            await tx.wait();
        }
        
        showToast('Tokens unstaked successfully!', 'success');
        await loadUserData();
    } catch (error) {
        console.error('Unstaking error:', error);
        showToast('Failed to unstake tokens', 'error');
    }
}

// Simulate purchase
async function simulatePurchase() {
    if (!isConnected) {
        showToast('Please connect your wallet first', 'error');
        return;
    }

    try {
        showToast('Simulating purchase...', 'warning');
        
        // In a real app, this would call the backend to generate a signature
        // and then call the contract's recordPurchase function
        
        // Mock success
        setTimeout(() => {
            showToast('Purchase recorded! You earned 50 LOYAL tokens!', 'success');
            loadMockUserData();
        }, 2000);
        
    } catch (error) {
        console.error('Purchase error:', error);
        showToast('Failed to record purchase', 'error');
    }
}

// Toast notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span>${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Utility functions
function formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function animateHeroStats() {
    const stats = [
        { id: 'totalUsers', target: 12543 },
        { id: 'totalRewards', target: 2500000 },
        { id: 'totalStaked', target: 850000 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (!element) return;

        let current = 0;
        const increment = stat.target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
            }
            element.textContent = formatNumber(Math.floor(current));
        }, 20);
    });
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Backend API calls
async function fetchFromBackend(endpoint, options = {}) {
    try {
        const response = await fetch(`${CONFIG.BACKEND_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Backend fetch error:', error);
        throw error;
    }
}

// Export functions for global access
window.shopAtMerchant = shopAtMerchant;
