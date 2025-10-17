import { useAccount, usePublicClient } from 'wagmi'
import { useEffect, useState } from 'react'

export function SmartAccountInfo() {
  const { address, connector, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const [isSmartAccount, setIsSmartAccount] = useState<boolean | null>(null)

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

        {/* Tip for non-Smart Account users */}
        {!isSmartAccount && isSmartAccount !== null && (
          <div style={{ 
            marginTop: '1.25rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
            borderRadius: '1rem',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            fontSize: '0.875rem',
            color: '#1e40af',
            lineHeight: '1.6',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>💡</span>
              <div>
                <strong>Tip:</strong> You're using a regular wallet. To unlock Smart Account features, 
                create a Smart Account in MetaMask: <em>Settings → Accounts → Create Smart Account</em>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
