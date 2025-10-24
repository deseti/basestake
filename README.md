# BaseStake - Native ETH Staking on Base Sepolia

<div align="center">
  <h3> One-Click Staking on Base with Smart Account Integration</h3>
  <p>A next-generation Web3 staking experience powered by MetaMask Smart Accounts and Base Sepolia</p>
</div>

---

##  Overview

BaseStake is a decentralized staking platform built on Base Sepolia testnet that leverages **MetaMask Smart Accounts** to provide an enhanced user experience for **native ETH staking** through:

-  **Account Abstraction** - Smart Contract Accounts for advanced features
-  **Single Transaction Staking** - Stake native ETH directly (no token approval needed!)
-  **Gasless Transactions** - Option for sponsored gas fees (Smart Account feature)
-  **Enhanced Security** - Smart Account benefits like social recovery
-  **Intuitive UI** - Clear visualization of wallet balance, staked balance, and Smart Account status

---

##  Architecture

### Smart Contracts (Deployed on Base Sepolia)
- **Native ETH Staking Contract:** `0x90D90EBEadE8AFcB71A06C7209432650ffE36120`
  - Accepts native ETH directly (no token contract needed)
  - Functions: stake() (payable), unstake(uint256), stakedBalance(address)

### Frontend Stack
- **Framework:** React + TypeScript + Vite
- **Wallet Integration:** Wagmi v2 + MetaMask SDK
- **Blockchain:** Base Sepolia (Chain ID: 84532)
- **Account Abstraction:** MetaMask Smart Accounts

---

##  Key Features

### 1. MetaMask Smart Account Integration
- Automatic detection of Smart Account vs Regular EOA
- Visual indicator showing account type
- Educational tooltips about Smart Account benefits

### 2. Account Abstraction Benefits
- **Gasless Mode:** Toggle to enable sponsored transactions
- **Single Transaction:** No token approval needed - stake native ETH directly
- **Session Keys:** Potential for automated staking (future feature)
- **Social Recovery:** Enhanced account security through Smart Accounts

### 3. User Experience Innovation
- Real-time balance tracking (native wallet balance + staked balance)
- Transaction status monitoring
- Automatic balance refresh after successful operations
- Unstaking functionality with instant withdrawal
- Clear error handling and user feedback

---

##  Getting Started

### Prerequisites
- Node.js v18+
- MetaMask browser extension
- Access to Base Sepolia testnet

### Installation

```bash
# Clone the repository
git clone https://github.com/deseti/basestake.git
cd basestake

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configure MetaMask for Base Sepolia

Add Base Sepolia to MetaMask:
- **Network Name:** Base Sepolia
- **RPC URL:** https://sepolia.base.org
- **Chain ID:** 84532
- **Currency Symbol:** ETH
- **Block Explorer:** https://sepolia.basescan.org

### Get Test ETH

Get Base Sepolia ETH from:
- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- [Alchemy Base Sepolia Faucet](https://sepoliafaucet.com/)

### Optional: Create a Smart Account

1. Open MetaMask
2. Go to Settings  Accounts
3. Click "Create Smart Account"
4. Follow the setup wizard

---

##  How It Works

### Native ETH Staking Flow (1 Transaction!)
1. **Stake:** Send native ETH directly to the staking contract
   - No token approval needed
   - Single transaction
   - Instant confirmation

2. **Unstake:** Withdraw your staked ETH back to wallet
   - Specify amount to unstake
   - ETH returns immediately to your wallet

### Smart Account Flow (Enhanced)
1. **Gasless Mode:** App sponsors gas fees for better UX
2. **Instant Feedback:** Real-time updates across all components
3. **Seamless Experience:** Native ETH staking just like sending a transfer

---

##  UI Components

### SmartAccountInfo Component
- Detects if connected account is a Smart Account
- Displays account type and benefits
- Provides educational content about AA features

### Staking Component
- Input field for staking amount (in ETH)
- Single-click native ETH staking
- Toggle for gasless mode
- Visual feedback during transaction processing

### Unstaking Component
- Input field for unstaking amount
- Withdraw staked ETH back to wallet
- Instant withdrawal confirmation

### Balance Components
- Native ETH wallet balance display
- Staked balance display
- Both update automatically after transactions

---

##  Technical Implementation

### MetaMask SDK Configuration
```typescript
metaMask({
  dappMetadata: {
    name: 'BaseStake',
    url: window.location.href,
  },
  enableAnalytics: true,
  useDeeplink: true,
})
```

### Smart Account Detection
```typescript
const code = await publicClient.getCode({ address })
const isSmartAccount = code !== '0x'
```

### Transaction Handling with useEffect
- Monitors transaction confirmations
- Triggers subsequent actions (approve  stake)
- Updates UI state and balances

---

##  What We Learned

### About Account Abstraction
- Smart Accounts enable gasless transactions through paymasters
- Batch operations reduce user friction significantly
- Contract accounts provide enhanced security features

### About Base
- High-performance Layer 2 blockchain with low fees
- Compatible with Ethereum tooling (wagmi, viem)
- Great developer experience with familiar APIs

### About MetaMask Smart Accounts
- Seamless integration with existing dApps
- Progressive enhancement for better UX
- Compatible with both EOA and Smart Accounts

---

##  Future Enhancements

- [ ] Implement actual paymaster integration for gasless transactions
- [ ] Add session keys for auto-staking features
- [ ] Implement social recovery setup UI
- [ ] Display staking rewards/APY
- [ ] Multi-chain support (Base Mainnet)
- [ ] Enhanced analytics dashboard
- [ ] Staking duration and rewards system

---

##  Tech Stack

###  Built on Base Sepolia
- Deployed and tested on Base Sepolia testnet
- Leverages Base's low gas fees and fast finality
- All transactions happen on-chain

###  Uses MetaMask Smart Accounts
- Integrates MetaMask SDK with Smart Account support
- Detects and displays Smart Account status
- Implements AA-specific features (gasless mode)

###  Focus on Account Abstraction
- Educational tooltips about AA benefits
- Practical implementation of gasless transactions
- Single-transaction staking for better UX

###  User Experience Innovation
- Intuitive interface for complex blockchain operations
- Clear visual feedback and status indicators
- Progressive enhancement based on account type

---

##  Resources

- [MetaMask Smart Accounts Documentation](https://support.metamask.io/configure/accounts/what-is-a-smart-account/)
- [Base Documentation](https://docs.base.org)
- [Wagmi Documentation](https://wagmi.sh)
- [Account Abstraction (ERC-4337)](https://eips.ethereum.org/EIPS/eip-4337)

---

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

##  License

MIT License - feel free to use this project for learning and building!

---

##  Team

Built with  for the blockchain community

---

##  Contact

- GitHub: [@deseti](https://github.com/deseti)
- Twitter: [@deseti_nad](https://x.com/deseti_nad)

---

<div align="center">
  <p>Building the future of Web3 UX with Account Abstraction on Base</p>
  <p> Stake ETH   Smart Accounts   Gasless Transactions</p>
</div>
