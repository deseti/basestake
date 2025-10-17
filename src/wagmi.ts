import { http, createConfig } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { defineChain } from 'viem'

// 1. We define the Monad Testnet chain details using the info you provided
export const monadTestnet = defineChain({
  id: 10143, 
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MONAD', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadScan', url: 'https://testnet.monadexplorer.com' },
  },
  testnet: true,
})

// 2. We create the configuration object for our app with MetaMask SDK
// Using MetaMask only for Monad x MetaMask hackathon
export const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'MonoStake',
        url: 'https://monostake.app',
      },
      extensionOnly: true, // Only use browser extension
    }),
  ],
  transports: {
    [monadTestnet.id]: http(),
  },
})

