import MetaMaskSDK from '@metamask/sdk'

// Initialize MetaMask SDK with dApp metadata
// This SDK instance provides access to Smart Account features
export const sdk = new MetaMaskSDK({
  dappMetadata: {
    name: 'MonoStake',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://monostake.app',
  },
  // Enable logging for debugging (can be disabled in production)
  logging: {
    developerMode: true,
  },
  // Smart Account specific configuration
  extensionOnly: false, // Allow both extension and mobile
  checkInstallationImmediately: false, // Don't check immediately on import
})

// Get the Ethereum provider from SDK
// This provider supports Smart Accounts automatically
export const getSDKProvider = () => {
  return sdk.getProvider()
}

// Helper to check if SDK is ready
export const isSDKReady = () => {
  try {
    return sdk.isInitialized()
  } catch {
    return false
  }
}

// Export SDK instance for advanced usage
export default sdk
