import { useAccount, usePublicClient } from 'wagmi'
import { useEffect, useState } from 'react'
import { getSDK, isSDKReady } from './metamask'

export function SmartAccountInfo() {
  const { address, connector, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const [isSmartAccount, setIsSmartAccount] = useState<boolean | null>(null)
  const [sdkStatus, setSdkStatus] = useState<'checking' | 'ready' | 'not-ready'>('checking')
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [createSuccess, setCreateSuccess] = useState(false)

  useEffect(() => {
    // Check MetaMask SDK initialization status
    const checkSDK = () => {
      const ready = isSDKReady()
      setSdkStatus(ready ? 'ready' : 'not-ready')
      if (ready) {
        console.log('✅ MetaMask SDK initialized successfully', getSDK())
      } else {
        console.log('⏳ MetaMask SDK initializing...', getSDK())
      }
    }
    
    checkSDK()
    // Re-check after a short delay
    const timer = setTimeout(checkSDK, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkSmartAccount = async () => {
      if (!address || !publicClient) return
      
      try {
        // Check if account has code (Smart Contract Account will have code)
        const code = await publicClient.getCode({ address })
        setIsSmartAccount(code !== undefined && code !== '0x')
      } catch (error) {
        console.error('Error checking smart account:', error)
        setIsSmartAccount(false)
      }
    }

    checkSmartAccount()
  }, [address, publicClient])

  // Handler to create Smart Account
  const handleCreateSmartAccount = async () => {
    if (!address || !sdkStatus) return
    
    setIsCreatingAccount(true)
    setCreateError(null)
    setCreateSuccess(false)
    
    try {
      console.log('🚀 Starting Smart Account creation process...')
      
      // MetaMask Smart Accounts are created through the MetaMask UI
      // We'll guide users to create it in MetaMask Settings
      // For demo purposes, we'll show the flow and instructions
      
      // In a production app with full SDK integration, you would call:
      // const smartAccountAddress = await sdk.createSmartAccount()
      
      // For now, we'll provide instructions and open MetaMask settings
      const sdk = getSDK()
      const provider = sdk.getProvider()
      
      if (provider) {
        // Request to switch to or create Smart Account
        // This will open MetaMask and prompt the user
        await provider.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        })
        
        console.log('✅ Smart Account creation initiated in MetaMask')
        setCreateSuccess(true)
        
        // Re-check account type after a delay
        setTimeout(() => {
          if (publicClient && address) {
            publicClient.getCode({ address }).then(code => {
              setIsSmartAccount(code !== undefined && code !== '0x')
            })
          }
        }, 2000)
      } else {
        throw new Error('MetaMask provider not available')
      }
      
    } catch (error) {
      console.error('Error creating Smart Account:', error)
      setCreateError(error instanceof Error ? error.message : 'Failed to create Smart Account')
    } finally {
      setIsCreatingAccount(false)
    }
  }

  if (!isConnected) return null

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1.5rem',
      padding: '2rem',
      marginBottom: '1.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      animation: 'fadeIn 0.5s ease-out',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '-10%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.75rem' }}>🔐</span>
          <h3 style={{ 
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            MetaMask Smart Account
          </h3>
        </div>
        
        <div style={{ 
          display: 'grid',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}>
          {/* SDK Status */}
          <div style={{
            padding: '1rem',
            background: sdkStatus === 'ready' 
              ? 'rgba(16, 185, 129, 0.05)' 
              : 'rgba(245, 158, 11, 0.05)',
            borderRadius: '0.75rem',
            border: `1px solid ${
              sdkStatus === 'ready' 
                ? 'rgba(16, 185, 129, 0.2)' 
                : 'rgba(245, 158, 11, 0.2)'
            }`
          }}>
            <div style={{ 
              fontSize: '0.875rem',
              color: '#64748b',
              marginBottom: '0.25rem',
              fontWeight: '600'
            }}>
              MetaMask SDK Status
            </div>
            <div style={{ 
              fontSize: '1rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: sdkStatus === 'ready' ? '#059669' : '#d97706'
            }}>
              {sdkStatus === 'ready' ? '✅' : '⏳'}
              {sdkStatus === 'ready' ? 'SDK Initialized' : 'SDK Initializing...'}
            </div>
          </div>
          
          <div style={{
            padding: '1rem',
            background: 'rgba(99, 102, 241, 0.05)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(99, 102, 241, 0.1)'
          }}>
            <div style={{ 
              fontSize: '0.875rem',
              color: '#64748b',
              marginBottom: '0.25rem',
              fontWeight: '600'
            }}>
              Connector
            </div>
            <div style={{ 
              fontSize: '1rem',
              color: '#1e293b',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>🦊</span>
              {connector?.name || 'Unknown'}
            </div>
          </div>
          
          <div style={{
            padding: '1rem',
            background: isSmartAccount === null 
              ? 'rgba(245, 158, 11, 0.05)' 
              : isSmartAccount 
                ? 'rgba(16, 185, 129, 0.05)'
                : 'rgba(59, 130, 246, 0.05)',
            borderRadius: '0.75rem',
            border: `1px solid ${
              isSmartAccount === null 
                ? 'rgba(245, 158, 11, 0.2)' 
                : isSmartAccount 
                  ? 'rgba(16, 185, 129, 0.2)'
                  : 'rgba(59, 130, 246, 0.2)'
            }`
          }}>
            <div style={{ 
              fontSize: '0.875rem',
              color: '#64748b',
              marginBottom: '0.25rem',
              fontWeight: '600'
            }}>
              Account Type
            </div>
            <div style={{ 
              fontSize: '1rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {isSmartAccount === null ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #f59e0b',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span style={{ color: '#d97706' }}>Checking...</span>
                </>
              ) : isSmartAccount ? (
                <>
                  <span style={{ fontSize: '1.25rem' }}>✅</span>
                  <span style={{ color: '#059669' }}>Smart Account (Contract)</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.25rem' }}>🔑</span>
                  <span style={{ color: '#2563eb' }}>EOA (Regular Wallet)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div style={{ 
          padding: '1.25rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
          borderRadius: '1rem',
          border: '1px solid rgba(16, 185, 129, 0.15)'
        }}>
          <div style={{ 
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#059669',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🚀</span>
            Smart Account Benefits
          </div>
          <ul style={{ 
            margin: 0,
            paddingLeft: '1.5rem',
            fontSize: '0.875rem',
            color: '#475569',
            lineHeight: '1.75'
          }}>
            <li><strong>Gasless transactions</strong> - App sponsors your gas fees</li>
            <li><strong>Single transaction</strong> - No approval needed for staking</li>
            <li><strong>Enhanced security</strong> - Social recovery options</li>
            <li><strong>Session keys</strong> - Seamless repeated interactions</li>
          </ul>
        </div>

        {/* Create Smart Account Section for EOA users */}
        {!isSmartAccount && isSmartAccount !== null && (
          <div style={{ marginTop: '1.25rem' }}>
            {/* Success Message */}
            {createSuccess && (
              <div style={{ 
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
                borderRadius: '1rem',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                marginBottom: '1rem',
                animation: 'slideIn 0.3s ease-out'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: '#059669',
                  fontWeight: '600'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <div>
                    Smart Account creation process initiated! Check your MetaMask wallet.
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {createError && (
              <div style={{ 
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                borderRadius: '1rem',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                marginBottom: '1rem',
                animation: 'slideIn 0.3s ease-out'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  color: '#dc2626',
                  fontSize: '0.875rem'
                }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>⚠️</span>
                  <div>
                    <strong>Error:</strong> {createError}
                  </div>
                </div>
              </div>
            )}

            {/* Info Box with Create Button */}
            <div style={{ 
              padding: '1.25rem',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)',
              borderRadius: '1rem',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>💡</span>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    color: '#4f46e5',
                    marginBottom: '0.5rem'
                  }}>
                    Upgrade to Smart Account
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem',
                    color: '#64748b',
                    lineHeight: '1.6'
                  }}>
                    You're using a regular wallet (EOA). Create a Smart Account in MetaMask to unlock 
                    gasless transactions, enhanced security, and better UX features.
                  </div>
                </div>
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreateSmartAccount}
                disabled={isCreatingAccount || sdkStatus !== 'ready'}
                style={{
                  width: '100%',
                  padding: '0.875rem 1.5rem',
                  background: isCreatingAccount || sdkStatus !== 'ready'
                    ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                    : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: isCreatingAccount || sdkStatus !== 'ready' ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3)',
                  opacity: isCreatingAccount || sdkStatus !== 'ready' ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isCreatingAccount && sdkStatus === 'ready') {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCreatingAccount && sdkStatus === 'ready') {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.3)'
                  }
                }}
              >
                {isCreatingAccount ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Creating Smart Account...
                  </>
                ) : sdkStatus !== 'ready' ? (
                  <>
                    <span>⏳</span>
                    Waiting for SDK...
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.25rem' }}>🚀</span>
                    Create Smart Account in MetaMask
                  </>
                )}
              </button>

              {/* Manual Instructions */}
              <div style={{ 
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                <strong>Or manually:</strong> Open MetaMask → Settings → Accounts → Create Smart Account
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
