import { http, createConfig } from 'wagmi'
import { metaMask, injected } from 'wagmi/connectors'
import { defineChain } from 'viem'

// 1. We define the Base Sepolia testnet chain details
export const baseSepolia = defineChain({
  id: 84532, 
  name: 'Base Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://sepolia.basescan.org' },
  },
  testnet: true,
})

// 2. We create the configuration object for our app with MetaMask SDK
// MetaMask SDK is initialized separately in metamask.ts for Smart Account features
// Using both injected (for compatibility) and MetaMask connector
export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected({ target: 'metaMask' }), // Primary - use injected MetaMask
    metaMask({
      dappMetadata: {
        name: 'BaseStake',
        url: 'https://basestake.app',
      },
    }), // Fallback - MetaMask SDK connector
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
})

