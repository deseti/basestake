import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Balance } from './Balance'
import { Staking } from './Staking'
import { StakedBalance } from './StakedBalance'
import { Unstaking } from './Unstaking'
import { SmartAccountInfo } from './SmartAccountInfo'

function App() {
  try {
    const account = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()

    // Debug info
    console.log('App loaded', { 
      accountStatus: account.status, 
      connectorsCount: connectors.length 
    })

    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem',
      }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto',
        }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            animation: 'fadeIn 0.6s ease-out',
            position: 'relative'
          }}>
            {/* GitHub Link Icon */}
            <a 
              href="https://github.com/deseti/MonoStake" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'white',
                fontSize: '2rem',
                textDecoration: 'none',
                transition: 'all 0.3s',
                opacity: 0.9,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.9'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              title="View on GitHub"
            >
              <svg 
                height="32" 
                viewBox="0 0 16 16" 
                width="32" 
                fill="currentColor"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
            
            <h1 style={{ 
              fontSize: '3rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              ⚡ MonoStake
            </h1>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '1.15rem',
              fontWeight: '500'
            }}>
              Stake native MONAD with Smart Accounts on Monad Testnet
            </p>
          </div>
          
          {/* Main Content */}
          {account.status === 'connected' ? (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              {/* Connection Status Card */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ 
                        width: '10px', 
                        height: '10px', 
                        background: '#10b981', 
                        borderRadius: '50%',
                        display: 'inline-block',
                        boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}></span>
                      <strong style={{ color: '#1e293b', fontSize: '0.95rem' }}>Connected</strong>
                    </div>
                    <p style={{ 
                      color: '#64748b', 
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                      wordBreak: 'break-all'
                    }}>
                      {account.address}
                    </p>
                  </div>
                  <button 
                    onClick={() => disconnect()}
                    style={{ 
                      padding: '0.625rem 1.25rem',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(239, 68, 68, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            
              {/* Components Grid */}
              <SmartAccountInfo />
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <Balance />
                <StakedBalance />
              </div>
              
              <Staking /> 
              <Unstaking />
            </div>
          ) : (
            /* Connection UI */
            <div style={{ 
              maxWidth: '480px',
              margin: '0 auto',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                  <h3 style={{ 
                    marginTop: 0, 
                    marginBottom: '0.5rem',
                    color: '#1e293b',
                    fontSize: '1.5rem'
                  }}>
                    Connect Your Wallet
                  </h3>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
                    Get started by connecting your MetaMask wallet
                  </p>
                </div>
                
                {connectors.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {connectors
                      .filter((connector) => connector.name.toLowerCase().includes('metamask'))
                      .map((connector) => (
                        <button 
                          key={connector.uid} 
                          onClick={() => connect({ connector })}
                          style={{ 
                            width: '100%',
                            padding: '1rem 1.5rem',
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.4)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.3)'
                          }}
                        >
                          <span style={{ fontSize: '1.25rem' }}>🦊</span>
                          Connect with MetaMask
                        </button>
                      ))}
                    {connectors.filter((c) => c.name.toLowerCase().includes('metamask')).length === 0 && (
                      <div style={{ 
                        padding: '1rem',
                        background: '#fef2f2',
                        borderRadius: '0.75rem',
                        border: '1px solid #fecaca',
                        textAlign: 'center'
                      }}>
                        <p style={{ color: '#dc2626', margin: 0, fontWeight: '500', marginBottom: '0.5rem' }}>
                          ⚠️ MetaMask not detected
                        </p>
                        <a 
                          href="https://metamask.io/download/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ 
                            color: '#6366f1', 
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.875rem'
                          }}
                        >
                          Install MetaMask Extension →
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ 
                    padding: '1rem',
                    background: '#fef2f2',
                    borderRadius: '0.75rem',
                    border: '1px solid #fecaca',
                    textAlign: 'center'
                  }}>
                    <p style={{ color: '#dc2626', margin: 0, fontWeight: '500' }}>
                      ⚠️ No connectors available. Please install MetaMask.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
        <h1 style={{ color: '#ef4444' }}>Error Loading App</h1>
        <p>There was an error loading the application. Please check the console.</p>
        <pre style={{ background: '#fee', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto' }}>
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </div>
    )
  }
}

export default App

