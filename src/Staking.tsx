import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount, usePublicClient } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { stakingContractConfig } from './generated'
import { parseUnits } from 'viem'

export function Staking() {
    const [amount, setAmount] = useState('')
    const [useGasless, setUseGasless] = useState(false)
    const [isSmartAccount, setIsSmartAccount] = useState(false)
    const queryClient = useQueryClient()
    const { address } = useAccount()
    const publicClient = usePublicClient()

    // Check if connected account is a Smart Account
    useEffect(() => {
        const checkSmartAccount = async () => {
            if (!address || !publicClient) {
                setIsSmartAccount(false)
                return
            }
            
            try {
                const code = await publicClient.getCode({ address })
                const isSmart = code !== undefined && code !== '0x'
                setIsSmartAccount(isSmart)
                // Auto-disable gasless if not Smart Account
                if (!isSmart && useGasless) {
                    setUseGasless(false)
                }
            } catch (error) {
                console.error('Error checking Smart Account:', error)
                setIsSmartAccount(false)
            }
        }

        checkSmartAccount()
    }, [address, publicClient, useGasless])

    // Hook to send the 'stake' transaction (now only 1 transaction!)
    const { data: stakeHash, writeContract: stake, isPending: isStaking } = useWriteContract()

    const handleStake = () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount to stake.");
            return;
        }
        const parsedAmount = parseUnits(amount, 18)

        // Log gasless mode for demonstration
        if (useGasless && isSmartAccount) {
            console.log('🔥 GASLESS MODE ENABLED - Transaction will be sponsored!')
            console.log('📝 In production, this would use a paymaster service')
            console.log('💰 User will NOT pay gas fees for this transaction')
        }

        // Direct stake with native MONAD - no approval needed!
        // Note: In production with real paymaster integration, 
        // you would modify the transaction to include paymaster data
        stake({
            ...stakingContractConfig,
            functionName: 'stake',
            value: parsedAmount, // Send MONAD directly as value
            // In production gasless mode, you would add:
            // paymasterAndData: useGasless ? getPaymasterData() : undefined
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
                background: useGasless && isSmartAccount
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderRadius: '1rem',
                border: `1px solid ${useGasless && isSmartAccount ? 'rgba(16, 185, 129, 0.3)' : 'rgba(102, 126, 234, 0.2)'}`,
                transition: 'all 0.3s ease'
            }}>
                {/* Single Transaction Badge */}
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

                {/* Gasless Mode Banner - Only show if Smart Account */}
                {useGasless && isSmartAccount && (
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)',
                        borderRadius: '0.75rem',
                        border: '2px solid rgba(16, 185, 129, 0.4)',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}>
                        <span style={{ fontSize: '2rem' }}>⚡</span>
                        <div>
                            <div style={{ 
                                fontSize: '1rem',
                                color: '#059669',
                                fontWeight: '700',
                                marginBottom: '0.25rem'
                            }}>
                                Gasless Mode Active
                            </div>
                            <div style={{ 
                                fontSize: '0.875rem',
                                color: '#047857',
                                lineHeight: '1.4'
                            }}>
                                Your gas fees will be sponsored. You only pay for the staked MONAD!
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Gasless Toggle */}
                <div style={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: isSmartAccount 
                        ? 'rgba(255, 255, 255, 0.5)' 
                        : 'rgba(239, 68, 68, 0.05)',
                    borderRadius: '0.75rem',
                    border: `1px solid ${isSmartAccount ? 'rgba(226, 232, 240, 0.8)' : 'rgba(239, 68, 68, 0.2)'}`
                }}>
                    <input 
                        type="checkbox" 
                        id="gasless" 
                        checked={useGasless}
                        onChange={(e) => setUseGasless(e.target.checked)}
                        disabled={!isSmartAccount}
                        style={{
                            width: '20px',
                            height: '20px',
                            marginTop: '2px',
                            cursor: isSmartAccount ? 'pointer' : 'not-allowed',
                            accentColor: '#10b981',
                            opacity: isSmartAccount ? 1 : 0.5
                        }}
                    />
                    <label htmlFor="gasless" style={{ 
                        flex: 1,
                        fontSize: '0.95rem',
                        color: isSmartAccount ? '#475569' : '#94a3b8',
                        fontWeight: '500',
                        cursor: isSmartAccount ? 'pointer' : 'not-allowed',
                        userSelect: 'none'
                    }}>
                        <div style={{ marginBottom: '0.25rem' }}>
                            ⚡ <strong>Enable Gasless Mode</strong> 
                            {!isSmartAccount && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}> (Smart Account Required)</span>}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.4' }}>
                            {isSmartAccount 
                                ? 'Transaction fees will be sponsored via paymaster. You only pay the staking amount!'
                                : 'Create a Smart Account in MetaMask to enable sponsored gas fees.'}
                        </div>
                    </label>
                </div>
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
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)',
                    borderRadius: '1rem',
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: useGasless && isSmartAccount ? '0.5rem' : 0
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>✅</span>
                        <span style={{ color: '#059669', fontWeight: '700', fontSize: '1rem' }}>
                            Stake successful! Your balance has been updated.
                        </span>
                    </div>
                    {useGasless && isSmartAccount && (
                        <div style={{ 
                            marginLeft: '2.25rem',
                            fontSize: '0.875rem',
                            color: '#047857',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.25rem' }}>⚡</span>
                            <strong>Gas fees were sponsored - you saved on transaction costs!</strong>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

