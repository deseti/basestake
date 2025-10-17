import { useAccount, useBalance } from 'wagmi'
import { formatUnits } from 'viem'

export function Balance() {
  const { address } = useAccount()
  const { data: balance, isLoading } = useBalance({
    address: address,
  })

  if (!address) return null 

  const formattedBalance = balance ? formatUnits(balance.value, 18) : '0'

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '1.25rem',
      padding: '1.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'fadeIn 0.5s ease-out',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ 
            fontSize: '2rem',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
          }}>💰</span>
          <h3 style={{ 
            margin: 0,
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            Wallet Balance
          </h3>
        </div>
        
        {isLoading ? (
          <div style={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderTopColor: 'white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Loading...
          </div>
        ) : (
          <>
            <p style={{ 
              fontSize: '2.25rem',
              fontWeight: '800',
              margin: '0.5rem 0',
              color: 'white',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              letterSpacing: '-0.02em'
            }}>
              {parseFloat(formattedBalance).toFixed(4)}
            </p>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <p style={{ 
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0,
                fontWeight: '600'
              }}>
                MONAD
              </p>
              <span style={{
                padding: '0.25rem 0.75rem',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                color: 'white',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}>
                Available
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

