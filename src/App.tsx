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
            animation: 'fadeIn 0.6s ease-out'
          }}>
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

