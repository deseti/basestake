// The new address of our StakingContract on Monad Testnet
const STAKING_CONTRACT_ADDRESS = '0x30f146555cb51c73e137A2d79B66b8875a1b60a1'

// The new, simpler ABI for our StakingContract
export const stakingContractAbi = [
  // Function to stake a certain amount of native MONAD
  // Note: It's 'payable', which is important for sending native currency.
  { type: 'function', name: 'stake', inputs: [], outputs: [], stateMutability: 'payable' },
  
  // Function to read the staked balance of an account
  { type: 'function', name: 'stakedBalance', inputs: [{ name: 'account', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },

  // Function to unstake a certain amount
  { type: 'function', name: 'unstake', inputs: [{ name: '_amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
] as const

// A configuration object for easy import throughout our app
export const stakingContractConfig = {
    address: STAKING_CONTRACT_ADDRESS,
    abi: stakingContractAbi,
} as const

