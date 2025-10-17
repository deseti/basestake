import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { stakingContractConfig } from './generated'
import { parseUnits } from 'viem'

export function Unstaking() {
    const [amount, setAmount] = useState('')
    const queryClient = useQueryClient()

    // Hook to send the 'unstake' transaction
    const { data: unstakeHash, writeContract: unstake, isPending: isUnstaking } = useWriteContract()

    const handleUnstake = () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount to unstake.");
            return;
        }
        const parsedAmount = parseUnits(amount, 18)

        // Call unstake function
        unstake({
            ...stakingContractConfig,
            functionName: 'unstake',
            args: [parsedAmount],
        })
    }
    
    // Monitor the result of the 'unstake' transaction
    const { isSuccess: isUnstakeSuccessful } = useWaitForTransactionReceipt({ 
        hash: unstakeHash
    })

    // Effect to handle successful unstake transaction
    useEffect(() => {
        if (isUnstakeSuccessful && unstakeHash) {
            console.log("Unstake transaction successful! Refreshing all balances...");
            // Refresh all queries (balances)
            queryClient.invalidateQueries()
            setAmount('') // Clear the input field
        }
    }, [isUnstakeSuccessful, unstakeHash, queryClient])

    return (
        <div style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            marginTop: '1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'fadeIn 0.5s ease-out 0.3s backwards'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.75rem' }}>💸</span>
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
                    Unstake Your MONAD
                </h3>
            </div>
            
            {/* Warning Banner */}
            <div style={{ 
                marginBottom: '1.5rem',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
                borderRadius: '1rem',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
            }}>
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>⚠️</span>
                <p style={{ 
                    margin: 0,
                    fontSize: '0.95rem',
                    color: '#92400e',
                    fontWeight: '500',
                    lineHeight: '1.5'
                }}>
                    Enter the amount of MONAD you want to withdraw from staking. Your tokens will be returned to your wallet immediately.
                </p>
            </div>

            {/* Unstaking Input */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#475569'
                }}>
                    Amount to Unstake
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        style={{ 
                            width: '100%',
                            padding: '1rem 5rem 1rem 1.25rem',
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            border: '2px solid #e2e8f0',
                            borderRadius: '1rem',
                            background: '#f8fafc',
                            color: '#1e293b',
                            transition: 'all 0.2s',
                            boxSizing: 'border-box'
                        }}
                        disabled={isUnstaking}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#ef4444'
                            e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.boxShadow = 'none'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '1.25rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#64748b',
                        pointerEvents: 'none'
                    }}>
                        MONAD
                    </span>
                </div>
            </div>

            {/* Unstake Button */}
            <button 
                onClick={handleUnstake} 
                disabled={isUnstaking}
                style={{ 
                    width: '100%',
                    padding: '1.125rem',
                    background: isUnstaking 
                        ? '#cbd5e1' 
                        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '1rem',
                    cursor: isUnstaking ? 'not-allowed' : 'pointer',
                    fontWeight: '700',
                    fontSize: '1.125rem',
                    transition: 'all 0.2s',
                    boxShadow: isUnstaking 
                        ? 'none' 
                        : '0 4px 6px -1px rgba(239, 68, 68, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                    if (!isUnstaking) {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(239, 68, 68, 0.4)'
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isUnstaking) {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                    }
                }}
            >
                {isUnstaking ? (
                    <>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        Unstaking...
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: '1.25rem' }}>💸</span>
                        Unstake Now
                    </>
                )}
            </button>
            
            {isUnstakeSuccessful && (
                <div style={{ 
                    marginTop: '1.25rem',
                    padding: '1rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    color: '#059669',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                    <span>Unstake successful! MONAD returned to your wallet.</span>
                </div>
            )}
        </div>
    )
}
