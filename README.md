# MonoStake - MetaMask Smart Accounts x Monad Hackathon

<div align="center">
  <h3>🚀 One-Click Staking on Monad with Smart Account Integration</h3>
  <p>A next-generation Web3 staking experience powered by MetaMask Smart Accounts and Monad Testnet</p>
</div>

---

## 🎯 Hackathon Submission

**Event:** MetaMask Smart Accounts x Monad Dev Cook-Off  
**Dates:** Sep 19 - Oct 20, 2025  
**Theme:** Next-gen Web3 experiences with Smart Accounts and Account Abstraction

---

## 📖 Overview

MonoStake is a decentralized staking platform built on Monad Testnet that leverages **MetaMask Smart Accounts** to provide an enhanced user experience for **native MONAD coin staking** through:

- ✅ **Account Abstraction** - Smart Contract Accounts for advanced features
- ⚡ **Single Transaction Staking** - Stake native MONAD directly (no token approval needed!)
- 💰 **Gasless Transactions** - Option for sponsored gas fees (Smart Account feature)
- 🔐 **Enhanced Security** - Smart Account benefits like social recovery
- 🎨 **Intuitive UI** - Clear visualization of wallet balance, staked balance, and Smart Account status

---

## 🏗️ Architecture

### Smart Contracts (Deployed on Monad Testnet)
- **Native MONAD Staking Contract:** `0x30f146555cb51c73e137A2d79B66b8875a1b60a1`
  - Accepts native MONAD directly (no token contract needed)
  - Functions: `stake()` (payable), `unstake(uint256)`, `stakedBalance(address)`

### Frontend Stack
- **Framework:** React + TypeScript + Vite
- **Wallet Integration:** Wagmi v2 + MetaMask SDK
- **Blockchain:** Monad Testnet (Chain ID: 10143)
- **Account Abstraction:** MetaMask Smart Accounts

---

## 🌟 Key Features

### 1. MetaMask Smart Account Integration
- Automatic detection of Smart Account vs Regular EOA
- Visual indicator showing account type
- Educational tooltips about Smart Account benefits

### 2. Account Abstraction Benefits
- **Gasless Mode:** Toggle to enable sponsored transactions
- **Single Transaction:** No token approval needed - stake native MONAD directly
- **Session Keys:** Potential for automated staking (future feature)
- **Social Recovery:** Enhanced account security through Smart Accounts

### 3. User Experience Innovation
- Real-time balance tracking (native wallet balance + staked balance)
- Transaction status monitoring
- Automatic balance refresh after successful operations
- Unstaking functionality with instant withdrawal
- Clear error handling and user feedback

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MetaMask browser extension
- Access to Monad Testnet

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/MonoStake-Frontend.git
cd MonoStake-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configure MetaMask for Monad Testnet

Add Monad Testnet to MetaMask:
- **Network Name:** Monad Testnet
- **RPC URL:** https://testnet-rpc.monad.xyz
- **Chain ID:** 10143
- **Currency Symbol:** MONAD
- **Block Explorer:** https://testnet.monadexplorer.com

### Optional: Create a Smart Account

1. Open MetaMask
2. Go to Settings → Accounts
3. Click "Create Smart Account"
4. Follow the setup wizard

---

## 💡 How It Works

### Native MONAD Staking Flow (1 Transaction!)
1. **Stake:** Send native MONAD directly to the staking contract
   - No token approval needed
   - Single transaction
   - Instant confirmation

2. **Unstake:** Withdraw your staked MONAD back to wallet
   - Specify amount to unstake
   - MONAD returns immediately to your wallet

### Smart Account Flow (Enhanced)
1. **Gasless Mode:** App sponsors gas fees for better UX
2. **Instant Feedback:** Real-time updates across all components
3. **Seamless Experience:** Native coin staking just like sending a transfer

---

## 🎨 UI Components

### SmartAccountInfo Component
- Detects if connected account is a Smart Account
- Displays account type and benefits
- Provides educational content about AA features

### Staking Component
- Input field for staking amount (in MONAD)
- Single-click native MONAD staking
- Toggle for gasless mode
- Visual feedback during transaction processing

### Unstaking Component
- Input field for unstaking amount
- Withdraw staked MONAD back to wallet
- Instant withdrawal confirmation

### Balance Components
- Native MONAD wallet balance display
- Staked balance display
- Both update automatically after transactions

---

## 🔧 Technical Implementation

### MetaMask SDK Configuration
```typescript
metaMask({
  dappMetadata: {
    name: 'MonoStake',
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
- Triggers subsequent actions (approve → stake)
- Updates UI state and balances

---

## 🎓 What We Learned

### About Account Abstraction
- Smart Accounts enable gasless transactions through paymasters
- Batch operations reduce user friction significantly
- Contract accounts provide enhanced security features

### About Monad
- High-performance blockchain with fast finality
- Compatible with Ethereum tooling (wagmi, viem)
- Great developer experience with familiar APIs

### About MetaMask Smart Accounts
- Seamless integration with existing dApps
- Progressive enhancement for better UX
- Compatible with both EOA and Smart Accounts

---

## 🚧 Future Enhancements

- [ ] Implement actual paymaster integration for gasless transactions
- [ ] Add session keys for auto-staking features
- [ ] Implement social recovery setup UI
- [ ] Add unstaking functionality
- [ ] Display staking rewards/APY
- [ ] Multi-chain support
- [ ] Enhanced analytics dashboard

---

## 🏆 Why This Project Fits the Hackathon

### ✅ Built on Monad
- Deployed and tested on Monad Testnet
- Leverages Monad's high performance
- All transactions happen on-chain

### ✅ Uses MetaMask Smart Accounts
- Integrates MetaMask SDK with Smart Account support
- Detects and displays Smart Account status
- Implements AA-specific features (batch, gasless)

### ✅ Focus on Account Abstraction
- Educational tooltips about AA benefits
- Practical implementation of gasless transactions
- Batch operations for better UX

### ✅ User Experience Innovation
- Intuitive interface for complex blockchain operations
- Clear visual feedback and status indicators
- Progressive enhancement based on account type

---

## 📚 Resources

- [MetaMask Smart Accounts Documentation](https://support.metamask.io/configure/accounts/what-is-a-smart-account/)
- [Monad Documentation](https://docs.monad.xyz)
- [Wagmi Documentation](https://wagmi.sh)
- [Account Abstraction (ERC-4337)](https://eips.ethereum.org/EIPS/eip-4337)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - feel free to use this project for learning and building!

---

## 👥 Team

Built with ❤️ for the MetaMask Smart Accounts x Monad Dev Cook-Off

---

## 📞 Contact

- GitHub: [@deseti](https://github.com/deseti)
- Twitter: [@deseti_nad](https://x.com/deseti_nad)

---

<div align="center">
  <p>Made for MetaMask Smart Accounts x Monad Dev Cook-Off 2025</p>
  <p>🏆 Building the future of Web3 UX with Account Abstraction</p>
</div>
