import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { stakingContractConfig } from './generated'
import { parseUnits } from 'viem'

export function Staking() {
    const [amount, setAmount] = useState('')
    const [useGasless, setUseGasless] = useState(false)
    const queryClient = useQueryClient()

    // Hook to send the 'stake' transaction (now only 1 transaction!)
    const { data: stakeHash, writeContract: stake, isPending: isStaking } = useWriteContract()

    const handleStake = () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount to stake.");
            return;
        }
        const parsedAmount = parseUnits(amount, 18)

        // Direct stake with native MONAD - no approval needed!
        stake({
            ...stakingContractConfig,
            functionName: 'stake',
            value: parsedAmount, // Send MONAD directly as value
        })
    }
    
    // This hook monitors the result of the 'stake' transaction
    const { isSuccess: isStakeSuccessful } = useWaitForTransactionReceipt({ 
        hash: stakeHash
    })

    // Effect to handle successful stake transaction
    useEffect(() => {
        if (isStakeSuccessful && stakeHash) {
            console.log("Stake transaction successful! Refreshing all balances...");
            // Refresh all queries (balances)
            queryClient.invalidateQueries()
            setAmount('') // Clear the input field after a successful stake
        }
    }, [isStakeSuccessful, stakeHash, queryClient]) 

    return (
        <div style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            marginTop: '1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'fadeIn 0.5s ease-out 0.2s backwards'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.75rem' }}>⚡</span>
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
                    Stake Your MONAD
                </h3>
            </div>
            
            {/* Smart Account Features */}
            <div style={{ 
                marginBottom: '1.5rem',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderRadius: '1rem',
                border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                    <span style={{ fontSize: '1.25rem' }}>✅</span>
                    <span style={{ 
                        fontSize: '0.95rem',
                        color: '#059669',
                        fontWeight: '700'
                    }}>
                        Single Transaction - No Approval Needed!
                    </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input 
                        type="checkbox" 
                        id="gasless" 
                        checked={useGasless}
                        onChange={(e) => setUseGasless(e.target.checked)}
                        style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            accentColor: '#6366f1'
                        }}
                    />
                    <label htmlFor="gasless" style={{ 
                        fontSize: '0.95rem',
                        color: '#475569',
                        fontWeight: '500',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}>
                        💰 <strong>Gasless Mode</strong> (Smart Account sponsored transactions)
                    </label>
                </div>
                
                {useGasless && (
                    <div style={{ 
                        marginTop: '0.75rem',
                        padding: '0.875rem',
                        background: 'rgba(245, 158, 11, 0.1)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        fontSize: '0.875rem',
                        color: '#92400e',
                        animation: 'slideIn 0.3s ease-out'
                    }}>
                        <span style={{ marginRight: '0.5rem' }}>ℹ️</span>
                        Gasless mode requires Smart Account and paymaster setup
                    </div>
                )}
            </div>

            {/* Staking Input */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#475569'
                }}>
                    Amount to Stake
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
                        disabled={isStaking}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1'
                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
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

            {/* Stake Button */}
            <button 
                onClick={handleStake} 
                disabled={isStaking}
                style={{ 
                    width: '100%',
                    padding: '1.125rem',
                    background: isStaking 
                        ? '#cbd5e1' 
                        : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '1rem',
                    cursor: isStaking ? 'not-allowed' : 'pointer',
                    fontWeight: '700',
                    fontSize: '1.125rem',
                    transition: 'all 0.2s',
                    boxShadow: isStaking 
                        ? 'none' 
                        : '0 4px 6px -1px rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                    if (!isStaking) {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.4)'
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isStaking) {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.3)'
                    }
                }}
            >
                {isStaking ? (
                    <>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        Staking...
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: '1.25rem' }}>⚡</span>
                        Stake Now
                    </>
                )}
            </button>
            
            {isStakeSuccessful && (
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
                    <span>Stake successful! Your balance has been updated.</span>
                </div>
            )}
        </div>
    )
}

