import MetaMaskSDK from '@metamask/sdk'

// Lazy initialization to avoid conflicts with Wagmi
let sdkInstance: MetaMaskSDK | null = null

// Initialize MetaMask SDK with dApp metadata
// This SDK instance provides access to Smart Account features
export const initializeSDK = () => {
  if (sdkInstance) return sdkInstance
  
  sdkInstance = new MetaMaskSDK({
    dappMetadata: {
      name: 'MonoStake',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://monostake.app',
    },
    // Enable logging for debugging (can be disabled in production)
    logging: {
      developerMode: true,
    },
    // Don't initialize immediately to avoid conflicts
    checkInstallationImmediately: false,
    // Use injected provider when available (compatible with Wagmi)
    shouldShimWeb3: false,
  })
  
  return sdkInstance
}

// Get SDK instance (initialize if needed)
export const getSDK = () => {
  if (!sdkInstance) {
    return initializeSDK()
  }
  return sdkInstance
}

// Get the Ethereum provider from SDK
// This provider supports Smart Accounts automatically
export const getSDKProvider = () => {
  const instance = getSDK()
  return instance.getProvider()
}

// Helper to check if SDK is ready
export const isSDKReady = () => {
  try {
    if (!sdkInstance) return false
    return sdkInstance.isInitialized()
  } catch {
    return false
  }
}

// Export for backward compatibility
export const sdk = {
  getProvider: getSDKProvider,
  isInitialized: isSDKReady,
}

export default sdk
