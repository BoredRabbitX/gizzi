# 🏆 Decentralized Loyalty Rewards dApp

An innovative blockchain-based loyalty rewards system that revolutionizes customer retention through dynamic rewards, staking mechanisms, and cross-merchant interoperability.

## ✨ Features

### Smart Contract Features
- **Dynamic Reward System**: Rewards calculated based on user tier, activity, and staking status
- **5-Tier Loyalty Program**: Bronze → Silver → Gold → Platinum → Diamond
- **Token Staking**: Earn passive income by staking LOYAL tokens (5-15% APY)
- **Time-Locked Rewards**: Lock tokens for bonus rewards up to 50%
- **Cross-Merchant Compatibility**: Use rewards across partnered merchants
- **Achievement System**: Unlock NFT badges and bonus tokens
- **Secure Signatures**: Off-chain signature verification for gasless transactions

### Backend Features
- RESTful API for blockchain interactions
- Wallet authentication with nonce-based signatures
- Real-time user stats and reward calculations
- Merchant management system
- Achievement tracking
- Webhook support for blockchain events

### Frontend Features
- Modern, responsive dark-themed UI
- MetaMask wallet integration
- Real-time dashboard with user stats
- Staking interface with reward calculator
- Achievement gallery
- Merchant directory
- Toast notifications

## 📁 Project Structure

```
web3/
├── contracts/
│   └── DecentralizedLoyaltyRewards.sol    # Main smart contract
├── backend/
│   ├── server.js                          # Express server
│   ├── package.json                       # Node dependencies
│   └── .env.example                       # Environment template
├── frontend/
│   ├── index.html                         # Main UI
│   └── app.js                             # Frontend logic
└── README.md                              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- Sepolia testnet ETH (for testing)

### 1. Smart Contract Deployment

```bash
# Install Foundry or Hardhat
# Compile contract
solc --optimize --bin --abi contracts/DecentralizedLoyaltyRewards.sol

# Deploy to Sepolia (example with Hardhat)
npx hardhat run scripts/deploy.js --network sepolia
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Start server
npm run dev
```

### 3. Frontend Setup

The frontend is a static HTML/JS app. Simply open `frontend/index.html` in a browser or serve it:

```bash
cd frontend

# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code Live Server extension
```

## 🔧 Configuration

### Environment Variables (Backend)

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

# Blockchain
RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
NETWORK=sepolia
CONTRACT_ADDRESS=0x...

# Wallet (Server signer)
PRIVATE_KEY=0x...

# JWT
JWT_SECRET=your-secret-key
```

### Frontend Configuration

Edit `app.js`:
```javascript
const CONFIG = {
    CONTRACT_ADDRESS: '0x...',  // Your deployed contract
    BACKEND_URL: 'http://localhost:3000',
    NETWORK: 'sepolia'
};
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/nonce` - Generate authentication nonce
- `POST /api/auth/verify` - Verify wallet signature

### Rewards
- `GET /api/rewards/user-stats/:address` - Get user statistics
- `POST /api/rewards/generate-signature` - Generate purchase signature
- `POST /api/rewards/calculate-reward` - Calculate potential rewards

### Data
- `GET /api/merchants` - List partner merchants
- `GET /api/achievements` - List available achievements
- `GET /api/health` - Health check

## 🎨 Smart Contract Architecture

### Core Functions

```solidity
// User registration
function registerUser() external

// Record purchase with signature
function recordPurchase(address merchant, uint256 amount, bytes signature) external

// Staking
function stakeTokens(uint256 amount, uint256 duration) external
function unstakeTokens() external

// Time-locked rewards
function createTimeLockedReward(uint256 amount, uint256 lockDuration) external
function claimTimeLockedReward(uint256 index) external

// Cross-merchant
function useTokensCrossMerchant(address from, address to, uint256 amount) external
```

### Reward Tiers

| Tier | Threshold | Multiplier |
|------|-----------|------------|
| Bronze | 0 | 1.0x |
| Silver | 1,000 | 1.25x |
| Gold | 5,000 | 1.5x |
| Platinum | 20,000 | 2.0x |
| Diamond | 100,000 | 3.0x |

### Staking APY

- Base APY: 5%
- Tier bonus: Up to +10%
- Activity bonus: Up to +20%
- Staking bonus: Up to +25%

## 🔒 Security Features

- ReentrancyGuard on all state-changing functions
- ECDSA signature verification for off-chain validation
- Rate limiting on API endpoints
- Input validation and sanitization
- Nonce-based authentication to prevent replay attacks

## 🧪 Testing

### Contract Tests
```bash
# Install dependencies
npm install

# Run tests
npx hardhat test
```

### Backend Tests
```bash
cd backend
npm test
```

## 🌐 Deployment

### Production Checklist

- [ ] Deploy contract to mainnet
- [ ] Update contract address in frontend
- [ ] Setup production backend server
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Setup monitoring and logging
- [ ] Test all features on mainnet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- OpenZeppelin for secure contract libraries
- Ethers.js for blockchain interactions
- MetaMask for wallet integration
An innovative blockchain-based loyalty rewards system that revolutionizes customer retention through dynamic rewards, staking mechanisms, and cross-merchant interoperability.

## ✨ Features

### Smart Contract Features
- **Dynamic Reward System**: Rewards calculated based on user tier, activity, and staking status
- **5-Tier Loyalty Program**: Bronze → Silver → Gold → Platinum → Diamond
- **Token Staking**: Earn passive income by staking LOYAL tokens (5-15% APY)
- **Time-Locked Rewards**: Lock tokens for bonus rewards up to 50%
- **Cross-Merchant Compatibility**: Use rewards across partnered merchants
- **Achievement System**: Unlock NFT badges and bonus tokens
- **Secure Signatures**: Off-chain signature verification for gasless transactions

### Backend Features
- RESTful API for blockchain interactions
- Wallet authentication with nonce-based signatures
- Real-time user stats and reward calculations
- Merchant management system
- Achievement tracking
- Webhook support for blockchain events

### Frontend Features
- Modern, responsive dark-themed UI
- MetaMask wallet integration
- Real-time dashboard with user stats
- Staking interface with reward calculator
- Achievement gallery
- Merchant directory
- Toast notifications

## 📁 Project Structure

```
web3/
├── contracts/
│   └── DecentralizedLoyaltyRewards.sol    # Main smart contract
├── backend/
│   ├── server.js                          # Express server
│   ├── package.json                       # Node dependencies
│   └── .env.example                       # Environment template
├── frontend/
│   ├── index.html                         # Main UI
│   └── app.js                             # Frontend logic
└── README.md                              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- Sepolia testnet ETH (for testing)

### 1. Smart Contract Deployment

```bash
# Install Foundry or Hardhat
# Compile contract
solc --optimize --bin --abi contracts/DecentralizedLoyaltyRewards.sol

# Deploy to Sepolia (example with Hardhat)
npx hardhat run scripts/deploy.js --network sepolia
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Start server
npm run dev
```

### 3. Frontend Setup

The frontend is a static HTML/JS app. Simply open `frontend/index.html` in a browser or serve it:

```bash
cd frontend

# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code Live Server extension
```

## 🔧 Configuration

### Environment Variables (Backend)

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

# Blockchain
RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
NETWORK=sepolia
CONTRACT_ADDRESS=0x...

# Wallet (Server signer)
PRIVATE_KEY=0x...

# JWT
JWT_SECRET=your-secret-key
```

### Frontend Configuration

Edit `app.js`:
```javascript
const CONFIG = {
    CONTRACT_ADDRESS: '0x...',  // Your deployed contract
    BACKEND_URL: 'http://localhost:3000',
    NETWORK: 'sepolia'
};
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/nonce` - Generate authentication nonce
- `POST /api/auth/verify` - Verify wallet signature

### Rewards
- `GET /api/rewards/user-stats/:address` - Get user statistics
- `POST /api/rewards/generate-signature` - Generate purchase signature
- `POST /api/rewards/calculate-reward` - Calculate potential rewards

### Data
- `GET /api/merchants` - List partner merchants
- `GET /api/achievements` - List available achievements
- `GET /api/health` - Health check

## 🎨 Smart Contract Architecture

### Core Functions

```solidity
// User registration
function registerUser() external

// Record purchase with signature
function recordPurchase(address merchant, uint256 amount, bytes signature) external

// Staking
function stakeTokens(uint256 amount, uint256 duration) external
function unstakeTokens() external

// Time-locked rewards
function createTimeLockedReward(uint256 amount, uint256 lockDuration) external
function claimTimeLockedReward(uint256 index) external

// Cross-merchant
function useTokensCrossMerchant(address from, address to, uint256 amount) external
```

### Reward Tiers

| Tier | Threshold | Multiplier |
|------|-----------|------------|
| Bronze | 0 | 1.0x |
| Silver | 1,000 | 1.25x |
| Gold | 5,000 | 1.5x |
| Platinum | 20,000 | 2.0x |
| Diamond | 100,000 | 3.0x |

### Staking APY

- Base APY: 5%
- Tier bonus: Up to +10%
- Activity bonus: Up to +20%
- Staking bonus: Up to +25%

## 🔒 Security Features

- ReentrancyGuard on all state-changing functions
- ECDSA signature verification for off-chain validation
- Rate limiting on API endpoints
- Input validation and sanitization
- Nonce-based authentication to prevent replay attacks

## 🧪 Testing

### Contract Tests
```bash
# Install dependencies
npm install

# Run tests
npx hardhat test
```

### Backend Tests
```bash
cd backend
npm test
```

## 🌐 Deployment

### Production Checklist

- [ ] Deploy contract to mainnet
- [ ] Update contract address in frontend
- [ ] Setup production backend server
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Setup monitoring and logging
- [ ] Test all features on mainnet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- OpenZeppelin for secure contract libraries
- Ethers.js for blockchain interactions
- MetaMask for wallet integration
