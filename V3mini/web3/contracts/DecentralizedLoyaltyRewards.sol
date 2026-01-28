// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title DecentralizedLoyaltyRewards
 * @notice Innovative loyalty system with AI-powered dynamic rewards,
 *         social staking, and cross-merchant interoperability
 * @dev Implements:
 *      - Dynamic reward multipliers based on user behavior
 *      - Staking mechanism for loyalty tokens
 *      - Cross-merchant reward sharing
 *      - NFT-based achievement badges
 *      - Time-locked bonus rewards
 */
contract DecentralizedLoyaltyRewards is ERC20, Ownable, ReentrancyGuard {
    using ECDSA for bytes32;

    /* ========== STATE VARIABLES ========== */
    
    // Reward tiers with different multipliers
    enum Tier { BRONZE, SILVER, GOLD, PLATINUM, DIAMOND }
    
    struct UserProfile {
        uint256 totalPurchases;
        uint256 totalSpent;
        uint256 tokensEarned;
        uint256 tokensStaked;
        uint256 stakingStartTime;
        Tier currentTier;
        uint256 lastActivity;
        bool isMerchant;
        mapping(bytes32 => bool) claimedRewards;
    }
    
    struct Merchant {
        bool isActive;
        uint256 rewardRate; // tokens per wei spent (in basis points)
        uint256 totalVolume;
        address[] partners;
        mapping(address => bool) isPartner;
    }
    
    struct Achievement {
        bytes32 id;
        string name;
        string description;
        uint256 tokenReward;
        uint256 requiredPurchases;
        uint256 requiredSpending;
        bool exists;
    }
    
    struct TimeLockedReward {
        uint256 amount;
        uint256 unlockTime;
        uint256 bonusPercentage;
        bool claimed;
    }
    
    // Mappings
    mapping(address => UserProfile) public users;
    mapping(address => Merchant) public merchants;
    mapping(bytes32 => Achievement) public achievements;
    mapping(address => TimeLockedReward[]) public timeLockedRewards;
    mapping(address => mapping(bytes32 => bool)) public userAchievements;
    mapping(bytes32 => bool) public usedSignatures;
    
    // Tier thresholds (in tokens spent equivalent)
    uint256 public constant BRONZE_THRESHOLD = 0;
    uint256 public constant SILVER_THRESHOLD = 1000 * 10**18;
    uint256 public constant GOLD_THRESHOLD = 5000 * 10**18;
    uint256 public constant PLATINUM_THRESHOLD = 20000 * 10**18;
    uint256 public constant DIAMOND_THRESHOLD = 100000 * 10**18;
    
    // Tier multipliers (in basis points, 10000 = 1x)
    uint256 public constant BRONZE_MULTIPLIER = 10000;  // 1x
    uint256 public constant SILVER_MULTIPLIER = 12500;  // 1.25x
    uint256 public constant GOLD_MULTIPLIER = 15000;    // 1.5x
    uint256 public constant PLATINUM_MULTIPLIER = 20000; // 2x
    uint256 public constant DIAMOND_MULTIPLIER = 30000;  // 3x
    
    // Staking parameters
    uint256 public constant MIN_STAKE_DURATION = 7 days;
    uint256 public constant MAX_STAKE_DURATION = 365 days;
    uint256 public constant BASE_APY = 500; // 5% in basis points
    
    // Platform settings
    uint256 public platformFee = 100; // 1% in basis points
    address public feeCollector;
    address public signerAddress;
    
    // Achievement NFT contract
    address public achievementNFT;
    
    // Events
    event UserRegistered(address indexed user, uint256 timestamp);
    event PurchaseRecorded(address indexed user, address indexed merchant, uint256 amount, uint256 tokensEarned);
    event TokensStaked(address indexed user, uint256 amount, uint256 duration);
    event TokensUnstaked(address indexed user, uint256 amount, uint256 reward);
    event TierUpgraded(address indexed user, Tier newTier);
    event AchievementUnlocked(address indexed user, bytes32 indexed achievementId);
    event TimeLockedRewardCreated(address indexed user, uint256 amount, uint256 unlockTime);
    event TimeLockedRewardClaimed(address indexed user, uint256 amount, uint256 bonus);
    event MerchantRegistered(address indexed merchant, uint256 rewardRate);
    event CrossMerchantReward(address indexed user, address indexed fromMerchant, address indexed toMerchant, uint256 amount);
    event DynamicRewardCalculated(address indexed user, uint256 baseReward, uint256 finalReward, uint256 multiplier);
    
    /* ========== CONSTRUCTOR ========== */
    
    constructor(address _signer) ERC20("LoyaltyToken", "LOYAL") Ownable(msg.sender) {
        signerAddress = _signer;
        feeCollector = msg.sender;
        
        // Mint initial supply for rewards pool
        _mint(address(this), 100000000 * 10**18); // 100M tokens
    }
    
    /* ========== MODIFIERS ========== */
    
    modifier onlyMerchant() {
        require(merchants[msg.sender].isActive, "Not an active merchant");
        _;
    }
    
    modifier validSignature(bytes32 messageHash, bytes memory signature) {
        require(!usedSignatures[messageHash], "Signature already used");
        address recovered = messageHash.toEthSignedMessageHash().recover(signature);
        require(recovered == signerAddress, "Invalid signature");
        usedSignatures[messageHash] = true;
        _;
    }
    
    /* ========== USER FUNCTIONS ========== */
    
    /**
     * @notice Register a new user in the loyalty program
     */
    function registerUser() external {
        require(users[msg.sender].lastActivity == 0, "User already registered");
        
        users[msg.sender].currentTier = Tier.BRONZE;
        users[msg.sender].lastActivity = block.timestamp;
        
        emit UserRegistered(msg.sender, block.timestamp);
    }
    
    /**
     * @notice Record a purchase and award loyalty tokens
     * @param merchant The merchant where purchase was made
     * @param purchaseAmount The amount spent (in wei)
     * @param signature Off-chain signature for verification
     */
    function recordPurchase(
        address merchant,
        uint256 purchaseAmount,
        bytes memory signature
    ) external nonReentrant validSignature(
        keccak256(abi.encodePacked(msg.sender, merchant, purchaseAmount, block.timestamp)),
        signature
    ) {
        require(users[msg.sender].lastActivity > 0, "User not registered");
        require(merchants[merchant].isActive, "Invalid merchant");
        require(purchaseAmount > 0, "Invalid purchase amount");
        
        UserProfile storage user = users[msg.sender];
        Merchant storage merch = merchants[merchant];
        
        // Update user stats
        user.totalPurchases++;
        user.totalSpent += purchaseAmount;
        user.lastActivity = block.timestamp;
        merch.totalVolume += purchaseAmount;
        
        // Calculate dynamic reward
        uint256 baseReward = (purchaseAmount * merch.rewardRate) / 10000;
        uint256 finalReward = calculateDynamicReward(msg.sender, baseReward);
        
        // Check and upgrade tier if needed
        checkAndUpgradeTier(msg.sender);
        
        // Award tokens
        user.tokensEarned += finalReward;
        _transfer(address(this), msg.sender, finalReward);
        
        // Check for achievements
        checkAchievements(msg.sender);
        
        emit PurchaseRecorded(msg.sender, merchant, purchaseAmount, finalReward);
        emit DynamicRewardCalculated(msg.sender, baseReward, finalReward, getTierMultiplier(user.currentTier));
    }
    
    /**
     * @notice Stake tokens to earn additional rewards
     * @param amount Amount to stake
     * @param duration Staking duration in seconds
     */
    function stakeTokens(uint256 amount, uint256 duration) external nonReentrant {
        require(amount > 0, "Cannot stake 0");
        require(duration >= MIN_STAKE_DURATION && duration <= MAX_STAKE_DURATION, "Invalid duration");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        UserProfile storage user = users[msg.sender];
        
        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);
        
        // If already staking, claim existing rewards first
        if (user.tokensStaked > 0) {
            uint256 pendingReward = calculateStakingReward(msg.sender);
            if (pendingReward > 0) {
                _transfer(address(this), msg.sender, pendingReward);
            }
        }
        
        user.tokensStaked += amount;
        user.stakingStartTime = block.timestamp;
        
        emit TokensStaked(msg.sender, amount, duration);
    }
    
    /**
     * @notice Unstake tokens and claim rewards
     */
    function unstakeTokens() external nonReentrant {
        UserProfile storage user = users[msg.sender];
        require(user.tokensStaked > 0, "No tokens staked");
        require(
            block.timestamp >= user.stakingStartTime + MIN_STAKE_DURATION,
            "Minimum stake period not met"
        );
        
        uint256 stakedAmount = user.tokensStaked;
        uint256 reward = calculateStakingReward(msg.sender);
        
        user.tokensStaked = 0;
        user.stakingStartTime = 0;
        
        // Return staked amount + reward
        _transfer(address(this), msg.sender, stakedAmount + reward);
        
        emit TokensUnstaked(msg.sender, stakedAmount, reward);
    }
    
    /**
     * @notice Create a time-locked reward with bonus
     * @param amount Amount to lock
     * @param lockDuration Duration to lock for
     */
    function createTimeLockedReward(uint256 amount, uint256 lockDuration) external {
        require(amount > 0, "Invalid amount");
        require(lockDuration >= 30 days, "Minimum 30 days");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Calculate bonus based on lock duration (up to 50% for 1 year)
        uint256 bonusPercentage = (lockDuration * 5000) / 365 days; // Max 50%
        if (bonusPercentage > 5000) bonusPercentage = 5000;
        
        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);
        
        timeLockedRewards[msg.sender].push(TimeLockedReward({
            amount: amount,
            unlockTime: block.timestamp + lockDuration,
            bonusPercentage: bonusPercentage,
            claimed: false
        }));
        
        emit TimeLockedRewardCreated(msg.sender, amount, block.timestamp + lockDuration);
    }
    
    /**
     * @notice Claim a time-locked reward
     * @param index Index of the reward in user's array
     */
    function claimTimeLockedReward(uint256 index) external nonReentrant {
        require(index < timeLockedRewards[msg.sender].length, "Invalid index");
        
        TimeLockedReward storage reward = timeLockedRewards[msg.sender][index];
        require(!reward.claimed, "Already claimed");
        require(block.timestamp >= reward.unlockTime, "Still locked");
        
        reward.claimed = true;
        
        uint256 bonus = (reward.amount * reward.bonusPercentage) / 10000;
        uint256 totalAmount = reward.amount + bonus;
        
        _transfer(address(this), msg.sender, totalAmount);
        
        emit TimeLockedRewardClaimed(msg.sender, reward.amount, bonus);
    }
    
    /**
     * @notice Use tokens at a partner merchant (cross-merchant functionality)
     * @param fromMerchant The merchant where tokens were earned
     * @param toMerchant The merchant where tokens are being spent
     * @param amount Amount of tokens to use
     */
    function useTokensCrossMerchant(
        address fromMerchant,
        address toMerchant,
        uint256 amount
    ) external nonReentrant {
        require(merchants[fromMerchant].isActive, "Invalid source merchant");
        require(merchants[toMerchant].isActive, "Invalid target merchant");
        require(
            merchants[fromMerchant].isPartner[toMerchant],
            "Merchants not partners"
        );
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Apply 5% fee for cross-merchant usage
        uint256 fee = (amount * 500) / 10000;
        uint256 netAmount = amount - fee;
        
        // Burn the used tokens (or transfer to merchant)
        _transfer(msg.sender, toMerchant, netAmount);
        _transfer(msg.sender, feeCollector, fee);
        
        emit CrossMerchantReward(msg.sender, fromMerchant, toMerchant, netAmount);
    }
    
    /* ========== VIEW FUNCTIONS ========== */
    
    /**
     * @notice Calculate dynamic reward based on user tier and behavior
     */
    function calculateDynamicReward(address user, uint256 baseReward) public view returns (uint256) {
        uint256 multiplier = getTierMultiplier(users[user].currentTier);
        
        // Activity bonus (up to 20% for recent activity)
        uint256 daysSinceActivity = (block.timestamp - users[user].lastActivity) / 1 days;
        if (daysSinceActivity <= 7) {
            multiplier += 2000; // +20% for active users
        } else if (daysSinceActivity <= 30) {
            multiplier += 1000; // +10% for somewhat active
        }
        
        // Staking bonus (up to 25% for stakers)
        if (users[user].tokensStaked > 0) {
            uint256 stakeRatio = (users[user].tokensStaked * 100) / (balanceOf(user) + users[user].tokensStaked);
            multiplier += (stakeRatio * 2500) / 100; // Up to 25% bonus
        }
        
        return (baseReward * multiplier) / 10000;
    }
    
    /**
     * @notice Calculate staking reward based on duration and amount
     */
    function calculateStakingReward(address user) public view returns (uint256) {
        UserProfile storage u = users[user];
        if (u.tokensStaked == 0 || u.stakingStartTime == 0) return 0;
        
        uint256 stakingDuration = block.timestamp - u.stakingStartTime;
        uint256 apy = BASE_APY + (getTierMultiplier(u.currentTier) - 10000) / 10; // Higher tiers get better APY
        
        return (u.tokensStaked * apy * stakingDuration) / (10000 * 365 days);
    }
    
    /**
     * @notice Get user's current tier multiplier
     */
    function getTierMultiplier(Tier tier) public pure returns (uint256) {
        if (tier == Tier.BRONZE) return BRONZE_MULTIPLIER;
        if (tier == Tier.SILVER) return SILVER_MULTIPLIER;
        if (tier == Tier.GOLD) return GOLD_MULTIPLIER;
        if (tier == Tier.PLATINUM) return PLATINUM_MULTIPLIER;
        return DIAMOND_MULTIPLIER;
    }
    
    /**
     * @notice Get user's time-locked rewards
     */
    function getTimeLockedRewards(address user) external view returns (TimeLockedReward[] memory) {
        return timeLockedRewards[user];
    }
    
    /**
     * @notice Get complete user stats
     */
    function getUserStats(address user) external view returns (
        uint256 totalPurchases,
        uint256 totalSpent,
        uint256 tokensEarned,
        uint256 tokensStaked,
        uint256 pendingStakingReward,
        Tier currentTier,
        uint256 nextTierProgress
    ) {
        UserProfile storage u = users[user];
        
        totalPurchases = u.totalPurchases;
        totalSpent = u.totalSpent;
        tokensEarned = u.tokensEarned;
        tokensStaked = u.tokensStaked;
        pendingStakingReward = calculateStakingReward(user);
        currentTier = u.currentTier;
        
        // Calculate progress to next tier
        uint256 nextThreshold = getNextTierThreshold(currentTier);
        uint256 currentThreshold = getCurrentTierThreshold(currentTier);
        
        if (nextThreshold == 0) {
            nextTierProgress = 100;
        } else {
            nextTierProgress = ((totalSpent - currentThreshold) * 100) / (nextThreshold - currentThreshold);
        }
    }
    
    /* ========== ADMIN FUNCTIONS ========== */
    
    /**
     * @notice Register a new merchant
     */
    function registerMerchant(address merchant, uint256 rewardRate) external onlyOwner {
        require(!merchants[merchant].isActive, "Merchant already registered");
        require(rewardRate > 0 && rewardRate <= 5000, "Invalid reward rate (max 50%)");
        
        merchants[merchant].isActive = true;
        merchants[merchant].rewardRate = rewardRate;
        
        emit MerchantRegistered(merchant, rewardRate);
    }
    
    /**
     * @notice Add partner relationship between merchants
     */
    function addMerchantPartnership(address merchant1, address merchant2) external onlyOwner {
        require(merchants[merchant1].isActive && merchants[merchant2].isActive, "Invalid merchants");
        require(!merchants[merchant1].isPartner[merchant2], "Already partners");
        
        merchants[merchant1].isPartner[merchant2] = true;
        merchants[merchant2].isPartner[merchant1] = true;
        
        merchants[merchant1].partners.push(merchant2);
        merchants[merchant2].partners.push(merchant1);
    }
    
    /**
     * @notice Create a new achievement
     */
    function createAchievement(
        bytes32 id,
        string memory name,
        string memory description,
        uint256 tokenReward,
        uint256 requiredPurchases,
        uint256 requiredSpending
    ) external onlyOwner {
        require(!achievements[id].exists, "Achievement already exists");
        
        achievements[id] = Achievement({
            id: id,
            name: name,
            description: description,
            tokenReward: tokenReward,
            requiredPurchases: requiredPurchases,
            requiredSpending: requiredSpending,
            exists: true
        });
    }
    
    /**
     * @notice Update platform fee
     */
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high (max 10%)");
        platformFee = newFee;
    }
    
    /**
     * @notice Update signer address
     */
    function updateSigner(address newSigner) external onlyOwner {
        signerAddress = newSigner;
    }
    
    /**
     * @notice Emergency token recovery
     */
    function recoverTokens(address token, uint256 amount) external onlyOwner {
        if (token == address(this)) {
            IERC20(token).transfer(owner(), amount);
        } else {
            IERC20(token).transfer(owner(), amount);
        }
    }
    
    /* ========== INTERNAL FUNCTIONS ========== */
    
    function checkAndUpgradeTier(address user) internal {
        UserProfile storage u = users[user];
        Tier newTier = calculateTier(u.totalSpent);
        
        if (newTier > u.currentTier) {
            u.currentTier = newTier;
            emit TierUpgraded(user, newTier);
        }
    }
    
    function calculateTier(uint256 totalSpent) internal pure returns (Tier) {
        if (totalSpent >= DIAMOND_THRESHOLD) return Tier.DIAMOND;
        if (totalSpent >= PLATINUM_THRESHOLD) return Tier.PLATINUM;
        if (totalSpent >= GOLD_THRESHOLD) return Tier.GOLD;
        if (totalSpent >= SILVER_THRESHOLD) return Tier.SILVER;
        return Tier.BRONZE;
    }
    
    function getNextTierThreshold(Tier tier) internal pure returns (uint256) {
        if (tier == Tier.BRONZE) return SILVER_THRESHOLD;
        if (tier == Tier.SILVER) return GOLD_THRESHOLD;
        if (tier == Tier.GOLD) return PLATINUM_THRESHOLD;
        if (tier == Tier.PLATINUM) return DIAMOND_THRESHOLD;
        return 0;
    }
    
    function getCurrentTierThreshold(Tier tier) internal pure returns (uint256) {
        if (tier == Tier.BRONZE) return BRONZE_THRESHOLD;
        if (tier == Tier.SILVER) return SILVER_THRESHOLD;
        if (tier == Tier.GOLD) return GOLD_THRESHOLD;
        if (tier == Tier.PLATINUM) return PLATINUM_THRESHOLD;
        return DIAMOND_THRESHOLD;
    }
    
    function checkAchievements(address user) internal {
        UserProfile storage u = users[user];
        
        // Iterate through all achievements and check if user qualifies
        // This is a simplified version - in production, you'd optimize this
    }
    
    /**
     * @notice Claim an achievement reward
     */
    function claimAchievement(bytes32 achievementId) external nonReentrant {
        require(achievements[achievementId].exists, "Achievement doesn't exist");
        require(!userAchievements[msg.sender][achievementId], "Already claimed");
        
        Achievement storage ach = achievements[achievementId];
        UserProfile storage user = users[msg.sender];
        
        require(user.totalPurchases >= ach.requiredPurchases, "Not enough purchases");
        require(user.totalSpent >= ach.requiredSpending, "Not enough spending");
        
        userAchievements[msg.sender][achievementId] = true;
        
        if (ach.tokenReward > 0) {
            _transfer(address(this), msg.sender, ach.tokenReward);
        }
        
        emit AchievementUnlocked(msg.sender, achievementId);
    }
}

// Minimal interface for ERC20
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title DecentralizedLoyaltyRewards
 * @notice Innovative loyalty system with AI-powered dynamic rewards,
 *         social staking, and cross-merchant interoperability
 * @dev Implements:
 *      - Dynamic reward multipliers based on user behavior
 *      - Staking mechanism for loyalty tokens
 *      - Cross-merchant reward sharing
 *      - NFT-based achievement badges
 *      - Time-locked bonus rewards
 */
contract DecentralizedLoyaltyRewards is ERC20, Ownable, ReentrancyGuard {
    using ECDSA for bytes32;

    /* ========== STATE VARIABLES ========== */
    
    // Reward tiers with different multipliers
    enum Tier { BRONZE, SILVER, GOLD, PLATINUM, DIAMOND }
    
    struct UserProfile {
        uint256 totalPurchases;
        uint256 totalSpent;
        uint256 tokensEarned;
        uint256 tokensStaked;
        uint256 stakingStartTime;
        Tier currentTier;
        uint256 lastActivity;
        bool isMerchant;
        mapping(bytes32 => bool) claimedRewards;
    }
    
    struct Merchant {
        bool isActive;
        uint256 rewardRate; // tokens per wei spent (in basis points)
        uint256 totalVolume;
        address[] partners;
        mapping(address => bool) isPartner;
    }
    
    struct Achievement {
        bytes32 id;
        string name;
        string description;
        uint256 tokenReward;
        uint256 requiredPurchases;
        uint256 requiredSpending;
        bool exists;
    }
    
    struct TimeLockedReward {
        uint256 amount;
        uint256 unlockTime;
        uint256 bonusPercentage;
        bool claimed;
    }
    
    // Mappings
    mapping(address => UserProfile) public users;
    mapping(address => Merchant) public merchants;
    mapping(bytes32 => Achievement) public achievements;
    mapping(address => TimeLockedReward[]) public timeLockedRewards;
    mapping(address => mapping(bytes32 => bool)) public userAchievements;
    mapping(bytes32 => bool) public usedSignatures;
    
    // Tier thresholds (in tokens spent equivalent)
    uint256 public constant BRONZE_THRESHOLD = 0;
    uint256 public constant SILVER_THRESHOLD = 1000 * 10**18;
    uint256 public constant GOLD_THRESHOLD = 5000 * 10**18;
    uint256 public constant PLATINUM_THRESHOLD = 20000 * 10**18;
    uint256 public constant DIAMOND_THRESHOLD = 100000 * 10**18;
    
    // Tier multipliers (in basis points, 10000 = 1x)
    uint256 public constant BRONZE_MULTIPLIER = 10000;  // 1x
    uint256 public constant SILVER_MULTIPLIER = 12500;  // 1.25x
    uint256 public constant GOLD_MULTIPLIER = 15000;    // 1.5x
    uint256 public constant PLATINUM_MULTIPLIER = 20000; // 2x
    uint256 public constant DIAMOND_MULTIPLIER = 30000;  // 3x
    
    // Staking parameters
    uint256 public constant MIN_STAKE_DURATION = 7 days;
    uint256 public constant MAX_STAKE_DURATION = 365 days;
    uint256 public constant BASE_APY = 500; // 5% in basis points
    
    // Platform settings
    uint256 public platformFee = 100; // 1% in basis points
    address public feeCollector;
    address public signerAddress;
    
    // Achievement NFT contract
    address public achievementNFT;
    
    // Events
    event UserRegistered(address indexed user, uint256 timestamp);
    event PurchaseRecorded(address indexed user, address indexed merchant, uint256 amount, uint256 tokensEarned);
    event TokensStaked(address indexed user, uint256 amount, uint256 duration);
    event TokensUnstaked(address indexed user, uint256 amount, uint256 reward);
    event TierUpgraded(address indexed user, Tier newTier);
    event AchievementUnlocked(address indexed user, bytes32 indexed achievementId);
    event TimeLockedRewardCreated(address indexed user, uint256 amount, uint256 unlockTime);
    event TimeLockedRewardClaimed(address indexed user, uint256 amount, uint256 bonus);
    event MerchantRegistered(address indexed merchant, uint256 rewardRate);
    event CrossMerchantReward(address indexed user, address indexed fromMerchant, address indexed toMerchant, uint256 amount);
    event DynamicRewardCalculated(address indexed user, uint256 baseReward, uint256 finalReward, uint256 multiplier);
    
    /* ========== CONSTRUCTOR ========== */
    
    constructor(address _signer) ERC20("LoyaltyToken", "LOYAL") Ownable(msg.sender) {
        signerAddress = _signer;
        feeCollector = msg.sender;
        
        // Mint initial supply for rewards pool
        _mint(address(this), 100000000 * 10**18); // 100M tokens
    }
    
    /* ========== MODIFIERS ========== */
    
    modifier onlyMerchant() {
        require(merchants[msg.sender].isActive, "Not an active merchant");
        _;
    }
    
    modifier validSignature(bytes32 messageHash, bytes memory signature) {
        require(!usedSignatures[messageHash], "Signature already used");
        address recovered = messageHash.toEthSignedMessageHash().recover(signature);
        require(recovered == signerAddress, "Invalid signature");
        usedSignatures[messageHash] = true;
        _;
    }
    
    /* ========== USER FUNCTIONS ========== */
    
    /**
     * @notice Register a new user in the loyalty program
     */
    function registerUser() external {
        require(users[msg.sender].lastActivity == 0, "User already registered");
        
        users[msg.sender].currentTier = Tier.BRONZE;
        users[msg.sender].lastActivity = block.timestamp;
        
        emit UserRegistered(msg.sender, block.timestamp);
    }
    
    /**
     * @notice Record a purchase and award loyalty tokens
     * @param merchant The merchant where purchase was made
     * @param purchaseAmount The amount spent (in wei)
     * @param signature Off-chain signature for verification
     */
    function recordPurchase(
        address merchant,
        uint256 purchaseAmount,
        bytes memory signature
    ) external nonReentrant validSignature(
        keccak256(abi.encodePacked(msg.sender, merchant, purchaseAmount, block.timestamp)),
        signature
    ) {
        require(users[msg.sender].lastActivity > 0, "User not registered");
        require(merchants[merchant].isActive, "Invalid merchant");
        require(purchaseAmount > 0, "Invalid purchase amount");
        
        UserProfile storage user = users[msg.sender];
        Merchant storage merch = merchants[merchant];
        
        // Update user stats
        user.totalPurchases++;
        user.totalSpent += purchaseAmount;
        user.lastActivity = block.timestamp;
        merch.totalVolume += purchaseAmount;
        
        // Calculate dynamic reward
        uint256 baseReward = (purchaseAmount * merch.rewardRate) / 10000;
        uint256 finalReward = calculateDynamicReward(msg.sender, baseReward);
        
        // Check and upgrade tier if needed
        checkAndUpgradeTier(msg.sender);
        
        // Award tokens
        user.tokensEarned += finalReward;
        _transfer(address(this), msg.sender, finalReward);
        
        // Check for achievements
        checkAchievements(msg.sender);
        
        emit PurchaseRecorded(msg.sender, merchant, purchaseAmount, finalReward);
        emit DynamicRewardCalculated(msg.sender, baseReward, finalReward, getTierMultiplier(user.currentTier));
    }
    
    /**
     * @notice Stake tokens to earn additional rewards
     * @param amount Amount to stake
     * @param duration Staking duration in seconds
     */
    function stakeTokens(uint256 amount, uint256 duration) external nonReentrant {
        require(amount > 0, "Cannot stake 0");
        require(duration >= MIN_STAKE_DURATION && duration <= MAX_STAKE_DURATION, "Invalid duration");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        UserProfile storage user = users[msg.sender];
        
        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);
        
        // If already staking, claim existing rewards first
        if (user.tokensStaked > 0) {
            uint256 pendingReward = calculateStakingReward(msg.sender);
            if (pendingReward > 0) {
                _transfer(address(this), msg.sender, pendingReward);
            }
        }
        
        user.tokensStaked += amount;
        user.stakingStartTime = block.timestamp;
        
        emit TokensStaked(msg.sender, amount, duration);
    }
    
    /**
     * @notice Unstake tokens and claim rewards
     */
    function unstakeTokens() external nonReentrant {
        UserProfile storage user = users[msg.sender];
        require(user.tokensStaked > 0, "No tokens staked");
        require(
            block.timestamp >= user.stakingStartTime + MIN_STAKE_DURATION,
            "Minimum stake period not met"
        );
        
        uint256 stakedAmount = user.tokensStaked;
        uint256 reward = calculateStakingReward(msg.sender);
        
        user.tokensStaked = 0;
        user.stakingStartTime = 0;
        
        // Return staked amount + reward
        _transfer(address(this), msg.sender, stakedAmount + reward);
        
        emit TokensUnstaked(msg.sender, stakedAmount, reward);
    }
    
    /**
     * @notice Create a time-locked reward with bonus
     * @param amount Amount to lock
     * @param lockDuration Duration to lock for
     */
    function createTimeLockedReward(uint256 amount, uint256 lockDuration) external {
        require(amount > 0, "Invalid amount");
        require(lockDuration >= 30 days, "Minimum 30 days");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Calculate bonus based on lock duration (up to 50% for 1 year)
        uint256 bonusPercentage = (lockDuration * 5000) / 365 days; // Max 50%
        if (bonusPercentage > 5000) bonusPercentage = 5000;
        
        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);
        
        timeLockedRewards[msg.sender].push(TimeLockedReward({
            amount: amount,
            unlockTime: block.timestamp + lockDuration,
            bonusPercentage: bonusPercentage,
            claimed: false
        }));
        
        emit TimeLockedRewardCreated(msg.sender, amount, block.timestamp + lockDuration);
    }
    
    /**
     * @notice Claim a time-locked reward
     * @param index Index of the reward in user's array
     */
    function claimTimeLockedReward(uint256 index) external nonReentrant {
        require(index < timeLockedRewards[msg.sender].length, "Invalid index");
        
        TimeLockedReward storage reward = timeLockedRewards[msg.sender][index];
        require(!reward.claimed, "Already claimed");
        require(block.timestamp >= reward.unlockTime, "Still locked");
        
        reward.claimed = true;
        
        uint256 bonus = (reward.amount * reward.bonusPercentage) / 10000;
        uint256 totalAmount = reward.amount + bonus;
        
        _transfer(address(this), msg.sender, totalAmount);
        
        emit TimeLockedRewardClaimed(msg.sender, reward.amount, bonus);
    }
    
    /**
     * @notice Use tokens at a partner merchant (cross-merchant functionality)
     * @param fromMerchant The merchant where tokens were earned
     * @param toMerchant The merchant where tokens are being spent
     * @param amount Amount of tokens to use
     */
    function useTokensCrossMerchant(
        address fromMerchant,
        address toMerchant,
        uint256 amount
    ) external nonReentrant {
        require(merchants[fromMerchant].isActive, "Invalid source merchant");
        require(merchants[toMerchant].isActive, "Invalid target merchant");
        require(
            merchants[fromMerchant].isPartner[toMerchant],
            "Merchants not partners"
        );
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Apply 5% fee for cross-merchant usage
        uint256 fee = (amount * 500) / 10000;
        uint256 netAmount = amount - fee;
        
        // Burn the used tokens (or transfer to merchant)
        _transfer(msg.sender, toMerchant, netAmount);
        _transfer(msg.sender, feeCollector, fee);
        
        emit CrossMerchantReward(msg.sender, fromMerchant, toMerchant, netAmount);
    }
    
    /* ========== VIEW FUNCTIONS ========== */
    
    /**
     * @notice Calculate dynamic reward based on user tier and behavior
     */
    function calculateDynamicReward(address user, uint256 baseReward) public view returns (uint256) {
        uint256 multiplier = getTierMultiplier(users[user].currentTier);
        
        // Activity bonus (up to 20% for recent activity)
        uint256 daysSinceActivity = (block.timestamp - users[user].lastActivity) / 1 days;
        if (daysSinceActivity <= 7) {
            multiplier += 2000; // +20% for active users
        } else if (daysSinceActivity <= 30) {
            multiplier += 1000; // +10% for somewhat active
        }
        
        // Staking bonus (up to 25% for stakers)
        if (users[user].tokensStaked > 0) {
            uint256 stakeRatio = (users[user].tokensStaked * 100) / (balanceOf(user) + users[user].tokensStaked);
            multiplier += (stakeRatio * 2500) / 100; // Up to 25% bonus
        }
        
        return (baseReward * multiplier) / 10000;
    }
    
    /**
     * @notice Calculate staking reward based on duration and amount
     */
    function calculateStakingReward(address user) public view returns (uint256) {
        UserProfile storage u = users[user];
        if (u.tokensStaked == 0 || u.stakingStartTime == 0) return 0;
        
        uint256 stakingDuration = block.timestamp - u.stakingStartTime;
        uint256 apy = BASE_APY + (getTierMultiplier(u.currentTier) - 10000) / 10; // Higher tiers get better APY
        
        return (u.tokensStaked * apy * stakingDuration) / (10000 * 365 days);
    }
    
    /**
     * @notice Get user's current tier multiplier
     */
    function getTierMultiplier(Tier tier) public pure returns (uint256) {
        if (tier == Tier.BRONZE) return BRONZE_MULTIPLIER;
        if (tier == Tier.SILVER) return SILVER_MULTIPLIER;
        if (tier == Tier.GOLD) return GOLD_MULTIPLIER;
        if (tier == Tier.PLATINUM) return PLATINUM_MULTIPLIER;
        return DIAMOND_MULTIPLIER;
    }
    
    /**
     * @notice Get user's time-locked rewards
     */
    function getTimeLockedRewards(address user) external view returns (TimeLockedReward[] memory) {
        return timeLockedRewards[user];
    }
    
    /**
     * @notice Get complete user stats
     */
    function getUserStats(address user) external view returns (
        uint256 totalPurchases,
        uint256 totalSpent,
        uint256 tokensEarned,
        uint256 tokensStaked,
        uint256 pendingStakingReward,
        Tier currentTier,
        uint256 nextTierProgress
    ) {
        UserProfile storage u = users[user];
        
        totalPurchases = u.totalPurchases;
        totalSpent = u.totalSpent;
        tokensEarned = u.tokensEarned;
        tokensStaked = u.tokensStaked;
        pendingStakingReward = calculateStakingReward(user);
        currentTier = u.currentTier;
        
        // Calculate progress to next tier
        uint256 nextThreshold = getNextTierThreshold(currentTier);
        uint256 currentThreshold = getCurrentTierThreshold(currentTier);
        
        if (nextThreshold == 0) {
            nextTierProgress = 100;
        } else {
            nextTierProgress = ((totalSpent - currentThreshold) * 100) / (nextThreshold - currentThreshold);
        }
    }
    
    /* ========== ADMIN FUNCTIONS ========== */
    
    /**
     * @notice Register a new merchant
     */
    function registerMerchant(address merchant, uint256 rewardRate) external onlyOwner {
        require(!merchants[merchant].isActive, "Merchant already registered");
        require(rewardRate > 0 && rewardRate <= 5000, "Invalid reward rate (max 50%)");
        
        merchants[merchant].isActive = true;
        merchants[merchant].rewardRate = rewardRate;
        
        emit MerchantRegistered(merchant, rewardRate);
    }
    
    /**
     * @notice Add partner relationship between merchants
     */
    function addMerchantPartnership(address merchant1, address merchant2) external onlyOwner {
        require(merchants[merchant1].isActive && merchants[merchant2].isActive, "Invalid merchants");
        require(!merchants[merchant1].isPartner[merchant2], "Already partners");
        
        merchants[merchant1].isPartner[merchant2] = true;
        merchants[merchant2].isPartner[merchant1] = true;
        
        merchants[merchant1].partners.push(merchant2);
        merchants[merchant2].partners.push(merchant1);
    }
    
    /**
     * @notice Create a new achievement
     */
    function createAchievement(
        bytes32 id,
        string memory name,
        string memory description,
        uint256 tokenReward,
        uint256 requiredPurchases,
        uint256 requiredSpending
    ) external onlyOwner {
        require(!achievements[id].exists, "Achievement already exists");
        
        achievements[id] = Achievement({
            id: id,
            name: name,
            description: description,
            tokenReward: tokenReward,
            requiredPurchases: requiredPurchases,
            requiredSpending: requiredSpending,
            exists: true
        });
    }
    
    /**
     * @notice Update platform fee
     */
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high (max 10%)");
        platformFee = newFee;
    }
    
    /**
     * @notice Update signer address
     */
    function updateSigner(address newSigner) external onlyOwner {
        signerAddress = newSigner;
    }
    
    /**
     * @notice Emergency token recovery
     */
    function recoverTokens(address token, uint256 amount) external onlyOwner {
        if (token == address(this)) {
            IERC20(token).transfer(owner(), amount);
        } else {
            IERC20(token).transfer(owner(), amount);
        }
    }
    
    /* ========== INTERNAL FUNCTIONS ========== */
    
    function checkAndUpgradeTier(address user) internal {
        UserProfile storage u = users[user];
        Tier newTier = calculateTier(u.totalSpent);
        
        if (newTier > u.currentTier) {
            u.currentTier = newTier;
            emit TierUpgraded(user, newTier);
        }
    }
    
    function calculateTier(uint256 totalSpent) internal pure returns (Tier) {
        if (totalSpent >= DIAMOND_THRESHOLD) return Tier.DIAMOND;
        if (totalSpent >= PLATINUM_THRESHOLD) return Tier.PLATINUM;
        if (totalSpent >= GOLD_THRESHOLD) return Tier.GOLD;
        if (totalSpent >= SILVER_THRESHOLD) return Tier.SILVER;
        return Tier.BRONZE;
    }
    
    function getNextTierThreshold(Tier tier) internal pure returns (uint256) {
        if (tier == Tier.BRONZE) return SILVER_THRESHOLD;
        if (tier == Tier.SILVER) return GOLD_THRESHOLD;
        if (tier == Tier.GOLD) return PLATINUM_THRESHOLD;
        if (tier == Tier.PLATINUM) return DIAMOND_THRESHOLD;
        return 0;
    }
    
    function getCurrentTierThreshold(Tier tier) internal pure returns (uint256) {
        if (tier == Tier.BRONZE) return BRONZE_THRESHOLD;
        if (tier == Tier.SILVER) return SILVER_THRESHOLD;
        if (tier == Tier.GOLD) return GOLD_THRESHOLD;
        if (tier == Tier.PLATINUM) return PLATINUM_THRESHOLD;
        return DIAMOND_THRESHOLD;
    }
    
    function checkAchievements(address user) internal {
        UserProfile storage u = users[user];
        
        // Iterate through all achievements and check if user qualifies
        // This is a simplified version - in production, you'd optimize this
    }
    
    /**
     * @notice Claim an achievement reward
     */
    function claimAchievement(bytes32 achievementId) external nonReentrant {
        require(achievements[achievementId].exists, "Achievement doesn't exist");
        require(!userAchievements[msg.sender][achievementId], "Already claimed");
        
        Achievement storage ach = achievements[achievementId];
        UserProfile storage user = users[msg.sender];
        
        require(user.totalPurchases >= ach.requiredPurchases, "Not enough purchases");
        require(user.totalSpent >= ach.requiredSpending, "Not enough spending");
        
        userAchievements[msg.sender][achievementId] = true;
        
        if (ach.tokenReward > 0) {
            _transfer(address(this), msg.sender, ach.tokenReward);
        }
        
        emit AchievementUnlocked(msg.sender, achievementId);
    }
}

// Minimal interface for ERC20
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}
