import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccessControlUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accessControlUpgradeableAbi = [
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Address
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addressAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Airdrop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const airdropAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'AlreadyClaimed' },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidProof' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'MerkleRootAlreadySetForBlock' },
  { type: 'error', inputs: [], name: 'MerkleRootNotSet' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'merkleRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false
      }
    ],
    name: 'AddMerkleRoot'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'blockNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'merkleProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
        indexed: false
      }
    ],
    name: 'Claim'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'numClaims',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'totalAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'ClaimBatch'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'addMerkleRoot',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' }
    ],
    name: 'claim',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'isClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'merkleRoots',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IRouter', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakeTogether',
    outputs: [{ name: '', internalType: 'contract IStakeTogether', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ContextUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const contextUpgradeableAbi = [
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ECDSA
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ecdsaAbi = [
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength'
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EIP712Upgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const eip712UpgradeableAbi = [
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' }
    ]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ELAdapter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const elAdapterAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  { type: 'error', inputs: [], name: 'AdapterOracleExists' },
  { type: 'error', inputs: [], name: 'AdapterOracleNotFound' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'L2RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'NotEnoughBalance' },
  { type: 'error', inputs: [], name: 'NotEnoughBalanceForValidator' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'NotIsCurrentAdapterOracle' },
  { type: 'error', inputs: [], name: 'OnlyAdapterOracle' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'ValidatorExists' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroedGasLimit' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddAdapterOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'publicKey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'withdrawalCredentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'signature',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'depositDataRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false
      }
    ],
    name: 'AddValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'minGasLimit',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false
      },
      {
        name: 'extraData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      }
    ],
    name: 'L2Withdraw'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'NextAdapterOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveAdapterOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IELAdapter.Config',
        type: 'tuple',
        components: [{ name: 'validatorSize', internalType: 'uint256', type: 'uint256' }],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'l2Router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetL2Router'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADAPTER_ORACLE_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADAPTER_ORACLE_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VALIDATOR_ORACLE_SENTINEL_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addAdapterOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_publicKey', internalType: 'bytes', type: 'bytes' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
      { name: '_depositDataRoot', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'addValidator',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bridge',
    outputs: [{ name: '', internalType: 'contract IELBridge', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [{ name: 'validatorSize', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currentOracleIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [
      {
        name: '',
        internalType: 'contract IELDepositContract',
        type: 'address'
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_bridge', internalType: 'address', type: 'address' },
      { name: '_deposit', internalType: 'address', type: 'address' },
      { name: '_withdrawalCredentials', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isAdapterOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'l2Router',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_minGasLimit', internalType: 'uint32', type: 'uint32' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'l2Withdraw',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeAdapterOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IELAdapter.Config',
        type: 'tuple',
        components: [{ name: 'validatorSize', internalType: 'uint256', type: 'uint256' }]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_l2Router', internalType: 'address', type: 'address' }],
    name: 'setL2Router',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'validators',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawalCredentials',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ELAirdrop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const elAirdropAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'AlreadyClaimed' },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidProof' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'MerkleRootAlreadySetForBlock' },
  { type: 'error', inputs: [], name: 'MerkleRootNotSet' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'merkleRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false
      }
    ],
    name: 'AddMerkleRoot'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'blockNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'merkleProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
        indexed: false
      }
    ],
    name: 'Claim'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'numClaims',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'totalAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'ClaimBatch'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'addMerkleRoot',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' }
    ],
    name: 'claim',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'isClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'merkleRoots',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IELRouter', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakeTogether',
    outputs: [{ name: '', internalType: 'contract IELStakeTogether', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ELRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const elRouterAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  { type: 'error', inputs: [], name: 'AlreadyExecuted' },
  { type: 'error', inputs: [], name: 'AlreadyReported' },
  { type: 'error', inputs: [], name: 'BeaconBalanceTooLow' },
  { type: 'error', inputs: [], name: 'BlockNumberNotReached' },
  { type: 'error', inputs: [], name: 'ConfigNotSet' },
  { type: 'error', inputs: [], name: 'ConsensusNotDelayed' },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EarlyExecution' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'IncreaseOraclesToUseMargin' },
  { type: 'error', inputs: [], name: 'InsufficientEthBalance' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MarginTooHigh' },
  { type: 'error', inputs: [], name: 'MathOverflowedMulDiv' },
  { type: 'error', inputs: [], name: 'NoActiveConsensus' },
  { type: 'error', inputs: [], name: 'NoPendingExecution' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyActiveOracle' },
  { type: 'error', inputs: [], name: 'OnlyStakeTogether' },
  { type: 'error', inputs: [], name: 'OracleAlreadyBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleAlreadyReported' },
  { type: 'error', inputs: [], name: 'OracleBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleExists' },
  { type: 'error', inputs: [], name: 'OracleNotBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleNotExists' },
  { type: 'error', inputs: [], name: 'PendingExecution' },
  { type: 'error', inputs: [], name: 'QuorumNotReached' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'ReportBlockShouldBeGreater' },
  { type: 'error', inputs: [], name: 'ReportDelayBlocksTooHigh' },
  { type: 'error', inputs: [], name: 'ReportRevoked' },
  { type: 'error', inputs: [], name: 'RequiredMoreOracles' },
  { type: 'error', inputs: [], name: 'SentinelExists' },
  { type: 'error', inputs: [], name: 'SentinelNotExists' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'WithdrawBalanceTooLow' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'reportNextBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'AdvanceNextBlock'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'BlacklistReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ConsensusApprove'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ConsensusFail'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ExecuteReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveBridgeEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveWithdrawEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'RevokeConsensusReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'bunkerMode', internalType: 'bool', type: 'bool', indexed: true }],
    name: 'SetBunkerMode'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IELRouter.Config',
        type: 'tuple',
        components: [
          { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reportDelayBlock',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'reportNoConsensusMargin',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
        ],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: true
      }
    ],
    name: 'SubmitReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'UnBlacklistReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ORACLE_REPORT_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ORACLE_REPORT_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ORACLE_SENTINEL_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addSentinel',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airdrop',
    outputs: [{ name: '', internalType: 'contract IELAirdrop', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'blacklistReportOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bridge',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bunkermode',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
      { name: 'reportDelayBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'reportNoConsensusMargin',
        internalType: 'uint256',
        type: 'uint256'
      },
      { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'consensusReport',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'executeReport',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'executedReports',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'forceNextReportBlock',
    outputs: []
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'getReportHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_airdrop', internalType: 'address', type: 'address' },
      { name: '_bridge', internalType: 'address', type: 'address' },
      { name: '_withdrawals', internalType: 'address', type: 'address' }
    ],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'isReadyToExecute',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'isReadyToSubmit',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isReportOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isReportOracleBlackListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastConsensusBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastExecutedBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingExecution',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'receiveWithdrawEther',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeSentinel',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'reportBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'reportDelayBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'reportOraclesBlacklist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'reportVotesForBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'reports',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_reportBlock', internalType: 'uint256', type: 'uint256' }],
    name: 'revokeConsensusReport',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'revokedReports',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_bunkerMode', internalType: 'bool', type: 'bool' }],
    name: 'setBunkerMode',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IELRouter.Config',
        type: 'tuple',
        components: [
          { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reportDelayBlock',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'reportNoConsensusMargin',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
        ]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakeTogether',
    outputs: [{ name: '', internalType: 'contract IELStakeTogether', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'submitReport',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalReportOracles',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'totalVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'unBlacklistReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawals',
    outputs: [{ name: '', internalType: 'contract IELWithdrawals', type: 'address' }]
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ELStakeTogether
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const elstakeTogetherAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'DepositLimitReached' },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength'
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature'
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC2612InvalidSigner'
  },
  { type: 'error', inputs: [], name: 'EarlyTransfer' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'FeatureDisabled' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'InsufficientAccountBalance' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientBeaconBalance' },
  { type: 'error', inputs: [], name: 'InsufficientPoolBalance' },
  { type: 'error', inputs: [], name: 'InsufficientShares' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'InvalidAccountNonce'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidLength' },
  { type: 'error', inputs: [], name: 'InvalidSize' },
  { type: 'error', inputs: [], name: 'InvalidSum' },
  { type: 'error', inputs: [], name: 'InvalidTotalPercentage' },
  { type: 'error', inputs: [], name: 'InvalidTotalSupply' },
  { type: 'error', inputs: [], name: 'InvalidValue' },
  { type: 'error', inputs: [], name: 'L1AdapterAlreadySet' },
  { type: 'error', inputs: [], name: 'LessThanMinimumDeposit' },
  { type: 'error', inputs: [], name: 'LessThanMinimumWithdraw' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'MathOverflowedMulDiv' },
  { type: 'error', inputs: [], name: 'MaxDelegations' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  { type: 'error', inputs: [], name: 'NotEnoughPoolBalance' },
  { type: 'error', inputs: [], name: 'NotInAntiFraudList' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'NotIsCurrentValidatorOracle' },
  { type: 'error', inputs: [], name: 'OnlyAirdrop' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'OnlyValidatorOracle' },
  { type: 'error', inputs: [], name: 'PoolExists' },
  { type: 'error', inputs: [], name: 'PoolNotFound' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RouterAlreadyHaveBalance' },
  { type: 'error', inputs: [], name: 'ShouldBeZeroLength' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'ValidatorOracleExists' },
  { type: 'error', inputs: [], name: 'ValidatorOracleNotFound' },
  { type: 'error', inputs: [], name: 'WithdrawFromPool' },
  { type: 'error', inputs: [], name: 'WithdrawZeroBalance' },
  { type: 'error', inputs: [], name: 'WithdrawalsPoolLimitReached' },
  { type: 'error', inputs: [], name: 'WithdrawalsValidatorLimitWasReached' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroSupply' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'listed', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'social', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'index', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'AddPool'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'AnticipateWithdrawBeacon'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'BurnShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'depositType',
        internalType: 'enum IELStakeTogether.DepositType',
        type: 'uint8',
        indexed: false
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'referral', internalType: 'bytes', type: 'bytes', indexed: true }
    ],
    name: 'DepositBase'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'DepositLimitWasReached'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'feeType',
        internalType: 'enum IELStakeTogether.FeeType',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'feeRole',
        internalType: 'enum IELStakeTogether.FeeRole',
        type: 'uint8',
        indexed: true
      }
    ],
    name: 'MintFeeShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'MintShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'NextValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ProcessStakeRewards'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'ProcessStakeValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'pool', internalType: 'address', type: 'address', indexed: true }],
    name: 'RemovePool'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'minGasLimit',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false
      },
      {
        name: 'extraData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      }
    ],
    name: 'RequestAddValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'adapter',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetAdapter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      { name: 'isListed', internalType: 'bool', type: 'bool', indexed: false }
    ],
    name: 'SetAntiFraudStatus'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetBeaconBalance'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IELStakeTogether.Config',
        type: 'tuple',
        components: [
          { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
          { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minDepositAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'minWithdrawAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
          { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawalPoolLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'withdrawalValidatorLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawBeaconDelay',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'feature',
            internalType: 'struct IELStakeTogether.Feature',
            type: 'tuple',
            components: [
              { name: 'AddPool', internalType: 'bool', type: 'bool' },
              { name: 'Deposit', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
            ]
          }
        ],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeType',
        internalType: 'enum IELStakeTogether.FeeType',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'allocations',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false
      }
    ],
    name: 'SetFee'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'role',
        internalType: 'enum IELStakeTogether.FeeRole',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetFeeAddress'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newValidatorSize',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetValidatorSize'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetWithdrawBalance'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalCredentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: true
      }
    ],
    name: 'SetWithdrawalsCredentials'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'TransferShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'delegations',
        internalType: 'struct IELStakeTogether.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' }
        ],
        indexed: false
      }
    ],
    name: 'UpdateDelegations'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'withdrawType',
        internalType: 'enum IELStakeTogether.WithdrawType',
        type: 'uint8',
        indexed: false
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'WithdrawBase'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'withdrawType',
        internalType: 'enum IELStakeTogether.WithdrawType',
        type: 'uint8',
        indexed: false
      }
    ],
    name: 'WithdrawalsLimitWasReached'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ANTI_FRAUD_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ANTI_FRAUD_SENTINEL_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'POOL_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VALIDATOR_ORACLE_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VALIDATOR_ORACLE_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VALIDATOR_ORACLE_SENTINEL_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_listed', internalType: 'bool', type: 'bool' },
      { name: '_social', internalType: 'bool', type: 'bool' },
      { name: '_index', internalType: 'bool', type: 'bool' }
    ],
    name: 'addPool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addToAntiFraud',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airdrop',
    outputs: [{ name: '', internalType: 'contract IELAirdrop', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'anticipateWithdrawBeacon',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_spender', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'beaconBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bridge',
    outputs: [{ name: '', internalType: 'contract IELBridge', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burnFrom',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'claimAirdrop',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
      { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
      { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
      { name: 'minDepositAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'minWithdrawAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
      { name: 'withdrawalPoolLimit', internalType: 'uint256', type: 'uint256' },
      {
        name: 'withdrawalValidatorLimit',
        internalType: 'uint256',
        type: 'uint256'
      },
      { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
      { name: 'withdrawBeaconDelay', internalType: 'uint256', type: 'uint256' },
      {
        name: 'feature',
        internalType: 'struct IELStakeTogether.Feature',
        type: 'tuple',
        components: [
          { name: 'AddPool', internalType: 'bool', type: 'bool' },
          { name: 'Deposit', internalType: 'bool', type: 'bool' },
          { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
          { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
        ]
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currentOracleIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_referral', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'depositDonation',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_referral', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'depositPool',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' }
    ]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'forceNextValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_feeType',
        internalType: 'enum IELStakeTogether.FeeType',
        type: 'uint8'
      }
    ],
    name: 'getFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_role',
        internalType: 'enum IELStakeTogether.FeeRole',
        type: 'uint8'
      }
    ],
    name: 'getFeeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'getFeesRoles',
    outputs: [
      {
        name: '',
        internalType: 'enum IELStakeTogether.FeeRole[4]',
        type: 'uint8[4]'
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getWithdrawBeaconBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getWithdrawBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_airdrop', internalType: 'address', type: 'address' },
      { name: '_bridge', internalType: 'address', type: 'address' },
      { name: '_router', internalType: 'address', type: 'address' },
      { name: '_withdrawals', internalType: 'address', type: 'address' }
    ],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isListedInAntiFraud',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isValidatorOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'l1Adapter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastResetBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'pools',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'processFeeRewards',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeFromAntiFraud',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pool', internalType: 'address', type: 'address' }],
    name: 'removePool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_minGasLimit', internalType: 'uint32', type: 'uint32' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'requestAddValidator',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IELRouter', type: 'address' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setBeaconBalance',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IELStakeTogether.Config',
        type: 'tuple',
        components: [
          { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
          { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minDepositAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'minWithdrawAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
          { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawalPoolLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'withdrawalValidatorLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawBeaconDelay',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'feature',
            internalType: 'struct IELStakeTogether.Feature',
            type: 'tuple',
            components: [
              { name: 'AddPool', internalType: 'bool', type: 'bool' },
              { name: 'Deposit', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
            ]
          }
        ]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_feeType',
        internalType: 'enum IELStakeTogether.FeeType',
        type: 'uint8'
      },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
      { name: '_allocations', internalType: 'uint256[]', type: 'uint256[]' }
    ],
    name: 'setFee',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_role',
        internalType: 'enum IELStakeTogether.FeeRole',
        type: 'uint8'
      },
      { name: '_address', internalType: 'address payable', type: 'address' }
    ],
    name: 'setFeeAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_l1adapter', internalType: 'address', type: 'address' }],
    name: 'setL1Adapter',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setWithdrawBalance',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'shares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'sharesByWei',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalDeposited',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalWithdrawnPool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalWithdrawnValidator',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_delegations',
        internalType: 'struct IELStakeTogether.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' }
        ]
      }
    ],
    name: 'updateDelegations',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'validators',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'weiByShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_pool', internalType: 'address', type: 'address' }
    ],
    name: 'withdrawBeacon',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_pool', internalType: 'address', type: 'address' }
    ],
    name: 'withdrawPool',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawals',
    outputs: [{ name: '', internalType: 'contract IELWithdrawals', type: 'address' }]
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ELWithdrawals
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const elWithdrawalsAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength'
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature'
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC2612InvalidSigner'
  },
  { type: 'error', inputs: [], name: 'EarlyBeaconTransfer' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'InsufficientEthBalance' },
  { type: 'error', inputs: [], name: 'InsufficientStwBalance' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'InvalidAccountNonce'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'OnlyStakeTogether' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveWithdrawEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Withdraw'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burnFrom',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'isWithdrawReady',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'receiveWithdrawEther',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IELRouter', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakeTogether',
    outputs: [{ name: '', internalType: 'contract IELStakeTogether', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165Upgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165UpgradeableAbi = [
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1967Utils
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1967UtilsAbi = [
  {
    type: 'error',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidAdmin'
  },
  {
    type: 'error',
    inputs: [{ name: 'beacon', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidBeacon'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'AdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'BeaconUpgraded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20BurnableUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20BurnableUpgradeableAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burnFrom',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20PermitUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20PermitUpgradeableAbi = [
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength'
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS'
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature'
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC2612InvalidSigner'
  },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'InvalidAccountNonce'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Upgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20UpgradeableAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAccessControlAbi = [
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAirdrop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAirdropAbi = [
  { type: 'error', inputs: [], name: 'AlreadyClaimed' },
  { type: 'error', inputs: [], name: 'InvalidProof' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'MerkleRootAlreadySetForBlock' },
  { type: 'error', inputs: [], name: 'MerkleRootNotSet' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'merkleRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false
      }
    ],
    name: 'AddMerkleRoot'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'blockNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'merkleProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
        indexed: false
      }
    ],
    name: 'Claim'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'numClaims',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'totalAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'ClaimBatch'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'addMerkleRoot',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' }
    ],
    name: 'claim',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'isClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBeacon
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBeaconAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IDepositContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iDepositContractAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pubkey', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'withdrawal_credentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      { name: 'amount', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'signature',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      { name: 'index', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'DepositEvent'
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'pubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'withdrawal_credentials', internalType: 'bytes', type: 'bytes' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'deposit_data_root', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'deposit',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'get_deposit_count',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'get_deposit_root',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IELAdapter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ielAdapterAbi = [
  { type: 'error', inputs: [], name: 'AdapterOracleExists' },
  { type: 'error', inputs: [], name: 'AdapterOracleNotFound' },
  { type: 'error', inputs: [], name: 'L2RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'NotEnoughBalance' },
  { type: 'error', inputs: [], name: 'NotEnoughBalanceForValidator' },
  { type: 'error', inputs: [], name: 'NotIsCurrentAdapterOracle' },
  { type: 'error', inputs: [], name: 'OnlyAdapterOracle' },
  { type: 'error', inputs: [], name: 'ValidatorExists' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroedGasLimit' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddAdapterOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'publicKey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'withdrawalCredentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'signature',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'depositDataRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false
      }
    ],
    name: 'AddValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'minGasLimit',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false
      },
      {
        name: 'extraData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      }
    ],
    name: 'L2Withdraw'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'NextAdapterOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveAdapterOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IELAdapter.Config',
        type: 'tuple',
        components: [{ name: 'validatorSize', internalType: 'uint256', type: 'uint256' }],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'l2Router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetL2Router'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IELAdapter.Config',
        type: 'tuple',
        components: [{ name: 'validatorSize', internalType: 'uint256', type: 'uint256' }]
      }
    ],
    name: 'setConfig',
    outputs: []
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IELAirdrop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ielAirdropAbi = [
  { type: 'error', inputs: [], name: 'AlreadyClaimed' },
  { type: 'error', inputs: [], name: 'InvalidProof' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'MerkleRootAlreadySetForBlock' },
  { type: 'error', inputs: [], name: 'MerkleRootNotSet' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'merkleRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false
      }
    ],
    name: 'AddMerkleRoot'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'blockNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'merkleProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
        indexed: false
      }
    ],
    name: 'Claim'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'numClaims',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'totalAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'ClaimBatch'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'addMerkleRoot',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' }
    ],
    name: 'claim',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_reportBlock', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'isClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IELBridge
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ielBridgeAbi = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_minGasLimit', internalType: 'uint32', type: 'uint32' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'bridgeETHTo',
    outputs: []
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IELDepositContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ielDepositContractAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pubkey', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'withdrawal_credentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      { name: 'amount', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'signature',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      { name: 'index', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'DepositEvent'
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'pubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'withdrawal_credentials', internalType: 'bytes', type: 'bytes' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
      { name: 'deposit_data_root', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'deposit',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'get_deposit_count',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'get_deposit_root',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IELRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ielRouterAbi = [
  { type: 'error', inputs: [], name: 'AlreadyExecuted' },
  { type: 'error', inputs: [], name: 'AlreadyReported' },
  { type: 'error', inputs: [], name: 'BeaconBalanceTooLow' },
  { type: 'error', inputs: [], name: 'BlockNumberNotReached' },
  { type: 'error', inputs: [], name: 'ConfigNotSet' },
  { type: 'error', inputs: [], name: 'ConsensusNotDelayed' },
  { type: 'error', inputs: [], name: 'EarlyExecution' },
  { type: 'error', inputs: [], name: 'IncreaseOraclesToUseMargin' },
  { type: 'error', inputs: [], name: 'InsufficientEthBalance' },
  { type: 'error', inputs: [], name: 'MarginTooHigh' },
  { type: 'error', inputs: [], name: 'NoActiveConsensus' },
  { type: 'error', inputs: [], name: 'NoPendingExecution' },
  { type: 'error', inputs: [], name: 'OnlyActiveOracle' },
  { type: 'error', inputs: [], name: 'OnlyStakeTogether' },
  { type: 'error', inputs: [], name: 'OracleAlreadyBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleAlreadyReported' },
  { type: 'error', inputs: [], name: 'OracleBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleExists' },
  { type: 'error', inputs: [], name: 'OracleNotBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleNotExists' },
  { type: 'error', inputs: [], name: 'PendingExecution' },
  { type: 'error', inputs: [], name: 'QuorumNotReached' },
  { type: 'error', inputs: [], name: 'ReportBlockShouldBeGreater' },
  { type: 'error', inputs: [], name: 'ReportDelayBlocksTooHigh' },
  { type: 'error', inputs: [], name: 'ReportRevoked' },
  { type: 'error', inputs: [], name: 'RequiredMoreOracles' },
  { type: 'error', inputs: [], name: 'SentinelExists' },
  { type: 'error', inputs: [], name: 'SentinelNotExists' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'WithdrawBalanceTooLow' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'reportNextBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'AdvanceNextBlock'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'BlacklistReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ConsensusApprove'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ConsensusFail'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ExecuteReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveBridgeEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveWithdrawEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'RevokeConsensusReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'bunkerMode', internalType: 'bool', type: 'bool', indexed: true }],
    name: 'SetBunkerMode'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IELRouter.Config',
        type: 'tuple',
        components: [
          { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reportDelayBlock',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'reportNoConsensusMargin',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
        ],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: true
      }
    ],
    name: 'SubmitReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'UnBlacklistReportOracle'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addSentinel',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'blacklistReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'executeReport',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'forceNextReportBlock',
    outputs: []
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'getReportHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_airdrop', internalType: 'address', type: 'address' },
      { name: '_bridge', internalType: 'address', type: 'address' },
      { name: '_withdrawals', internalType: 'address', type: 'address' }
    ],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'isReadyToExecute',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'isReadyToSubmit',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isReportOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isReportOracleBlackListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'receiveWithdrawEther',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeSentinel',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'reportBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_reportBlock', internalType: 'uint256', type: 'uint256' }],
    name: 'revokeConsensusReport',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IELRouter.Config',
        type: 'tuple',
        components: [
          { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reportDelayBlock',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'reportNoConsensusMargin',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
        ]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IELRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'submitReport',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'unBlacklistReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IELStakeTogether
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ielstakeTogetherAbi = [
  { type: 'error', inputs: [], name: 'DepositLimitReached' },
  { type: 'error', inputs: [], name: 'EarlyTransfer' },
  { type: 'error', inputs: [], name: 'FeatureDisabled' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'InsufficientAccountBalance' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientBeaconBalance' },
  { type: 'error', inputs: [], name: 'InsufficientPoolBalance' },
  { type: 'error', inputs: [], name: 'InsufficientShares' },
  { type: 'error', inputs: [], name: 'InvalidLength' },
  { type: 'error', inputs: [], name: 'InvalidSize' },
  { type: 'error', inputs: [], name: 'InvalidSum' },
  { type: 'error', inputs: [], name: 'InvalidTotalPercentage' },
  { type: 'error', inputs: [], name: 'InvalidTotalSupply' },
  { type: 'error', inputs: [], name: 'InvalidValue' },
  { type: 'error', inputs: [], name: 'L1AdapterAlreadySet' },
  { type: 'error', inputs: [], name: 'LessThanMinimumDeposit' },
  { type: 'error', inputs: [], name: 'LessThanMinimumWithdraw' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'MaxDelegations' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  { type: 'error', inputs: [], name: 'NotEnoughPoolBalance' },
  { type: 'error', inputs: [], name: 'NotInAntiFraudList' },
  { type: 'error', inputs: [], name: 'NotIsCurrentValidatorOracle' },
  { type: 'error', inputs: [], name: 'OnlyAirdrop' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'OnlyValidatorOracle' },
  { type: 'error', inputs: [], name: 'PoolExists' },
  { type: 'error', inputs: [], name: 'PoolNotFound' },
  { type: 'error', inputs: [], name: 'RouterAlreadyHaveBalance' },
  { type: 'error', inputs: [], name: 'ShouldBeZeroLength' },
  { type: 'error', inputs: [], name: 'ValidatorOracleExists' },
  { type: 'error', inputs: [], name: 'ValidatorOracleNotFound' },
  { type: 'error', inputs: [], name: 'WithdrawFromPool' },
  { type: 'error', inputs: [], name: 'WithdrawZeroBalance' },
  { type: 'error', inputs: [], name: 'WithdrawalsPoolLimitReached' },
  { type: 'error', inputs: [], name: 'WithdrawalsValidatorLimitWasReached' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroSupply' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'listed', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'social', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'index', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'AddPool'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'AnticipateWithdrawBeacon'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'BurnShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'depositType',
        internalType: 'enum IELStakeTogether.DepositType',
        type: 'uint8',
        indexed: false
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'referral', internalType: 'bytes', type: 'bytes', indexed: true }
    ],
    name: 'DepositBase'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'DepositLimitWasReached'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'feeType',
        internalType: 'enum IELStakeTogether.FeeType',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'feeRole',
        internalType: 'enum IELStakeTogether.FeeRole',
        type: 'uint8',
        indexed: true
      }
    ],
    name: 'MintFeeShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'MintShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'NextValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ProcessStakeRewards'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'ProcessStakeValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'pool', internalType: 'address', type: 'address', indexed: true }],
    name: 'RemovePool'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'minGasLimit',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false
      },
      {
        name: 'extraData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      }
    ],
    name: 'RequestAddValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'adapter',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetAdapter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      { name: 'isListed', internalType: 'bool', type: 'bool', indexed: false }
    ],
    name: 'SetAntiFraudStatus'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetBeaconBalance'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IELStakeTogether.Config',
        type: 'tuple',
        components: [
          { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
          { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minDepositAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'minWithdrawAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
          { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawalPoolLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'withdrawalValidatorLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawBeaconDelay',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'feature',
            internalType: 'struct IELStakeTogether.Feature',
            type: 'tuple',
            components: [
              { name: 'AddPool', internalType: 'bool', type: 'bool' },
              { name: 'Deposit', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
            ]
          }
        ],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeType',
        internalType: 'enum IELStakeTogether.FeeType',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'allocations',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false
      }
    ],
    name: 'SetFee'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'role',
        internalType: 'enum IELStakeTogether.FeeRole',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetFeeAddress'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newValidatorSize',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetValidatorSize'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetWithdrawBalance'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalCredentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: true
      }
    ],
    name: 'SetWithdrawalsCredentials'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'TransferShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'delegations',
        internalType: 'struct IELStakeTogether.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' }
        ],
        indexed: false
      }
    ],
    name: 'UpdateDelegations'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'withdrawType',
        internalType: 'enum IELStakeTogether.WithdrawType',
        type: 'uint8',
        indexed: false
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'WithdrawBase'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'withdrawType',
        internalType: 'enum IELStakeTogether.WithdrawType',
        type: 'uint8',
        indexed: false
      }
    ],
    name: 'WithdrawalsLimitWasReached'
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_listed', internalType: 'bool', type: 'bool' },
      { name: '_social', internalType: 'bool', type: 'bool' },
      { name: '_index', internalType: 'bool', type: 'bool' }
    ],
    name: 'addPool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addToAntiFraud',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'anticipateWithdrawBeacon',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_spender', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'beaconBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'claimAirdrop',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_referral', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'depositDonation',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_referral', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'depositPool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'forceNextValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_role',
        internalType: 'enum IELStakeTogether.FeeRole',
        type: 'uint8'
      }
    ],
    name: 'getFeeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'getFeesRoles',
    outputs: [
      {
        name: '',
        internalType: 'enum IELStakeTogether.FeeRole[4]',
        type: 'uint8[4]'
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getWithdrawBeaconBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getWithdrawBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isListedInAntiFraud',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isValidatorOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'processFeeRewards',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeFromAntiFraud',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pool', internalType: 'address', type: 'address' }],
    name: 'removePool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_minGasLimit', internalType: 'uint32', type: 'uint32' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'requestAddValidator',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setBeaconBalance',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IELStakeTogether.Config',
        type: 'tuple',
        components: [
          { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
          { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minDepositAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'minWithdrawAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
          { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawalPoolLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'withdrawalValidatorLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawBeaconDelay',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'feature',
            internalType: 'struct IELStakeTogether.Feature',
            type: 'tuple',
            components: [
              { name: 'AddPool', internalType: 'bool', type: 'bool' },
              { name: 'Deposit', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
            ]
          }
        ]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_feeType',
        internalType: 'enum IELStakeTogether.FeeType',
        type: 'uint8'
      },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
      { name: '_allocations', internalType: 'uint256[]', type: 'uint256[]' }
    ],
    name: 'setFee',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_role',
        internalType: 'enum IELStakeTogether.FeeRole',
        type: 'uint8'
      },
      { name: '_address', internalType: 'address payable', type: 'address' }
    ],
    name: 'setFeeAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_l1adapter', internalType: 'address', type: 'address' }],
    name: 'setL1Adapter',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setWithdrawBalance',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'sharesByWei',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_delegations',
        internalType: 'struct IELStakeTogether.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' }
        ]
      }
    ],
    name: 'updateDelegations',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'weiByShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_pool', internalType: 'address', type: 'address' }
    ],
    name: 'withdrawBeacon',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_pool', internalType: 'address', type: 'address' }
    ],
    name: 'withdrawPool',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IELWithdrawals
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ielWithdrawalsAbi = [
  { type: 'error', inputs: [], name: 'EarlyBeaconTransfer' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'InsufficientEthBalance' },
  { type: 'error', inputs: [], name: 'InsufficientStwBalance' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'OnlyStakeTogether' },
  { type: 'error', inputs: [], name: 'RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveWithdrawEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Withdraw'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'isWithdrawReady',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'receiveWithdrawEther',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC1155InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover'
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC1155InvalidArrayLength'
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender'
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC1155MissingApprovalForAll'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165Abi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1822Proxiable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1822ProxiableAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: []
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC5267
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc5267Abi = [
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' }
    ]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC721IncorrectOwner'
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC721InsufficientApproval'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator'
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iRouterAbi = [
  { type: 'error', inputs: [], name: 'AlreadyExecuted' },
  { type: 'error', inputs: [], name: 'AlreadyReported' },
  { type: 'error', inputs: [], name: 'BeaconBalanceTooLow' },
  { type: 'error', inputs: [], name: 'BlockNumberNotReached' },
  { type: 'error', inputs: [], name: 'ConfigNotSet' },
  { type: 'error', inputs: [], name: 'ConsensusNotDelayed' },
  { type: 'error', inputs: [], name: 'EarlyExecution' },
  { type: 'error', inputs: [], name: 'IncreaseOraclesToUseMargin' },
  { type: 'error', inputs: [], name: 'InsufficientEthBalance' },
  { type: 'error', inputs: [], name: 'MarginTooHigh' },
  { type: 'error', inputs: [], name: 'NoActiveConsensus' },
  { type: 'error', inputs: [], name: 'NoPendingExecution' },
  { type: 'error', inputs: [], name: 'OnlyActiveOracle' },
  { type: 'error', inputs: [], name: 'OnlyStakeTogether' },
  { type: 'error', inputs: [], name: 'OracleAlreadyBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleAlreadyReported' },
  { type: 'error', inputs: [], name: 'OracleBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleExists' },
  { type: 'error', inputs: [], name: 'OracleNotBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleNotExists' },
  { type: 'error', inputs: [], name: 'PendingExecution' },
  { type: 'error', inputs: [], name: 'QuorumNotReached' },
  { type: 'error', inputs: [], name: 'ReportBlockShouldBeGreater' },
  { type: 'error', inputs: [], name: 'ReportDelayBlocksTooHigh' },
  { type: 'error', inputs: [], name: 'ReportRevoked' },
  { type: 'error', inputs: [], name: 'RequiredMoreOracles' },
  { type: 'error', inputs: [], name: 'SentinelExists' },
  { type: 'error', inputs: [], name: 'SentinelNotExists' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'WithdrawBalanceTooLow' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'reportNextBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'AdvanceNextBlock'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'BlacklistReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ConsensusApprove'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ConsensusFail'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ExecuteReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveWithdrawEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'RevokeConsensusReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'bunkerMode', internalType: 'bool', type: 'bool', indexed: true }],
    name: 'SetBunkerMode'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IRouter.Config',
        type: 'tuple',
        components: [
          { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reportDelayBlock',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'reportNoConsensusMargin',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
        ],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: true
      }
    ],
    name: 'SubmitReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'UnBlacklistReportOracle'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addSentinel',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'blacklistReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'executeReport',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'forceNextReportBlock',
    outputs: []
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'getReportHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_airdrop', internalType: 'address', type: 'address' },
      { name: '_withdrawals', internalType: 'address', type: 'address' }
    ],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'isReadyToExecute',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'isReadyToSubmit',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isReportOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isReportOracleBlackListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'receiveWithdrawEther',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeSentinel',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'reportBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_reportBlock', internalType: 'uint256', type: 'uint256' }],
    name: 'revokeConsensusReport',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IRouter.Config',
        type: 'tuple',
        components: [
          { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reportDelayBlock',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'reportNoConsensusMargin',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
        ]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'submitReport',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'unBlacklistReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IStakeTogether
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const istakeTogetherAbi = [
  { type: 'error', inputs: [], name: 'DepositLimitReached' },
  { type: 'error', inputs: [], name: 'EarlyTransfer' },
  { type: 'error', inputs: [], name: 'FeatureDisabled' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'InsufficientAccountBalance' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientBeaconBalance' },
  { type: 'error', inputs: [], name: 'InsufficientPoolBalance' },
  { type: 'error', inputs: [], name: 'InsufficientShares' },
  { type: 'error', inputs: [], name: 'InvalidLength' },
  { type: 'error', inputs: [], name: 'InvalidSize' },
  { type: 'error', inputs: [], name: 'InvalidSum' },
  { type: 'error', inputs: [], name: 'InvalidTotalPercentage' },
  { type: 'error', inputs: [], name: 'InvalidTotalSupply' },
  { type: 'error', inputs: [], name: 'InvalidValue' },
  { type: 'error', inputs: [], name: 'LessThanMinimumDeposit' },
  { type: 'error', inputs: [], name: 'LessThanMinimumWithdraw' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'MaxDelegations' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  { type: 'error', inputs: [], name: 'NotEnoughBalanceOnPool' },
  { type: 'error', inputs: [], name: 'NotEnoughPoolBalance' },
  { type: 'error', inputs: [], name: 'NotInAntiFraudList' },
  { type: 'error', inputs: [], name: 'NotIsCurrentValidatorOracle' },
  { type: 'error', inputs: [], name: 'OnlyAirdrop' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'OnlyValidatorOracle' },
  { type: 'error', inputs: [], name: 'PoolExists' },
  { type: 'error', inputs: [], name: 'PoolNotFound' },
  { type: 'error', inputs: [], name: 'RouterAlreadyHaveBalance' },
  { type: 'error', inputs: [], name: 'ShouldAnticipateWithdraw' },
  { type: 'error', inputs: [], name: 'ShouldBeZeroLength' },
  { type: 'error', inputs: [], name: 'ValidatorExists' },
  { type: 'error', inputs: [], name: 'ValidatorOracleExists' },
  { type: 'error', inputs: [], name: 'ValidatorOracleNotFound' },
  { type: 'error', inputs: [], name: 'WithdrawFromPool' },
  { type: 'error', inputs: [], name: 'WithdrawZeroBalance' },
  { type: 'error', inputs: [], name: 'WithdrawalsPoolLimitReached' },
  { type: 'error', inputs: [], name: 'WithdrawalsValidatorLimitWasReached' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroSupply' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'listed', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'social', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'index', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'AddPool'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'publicKey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'withdrawalCredentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'signature',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'depositDataRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false
      }
    ],
    name: 'AddValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'AnticipateWithdrawBeacon'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'BurnShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'depositType',
        internalType: 'enum IStakeTogether.DepositType',
        type: 'uint8',
        indexed: false
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'referral', internalType: 'bytes', type: 'bytes', indexed: true }
    ],
    name: 'DepositBase'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'DepositLimitWasReached'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'feeType',
        internalType: 'enum IStakeTogether.FeeType',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'feeRole',
        internalType: 'enum IStakeTogether.FeeRole',
        type: 'uint8',
        indexed: true
      }
    ],
    name: 'MintFeeShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'MintShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'NextValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ProcessStakeRewards'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'ProcessStakeValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'pool', internalType: 'address', type: 'address', indexed: true }],
    name: 'RemovePool'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      { name: 'isListed', internalType: 'bool', type: 'bool', indexed: false }
    ],
    name: 'SetAntiFraudStatus'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetBeaconBalance'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IStakeTogether.Config',
        type: 'tuple',
        components: [
          { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
          { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minDepositAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'minWithdrawAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
          { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawalPoolLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'withdrawalValidatorLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawBeaconDelay',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'feature',
            internalType: 'struct IStakeTogether.Feature',
            type: 'tuple',
            components: [
              { name: 'AddPool', internalType: 'bool', type: 'bool' },
              { name: 'Deposit', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
            ]
          }
        ],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeType',
        internalType: 'enum IStakeTogether.FeeType',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'allocations',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false
      }
    ],
    name: 'SetFee'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'role',
        internalType: 'enum IStakeTogether.FeeRole',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetFeeAddress'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newValidatorSize',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetValidatorSize'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetWithdrawBalance'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalCredentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: true
      }
    ],
    name: 'SetWithdrawalsCredentials'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'TransferShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'delegations',
        internalType: 'struct IStakeTogether.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' }
        ],
        indexed: false
      }
    ],
    name: 'UpdateDelegations'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'withdrawType',
        internalType: 'enum IStakeTogether.WithdrawType',
        type: 'uint8',
        indexed: false
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'WithdrawBase'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'withdrawType',
        internalType: 'enum IStakeTogether.WithdrawType',
        type: 'uint8',
        indexed: false
      }
    ],
    name: 'WithdrawalsLimitWasReached'
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_listed', internalType: 'bool', type: 'bool' },
      { name: '_social', internalType: 'bool', type: 'bool' },
      { name: '_index', internalType: 'bool', type: 'bool' }
    ],
    name: 'addPool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addToAntiFraud',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_publicKey', internalType: 'bytes', type: 'bytes' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
      { name: '_depositDataRoot', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'addValidator',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'anticipateWithdrawBeacon',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_spender', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'beaconBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'claimAirdrop',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_referral', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'depositDonation',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_referral', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'depositPool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'forceNextValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_role',
        internalType: 'enum IStakeTogether.FeeRole',
        type: 'uint8'
      }
    ],
    name: 'getFeeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'getFeesRoles',
    outputs: [
      {
        name: '',
        internalType: 'enum IStakeTogether.FeeRole[4]',
        type: 'uint8[4]'
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getWithdrawBeaconBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getWithdrawBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isListedInAntiFraud',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isValidatorOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'processFeeRewards',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeFromAntiFraud',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pool', internalType: 'address', type: 'address' }],
    name: 'removePool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setBeaconBalance',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IStakeTogether.Config',
        type: 'tuple',
        components: [
          { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
          { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minDepositAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'minWithdrawAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
          { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawalPoolLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'withdrawalValidatorLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawBeaconDelay',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'feature',
            internalType: 'struct IStakeTogether.Feature',
            type: 'tuple',
            components: [
              { name: 'AddPool', internalType: 'bool', type: 'bool' },
              { name: 'Deposit', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
            ]
          }
        ]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_feeType',
        internalType: 'enum IStakeTogether.FeeType',
        type: 'uint8'
      },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
      { name: '_allocations', internalType: 'uint256[]', type: 'uint256[]' }
    ],
    name: 'setFee',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_role',
        internalType: 'enum IStakeTogether.FeeRole',
        type: 'uint8'
      },
      { name: '_address', internalType: 'address payable', type: 'address' }
    ],
    name: 'setFeeAddress',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setWithdrawBalance',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'sharesByWei',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_delegations',
        internalType: 'struct IStakeTogether.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' }
        ]
      }
    ],
    name: 'updateDelegations',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'weiByShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_pool', internalType: 'address', type: 'address' }
    ],
    name: 'withdrawBeacon',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_pool', internalType: 'address', type: 'address' }
    ],
    name: 'withdrawPool',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IStakeTogetherWrapper
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iStakeTogetherWrapperAbi = [
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'TransferStpEthFailed' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroStpETHAmount' },
  { type: 'error', inputs: [], name: 'ZeroWstpETHAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'wstpETHAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'stpETHAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Unwrapped'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'stpETHAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'wstpETHAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Wrapped'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_wstpETH', internalType: 'uint256', type: 'uint256' }],
    name: 'stpEthPerWstpETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_wstpETH', internalType: 'uint256', type: 'uint256' }],
    name: 'unwrap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stpETH', internalType: 'uint256', type: 'uint256' }],
    name: 'wrap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_stpETH', internalType: 'uint256', type: 'uint256' }],
    name: 'wstpETHPerStpETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IWithdrawals
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iWithdrawalsAbi = [
  { type: 'error', inputs: [], name: 'EarlyBeaconTransfer' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'InsufficientEthBalance' },
  { type: 'error', inputs: [], name: 'InsufficientStwBalance' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'OnlyStakeTogether' },
  { type: 'error', inputs: [], name: 'RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveWithdrawEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Withdraw'
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'isWithdrawReady',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'receiveWithdrawEther',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initializable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const initializableAbi = [
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Math
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mathAbi = [{ type: 'error', inputs: [], name: 'MathOverflowedMulDiv' }] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MerkleProof
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const merkleProofAbi = [{ type: 'error', inputs: [], name: 'MerkleProofInvalidMultiproof' }] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NoncesUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const noncesUpgradeableAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'InvalidAccountNonce'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PausableUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pausableUpgradeableAbi = [
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReentrancyGuardUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reentrancyGuardUpgradeableAbi = [
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Router
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const routerAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  { type: 'error', inputs: [], name: 'AlreadyExecuted' },
  { type: 'error', inputs: [], name: 'AlreadyReported' },
  { type: 'error', inputs: [], name: 'BeaconBalanceTooLow' },
  { type: 'error', inputs: [], name: 'BlockNumberNotReached' },
  { type: 'error', inputs: [], name: 'ConfigNotSet' },
  { type: 'error', inputs: [], name: 'ConsensusNotDelayed' },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EarlyExecution' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'IncreaseOraclesToUseMargin' },
  { type: 'error', inputs: [], name: 'InsufficientEthBalance' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MarginTooHigh' },
  { type: 'error', inputs: [], name: 'MathOverflowedMulDiv' },
  { type: 'error', inputs: [], name: 'NoActiveConsensus' },
  { type: 'error', inputs: [], name: 'NoPendingExecution' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyActiveOracle' },
  { type: 'error', inputs: [], name: 'OnlyStakeTogether' },
  { type: 'error', inputs: [], name: 'OracleAlreadyBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleAlreadyReported' },
  { type: 'error', inputs: [], name: 'OracleBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleExists' },
  { type: 'error', inputs: [], name: 'OracleNotBlacklisted' },
  { type: 'error', inputs: [], name: 'OracleNotExists' },
  { type: 'error', inputs: [], name: 'PendingExecution' },
  { type: 'error', inputs: [], name: 'QuorumNotReached' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'ReportBlockShouldBeGreater' },
  { type: 'error', inputs: [], name: 'ReportDelayBlocksTooHigh' },
  { type: 'error', inputs: [], name: 'ReportRevoked' },
  { type: 'error', inputs: [], name: 'RequiredMoreOracles' },
  { type: 'error', inputs: [], name: 'SentinelExists' },
  { type: 'error', inputs: [], name: 'SentinelNotExists' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'WithdrawBalanceTooLow' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'reportNextBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'AdvanceNextBlock'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'BlacklistReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ConsensusApprove'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ConsensusFail'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: false
      }
    ],
    name: 'ExecuteReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveWithdrawEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'reportBlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'RevokeConsensusReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'bunkerMode', internalType: 'bool', type: 'bool', indexed: true }],
    name: 'SetBunkerMode'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IRouter.Config',
        type: 'tuple',
        components: [
          { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reportDelayBlock',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'reportNoConsensusMargin',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
        ],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ],
        indexed: true
      }
    ],
    name: 'SubmitReport'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reportOracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'UnBlacklistReportOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ORACLE_REPORT_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ORACLE_REPORT_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ORACLE_SENTINEL_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addSentinel',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airdrop',
    outputs: [{ name: '', internalType: 'contract IAirdrop', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'blacklistReportOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bunkermode',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
      { name: 'reportDelayBlock', internalType: 'uint256', type: 'uint256' },
      {
        name: 'reportNoConsensusMargin',
        internalType: 'uint256',
        type: 'uint256'
      },
      { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'consensusReport',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'executeReport',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'executedReports',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'forceNextReportBlock',
    outputs: []
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'getReportHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_airdrop', internalType: 'address', type: 'address' },
      { name: '_withdrawals', internalType: 'address', type: 'address' }
    ],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'isReadyToExecute',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'isReadyToSubmit',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isReportOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isReportOracleBlackListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastConsensusBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastExecutedBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingExecution',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'receiveWithdrawEther',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeSentinel',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'reportBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'reportDelayBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'reportOraclesBlacklist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'reportVotesForBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'reports',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_reportBlock', internalType: 'uint256', type: 'uint256' }],
    name: 'revokeConsensusReport',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'revokedReports',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_bunkerMode', internalType: 'bool', type: 'bool' }],
    name: 'setBunkerMode',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IRouter.Config',
        type: 'tuple',
        components: [
          { name: 'reportFrequency', internalType: 'uint256', type: 'uint256' },
          {
            name: 'reportDelayBlock',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'reportNoConsensusMargin',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'oracleQuorum', internalType: 'uint256', type: 'uint256' }
        ]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakeTogether',
    outputs: [{ name: '', internalType: 'contract IStakeTogether', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_report',
        internalType: 'struct IRouter.Report',
        type: 'tuple',
        components: [
          { name: 'reportBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'profitAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'profitShares', internalType: 'uint256', type: 'uint256' },
          { name: 'lossAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawRefundAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'accumulatedReports',
            internalType: 'uint256',
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'submitReport',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalReportOracles',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'totalVotes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'unBlacklistReportOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawals',
    outputs: [{ name: '', internalType: 'contract IWithdrawals', type: 'address' }]
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakeTogether
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakeTogetherAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'DepositLimitReached' },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength'
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature'
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC2612InvalidSigner'
  },
  { type: 'error', inputs: [], name: 'EarlyTransfer' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'FeatureDisabled' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'InsufficientAccountBalance' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientBeaconBalance' },
  { type: 'error', inputs: [], name: 'InsufficientPoolBalance' },
  { type: 'error', inputs: [], name: 'InsufficientShares' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'InvalidAccountNonce'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidLength' },
  { type: 'error', inputs: [], name: 'InvalidSize' },
  { type: 'error', inputs: [], name: 'InvalidSum' },
  { type: 'error', inputs: [], name: 'InvalidTotalPercentage' },
  { type: 'error', inputs: [], name: 'InvalidTotalSupply' },
  { type: 'error', inputs: [], name: 'InvalidValue' },
  { type: 'error', inputs: [], name: 'LessThanMinimumDeposit' },
  { type: 'error', inputs: [], name: 'LessThanMinimumWithdraw' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'MathOverflowedMulDiv' },
  { type: 'error', inputs: [], name: 'MaxDelegations' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  { type: 'error', inputs: [], name: 'NotEnoughBalanceOnPool' },
  { type: 'error', inputs: [], name: 'NotEnoughPoolBalance' },
  { type: 'error', inputs: [], name: 'NotInAntiFraudList' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'NotIsCurrentValidatorOracle' },
  { type: 'error', inputs: [], name: 'OnlyAirdrop' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'OnlyValidatorOracle' },
  { type: 'error', inputs: [], name: 'PoolExists' },
  { type: 'error', inputs: [], name: 'PoolNotFound' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RouterAlreadyHaveBalance' },
  { type: 'error', inputs: [], name: 'ShouldAnticipateWithdraw' },
  { type: 'error', inputs: [], name: 'ShouldBeZeroLength' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'ValidatorExists' },
  { type: 'error', inputs: [], name: 'ValidatorOracleExists' },
  { type: 'error', inputs: [], name: 'ValidatorOracleNotFound' },
  { type: 'error', inputs: [], name: 'WithdrawFromPool' },
  { type: 'error', inputs: [], name: 'WithdrawZeroBalance' },
  { type: 'error', inputs: [], name: 'WithdrawalsPoolLimitReached' },
  { type: 'error', inputs: [], name: 'WithdrawalsValidatorLimitWasReached' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  { type: 'error', inputs: [], name: 'ZeroSupply' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'listed', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'social', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'index', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'AddPool'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'publicKey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'withdrawalCredentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'signature',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      },
      {
        name: 'depositDataRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false
      }
    ],
    name: 'AddValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'AddValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oracle',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'AnticipateWithdrawBeacon'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'BurnShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'depositType',
        internalType: 'enum IStakeTogether.DepositType',
        type: 'uint8',
        indexed: false
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      { name: 'referral', internalType: 'bytes', type: 'bytes', indexed: true }
    ],
    name: 'DepositBase'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'DepositLimitWasReached'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'feeType',
        internalType: 'enum IStakeTogether.FeeType',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'feeRole',
        internalType: 'enum IStakeTogether.FeeRole',
        type: 'uint8',
        indexed: true
      }
    ],
    name: 'MintFeeShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'MintShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'NextValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ProcessStakeRewards'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'ProcessStakeValidator'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'pool', internalType: 'address', type: 'address', indexed: true }],
    name: 'RemovePool'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RemoveValidatorOracle'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      { name: 'isListed', internalType: 'bool', type: 'bool', indexed: false }
    ],
    name: 'SetAntiFraudStatus'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetBeaconBalance'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'config',
        internalType: 'struct IStakeTogether.Config',
        type: 'tuple',
        components: [
          { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
          { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minDepositAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'minWithdrawAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
          { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawalPoolLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'withdrawalValidatorLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawBeaconDelay',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'feature',
            internalType: 'struct IStakeTogether.Feature',
            type: 'tuple',
            components: [
              { name: 'AddPool', internalType: 'bool', type: 'bool' },
              { name: 'Deposit', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
            ]
          }
        ],
        indexed: true
      }
    ],
    name: 'SetConfig'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeType',
        internalType: 'enum IStakeTogether.FeeType',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'allocations',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false
      }
    ],
    name: 'SetFee'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'role',
        internalType: 'enum IStakeTogether.FeeRole',
        type: 'uint8',
        indexed: true
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetFeeAddress'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newValidatorSize',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetValidatorSize'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'SetWithdrawBalance'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalCredentials',
        internalType: 'bytes',
        type: 'bytes',
        indexed: true
      }
    ],
    name: 'SetWithdrawalsCredentials'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'TransferShares'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'delegations',
        internalType: 'struct IStakeTogether.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' }
        ],
        indexed: false
      }
    ],
    name: 'UpdateDelegations'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'withdrawType',
        internalType: 'enum IStakeTogether.WithdrawType',
        type: 'uint8',
        indexed: false
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'WithdrawBase'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'withdrawType',
        internalType: 'enum IStakeTogether.WithdrawType',
        type: 'uint8',
        indexed: false
      }
    ],
    name: 'WithdrawalsLimitWasReached'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ANTI_FRAUD_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ANTI_FRAUD_SENTINEL_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'POOL_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VALIDATOR_ORACLE_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VALIDATOR_ORACLE_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VALIDATOR_ORACLE_SENTINEL_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_listed', internalType: 'bool', type: 'bool' },
      { name: '_social', internalType: 'bool', type: 'bool' },
      { name: '_index', internalType: 'bool', type: 'bool' }
    ],
    name: 'addPool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addToAntiFraud',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_publicKey', internalType: 'bytes', type: 'bytes' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
      { name: '_depositDataRoot', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'addValidator',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'addValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'airdrop',
    outputs: [{ name: '', internalType: 'contract IAirdrop', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'anticipateWithdrawBeacon',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_spender', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'beaconBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burnFrom',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'claimAirdrop',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
      { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
      { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
      { name: 'minDepositAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'minWithdrawAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
      { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
      { name: 'withdrawalPoolLimit', internalType: 'uint256', type: 'uint256' },
      {
        name: 'withdrawalValidatorLimit',
        internalType: 'uint256',
        type: 'uint256'
      },
      { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
      { name: 'withdrawBeaconDelay', internalType: 'uint256', type: 'uint256' },
      {
        name: 'feature',
        internalType: 'struct IStakeTogether.Feature',
        type: 'tuple',
        components: [
          { name: 'AddPool', internalType: 'bool', type: 'bool' },
          { name: 'Deposit', internalType: 'bool', type: 'bool' },
          { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
          { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
        ]
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currentOracleIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [{ name: '', internalType: 'contract IDepositContract', type: 'address' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_referral', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'depositDonation',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_referral', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'depositPool',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' }
    ]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'forceNextValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_feeType',
        internalType: 'enum IStakeTogether.FeeType',
        type: 'uint8'
      }
    ],
    name: 'getFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: '_role',
        internalType: 'enum IStakeTogether.FeeRole',
        type: 'uint8'
      }
    ],
    name: 'getFeeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'getFeesRoles',
    outputs: [
      {
        name: '',
        internalType: 'enum IStakeTogether.FeeRole[4]',
        type: 'uint8[4]'
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getWithdrawBeaconBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getWithdrawBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_airdrop', internalType: 'address', type: 'address' },
      { name: '_deposit', internalType: 'address', type: 'address' },
      { name: '_router', internalType: 'address', type: 'address' },
      { name: '_withdrawals', internalType: 'address', type: 'address' },
      { name: '_withdrawalCredentials', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isListedInAntiFraud',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isValidatorOracle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastResetBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'pools',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'processFeeRewards',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeFromAntiFraud',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pool', internalType: 'address', type: 'address' }],
    name: 'removePool',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'removeValidatorOracle',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IRouter', type: 'address' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setBeaconBalance',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct IStakeTogether.Config',
        type: 'tuple',
        components: [
          { name: 'blocksPerDay', internalType: 'uint256', type: 'uint256' },
          { name: 'depositLimit', internalType: 'uint256', type: 'uint256' },
          { name: 'maxDelegations', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minDepositAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'minWithdrawAmount',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'poolSize', internalType: 'uint256', type: 'uint256' },
          { name: 'validatorSize', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawalPoolLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'withdrawalValidatorLimit',
            internalType: 'uint256',
            type: 'uint256'
          },
          { name: 'withdrawDelay', internalType: 'uint256', type: 'uint256' },
          {
            name: 'withdrawBeaconDelay',
            internalType: 'uint256',
            type: 'uint256'
          },
          {
            name: 'feature',
            internalType: 'struct IStakeTogether.Feature',
            type: 'tuple',
            components: [
              { name: 'AddPool', internalType: 'bool', type: 'bool' },
              { name: 'Deposit', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawPool', internalType: 'bool', type: 'bool' },
              { name: 'WithdrawBeacon', internalType: 'bool', type: 'bool' }
            ]
          }
        ]
      }
    ],
    name: 'setConfig',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_feeType',
        internalType: 'enum IStakeTogether.FeeType',
        type: 'uint8'
      },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
      { name: '_allocations', internalType: 'uint256[]', type: 'uint256[]' }
    ],
    name: 'setFee',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_role',
        internalType: 'enum IStakeTogether.FeeRole',
        type: 'uint8'
      },
      { name: '_address', internalType: 'address payable', type: 'address' }
    ],
    name: 'setFeeAddress',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setWithdrawBalance',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'shares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'sharesByWei',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalDeposited',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalWithdrawnPool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalWithdrawnValidator',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_delegations',
        internalType: 'struct IStakeTogether.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'pool', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' }
        ]
      }
    ],
    name: 'updateDelegations',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'validators',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_sharesAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'weiByShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_pool', internalType: 'address', type: 'address' }
    ],
    name: 'withdrawBeacon',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_pool', internalType: 'address', type: 'address' }
    ],
    name: 'withdrawPool',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawalCredentials',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'withdrawals',
    outputs: [{ name: '', internalType: 'contract IWithdrawals', type: 'address' }]
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakeTogetherWrapper
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakeTogetherWrapperAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength'
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature'
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC2612InvalidSigner'
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'InvalidAccountNonce'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'TransferStpEthFailed' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroStpETHAmount' },
  { type: 'error', inputs: [], name: 'ZeroWstpETHAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'wstpETHAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'stpETHAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Unwrapped'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'stpETHAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'wstpETHAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Wrapped'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burnFrom',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakeTogether',
    outputs: [{ name: '', internalType: 'contract IStakeTogether', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_wstpETH', internalType: 'uint256', type: 'uint256' }],
    name: 'stpEthPerWstpETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_wstpETH', internalType: 'uint256', type: 'uint256' }],
    name: 'unwrap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stpETH', internalType: 'uint256', type: 'uint256' }],
    name: 'wrap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_stpETH', internalType: 'uint256', type: 'uint256' }],
    name: 'wstpETHPerStpETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'StringsInsufficientHexLength'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UUPSUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uupsUpgradeableAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Withdrawals
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const withdrawalsAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount'
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode'
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance'
  },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength'
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS'
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation'
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientAllowance'
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'ERC20InsufficientBalance'
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover'
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver'
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender'
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender'
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature'
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' }
    ],
    name: 'ERC2612InvalidSigner'
  },
  { type: 'error', inputs: [], name: 'EarlyBeaconTransfer' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'FlashLoan' },
  { type: 'error', inputs: [], name: 'InsufficientEthBalance' },
  { type: 'error', inputs: [], name: 'InsufficientStwBalance' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'InvalidAccountNonce'
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'ListedInAntiFraud' },
  { type: 'error', inputs: [], name: 'NoExtraAmountAvailable' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyRouter' },
  { type: 'error', inputs: [], name: 'OnlyStakeTogether' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RouterAlreadySet' },
  { type: 'error', inputs: [], name: 'StakeTogetherAlreadySet' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID'
  },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Approval'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false
      }
    ],
    name: 'Initialized'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'ReceiveWithdrawEther'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'RoleAdminChanged'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleGranted'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'RoleRevoked'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'router',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetRouter'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakeTogether',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'SetStakeTogether'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'Upgraded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'Withdraw'
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burnFrom',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'grantRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'isWithdrawReady',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'receiveWithdrawEther',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IRouter', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
    name: 'setRouter',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_stakeTogether', internalType: 'address', type: 'address' }],
    name: 'setStakeTogether',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakeTogether',
    outputs: [{ name: '', internalType: 'contract IStakeTogether', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferExtraAmount',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'upgradeToAndCall',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: []
  },
  { stateMutability: 'payable', type: 'receive' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__
 */
export const useReadAccessControlUpgradeable = /*#__PURE__*/ createUseReadContract({
  abi: accessControlUpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadAccessControlUpgradeableDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadAccessControlUpgradeableGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadAccessControlUpgradeableHasRole = /*#__PURE__*/ createUseReadContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAccessControlUpgradeableSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__
 */
export const useWriteAccessControlUpgradeable = /*#__PURE__*/ createUseWriteContract({
  abi: accessControlUpgradeableAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteAccessControlUpgradeableGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteAccessControlUpgradeableRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteAccessControlUpgradeableRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__
 */
export const useSimulateAccessControlUpgradeable = /*#__PURE__*/ createUseSimulateContract({
  abi: accessControlUpgradeableAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateAccessControlUpgradeableGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateAccessControlUpgradeableRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateAccessControlUpgradeableRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: accessControlUpgradeableAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlUpgradeableAbi}__
 */
export const useWatchAccessControlUpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: accessControlUpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchAccessControlUpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: accessControlUpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchAccessControlUpgradeableRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: accessControlUpgradeableAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchAccessControlUpgradeableRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: accessControlUpgradeableAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlUpgradeableAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchAccessControlUpgradeableRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: accessControlUpgradeableAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__
 */
export const useReadAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadAirdropAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadAirdropDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadAirdropUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadAirdropUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadAirdropGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadAirdropHasRole = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"isClaimed"`
 */
export const useReadAirdropIsClaimed = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'isClaimed'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"merkleRoots"`
 */
export const useReadAirdropMerkleRoots = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'merkleRoots'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"paused"`
 */
export const useReadAirdropPaused = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadAirdropProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"router"`
 */
export const useReadAirdropRouter = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'router'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"stakeTogether"`
 */
export const useReadAirdropStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'stakeTogether'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAirdropSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"version"`
 */
export const useReadAirdropVersion = /*#__PURE__*/ createUseReadContract({
  abi: airdropAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__
 */
export const useWriteAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"addMerkleRoot"`
 */
export const useWriteAirdropAddMerkleRoot = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'addMerkleRoot'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteAirdropClaim = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'claim'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteAirdropGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteAirdropInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteAirdropPause = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteAirdropRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteAirdropRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"setRouter"`
 */
export const useWriteAirdropSetRouter = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteAirdropSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteAirdropTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteAirdropUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteAirdropUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: airdropAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__
 */
export const useSimulateAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"addMerkleRoot"`
 */
export const useSimulateAirdropAddMerkleRoot = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'addMerkleRoot'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateAirdropClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'claim'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateAirdropGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateAirdropInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateAirdropPause = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateAirdropRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateAirdropRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"setRouter"`
 */
export const useSimulateAirdropSetRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateAirdropSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateAirdropTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateAirdropUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link airdropAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateAirdropUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: airdropAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__
 */
export const useWatchAirdropEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"AddMerkleRoot"`
 */
export const useWatchAirdropAddMerkleRootEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'AddMerkleRoot'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchAirdropClaimEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'Claim'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"ClaimBatch"`
 */
export const useWatchAirdropClaimBatchEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'ClaimBatch'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchAirdropInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchAirdropPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchAirdropReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchAirdropRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchAirdropRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchAirdropRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchAirdropSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchAirdropSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchAirdropUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link airdropAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchAirdropUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: airdropAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link contextUpgradeableAbi}__
 */
export const useWatchContextUpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: contextUpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link contextUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchContextUpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: contextUpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eip712UpgradeableAbi}__
 */
export const useReadEip712Upgradeable = /*#__PURE__*/ createUseReadContract({
  abi: eip712UpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eip712UpgradeableAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadEip712UpgradeableEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: eip712UpgradeableAbi,
  functionName: 'eip712Domain'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eip712UpgradeableAbi}__
 */
export const useWatchEip712UpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: eip712UpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eip712UpgradeableAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchEip712UpgradeableEip712DomainChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: eip712UpgradeableAbi,
  eventName: 'EIP712DomainChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eip712UpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchEip712UpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: eip712UpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__
 */
export const useReadElAdapter = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"ADAPTER_ORACLE_MANAGER_ROLE"`
 */
export const useReadElAdapterAdapterOracleManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'ADAPTER_ORACLE_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"ADAPTER_ORACLE_ROLE"`
 */
export const useReadElAdapterAdapterOracleRole = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'ADAPTER_ORACLE_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadElAdapterAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadElAdapterDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadElAdapterUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadElAdapterUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"VALIDATOR_ORACLE_SENTINEL_ROLE"`
 */
export const useReadElAdapterValidatorOracleSentinelRole = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'VALIDATOR_ORACLE_SENTINEL_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"bridge"`
 */
export const useReadElAdapterBridge = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'bridge'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"config"`
 */
export const useReadElAdapterConfig = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'config'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"currentOracleIndex"`
 */
export const useReadElAdapterCurrentOracleIndex = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'currentOracleIndex'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"deposit"`
 */
export const useReadElAdapterDeposit = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'deposit'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadElAdapterGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadElAdapterHasRole = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"isAdapterOracle"`
 */
export const useReadElAdapterIsAdapterOracle = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'isAdapterOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"l2Router"`
 */
export const useReadElAdapterL2Router = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'l2Router'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"paused"`
 */
export const useReadElAdapterPaused = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadElAdapterProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadElAdapterSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"validators"`
 */
export const useReadElAdapterValidators = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'validators'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"version"`
 */
export const useReadElAdapterVersion = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"withdrawalCredentials"`
 */
export const useReadElAdapterWithdrawalCredentials = /*#__PURE__*/ createUseReadContract({
  abi: elAdapterAbi,
  functionName: 'withdrawalCredentials'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__
 */
export const useWriteElAdapter = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"addAdapterOracle"`
 */
export const useWriteElAdapterAddAdapterOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'addAdapterOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"addValidator"`
 */
export const useWriteElAdapterAddValidator = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'addValidator'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteElAdapterGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteElAdapterInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"l2Withdraw"`
 */
export const useWriteElAdapterL2Withdraw = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'l2Withdraw'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteElAdapterPause = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"removeAdapterOracle"`
 */
export const useWriteElAdapterRemoveAdapterOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'removeAdapterOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteElAdapterRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteElAdapterRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteElAdapterSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"setL2Router"`
 */
export const useWriteElAdapterSetL2Router = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'setL2Router'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteElAdapterUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteElAdapterUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: elAdapterAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__
 */
export const useSimulateElAdapter = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"addAdapterOracle"`
 */
export const useSimulateElAdapterAddAdapterOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'addAdapterOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"addValidator"`
 */
export const useSimulateElAdapterAddValidator = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'addValidator'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateElAdapterGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateElAdapterInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"l2Withdraw"`
 */
export const useSimulateElAdapterL2Withdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'l2Withdraw'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateElAdapterPause = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"removeAdapterOracle"`
 */
export const useSimulateElAdapterRemoveAdapterOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'removeAdapterOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateElAdapterRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateElAdapterRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateElAdapterSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"setL2Router"`
 */
export const useSimulateElAdapterSetL2Router = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'setL2Router'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateElAdapterUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAdapterAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateElAdapterUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: elAdapterAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__
 */
export const useWatchElAdapterEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: elAdapterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"AddAdapterOracle"`
 */
export const useWatchElAdapterAddAdapterOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'AddAdapterOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"AddValidator"`
 */
export const useWatchElAdapterAddValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'AddValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchElAdapterInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"L2Withdraw"`
 */
export const useWatchElAdapterL2WithdrawEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'L2Withdraw'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"NextAdapterOracle"`
 */
export const useWatchElAdapterNextAdapterOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'NextAdapterOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchElAdapterPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchElAdapterReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"RemoveAdapterOracle"`
 */
export const useWatchElAdapterRemoveAdapterOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'RemoveAdapterOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchElAdapterRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchElAdapterRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchElAdapterRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchElAdapterSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"SetL2Router"`
 */
export const useWatchElAdapterSetL2RouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'SetL2Router'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchElAdapterUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAdapterAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchElAdapterUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAdapterAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__
 */
export const useReadElAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadElAirdropAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadElAirdropDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadElAirdropUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadElAirdropUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadElAirdropGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadElAirdropHasRole = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"isClaimed"`
 */
export const useReadElAirdropIsClaimed = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'isClaimed'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"merkleRoots"`
 */
export const useReadElAirdropMerkleRoots = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'merkleRoots'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"paused"`
 */
export const useReadElAirdropPaused = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadElAirdropProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"router"`
 */
export const useReadElAirdropRouter = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'router'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"stakeTogether"`
 */
export const useReadElAirdropStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'stakeTogether'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadElAirdropSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"version"`
 */
export const useReadElAirdropVersion = /*#__PURE__*/ createUseReadContract({
  abi: elAirdropAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__
 */
export const useWriteElAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"addMerkleRoot"`
 */
export const useWriteElAirdropAddMerkleRoot = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'addMerkleRoot'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteElAirdropClaim = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'claim'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteElAirdropGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteElAirdropInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteElAirdropPause = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteElAirdropRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteElAirdropRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"setRouter"`
 */
export const useWriteElAirdropSetRouter = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteElAirdropSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteElAirdropTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteElAirdropUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteElAirdropUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: elAirdropAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__
 */
export const useSimulateElAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"addMerkleRoot"`
 */
export const useSimulateElAirdropAddMerkleRoot = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'addMerkleRoot'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateElAirdropClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'claim'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateElAirdropGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateElAirdropInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateElAirdropPause = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateElAirdropRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateElAirdropRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"setRouter"`
 */
export const useSimulateElAirdropSetRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateElAirdropSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateElAirdropTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateElAirdropUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elAirdropAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateElAirdropUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: elAirdropAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__
 */
export const useWatchElAirdropEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: elAirdropAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"AddMerkleRoot"`
 */
export const useWatchElAirdropAddMerkleRootEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'AddMerkleRoot'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchElAirdropClaimEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'Claim'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"ClaimBatch"`
 */
export const useWatchElAirdropClaimBatchEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'ClaimBatch'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchElAirdropInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchElAirdropPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchElAirdropReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchElAirdropRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchElAirdropRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchElAirdropRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchElAirdropSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchElAirdropSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchElAirdropUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elAirdropAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchElAirdropUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elAirdropAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__
 */
export const useReadElRouter = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadElRouterAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadElRouterDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"ORACLE_REPORT_MANAGER_ROLE"`
 */
export const useReadElRouterOracleReportManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'ORACLE_REPORT_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"ORACLE_REPORT_ROLE"`
 */
export const useReadElRouterOracleReportRole = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'ORACLE_REPORT_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"ORACLE_SENTINEL_ROLE"`
 */
export const useReadElRouterOracleSentinelRole = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'ORACLE_SENTINEL_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadElRouterUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadElRouterUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"airdrop"`
 */
export const useReadElRouterAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'airdrop'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"bridge"`
 */
export const useReadElRouterBridge = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'bridge'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"bunkermode"`
 */
export const useReadElRouterBunkermode = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'bunkermode'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"config"`
 */
export const useReadElRouterConfig = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'config'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"consensusReport"`
 */
export const useReadElRouterConsensusReport = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'consensusReport'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"executedReports"`
 */
export const useReadElRouterExecutedReports = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'executedReports'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"getReportHash"`
 */
export const useReadElRouterGetReportHash = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'getReportHash'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadElRouterGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadElRouterHasRole = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"isReadyToExecute"`
 */
export const useReadElRouterIsReadyToExecute = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'isReadyToExecute'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"isReadyToSubmit"`
 */
export const useReadElRouterIsReadyToSubmit = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'isReadyToSubmit'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"isReportOracle"`
 */
export const useReadElRouterIsReportOracle = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'isReportOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"isReportOracleBlackListed"`
 */
export const useReadElRouterIsReportOracleBlackListed = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'isReportOracleBlackListed'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"lastConsensusBlock"`
 */
export const useReadElRouterLastConsensusBlock = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'lastConsensusBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"lastExecutedBlock"`
 */
export const useReadElRouterLastExecutedBlock = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'lastExecutedBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"paused"`
 */
export const useReadElRouterPaused = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"pendingExecution"`
 */
export const useReadElRouterPendingExecution = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'pendingExecution'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadElRouterProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"reportBlock"`
 */
export const useReadElRouterReportBlock = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'reportBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"reportDelayBlock"`
 */
export const useReadElRouterReportDelayBlock = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'reportDelayBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"reportOraclesBlacklist"`
 */
export const useReadElRouterReportOraclesBlacklist = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'reportOraclesBlacklist'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"reportVotesForBlock"`
 */
export const useReadElRouterReportVotesForBlock = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'reportVotesForBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"reports"`
 */
export const useReadElRouterReports = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'reports'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"revokedReports"`
 */
export const useReadElRouterRevokedReports = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'revokedReports'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"stakeTogether"`
 */
export const useReadElRouterStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'stakeTogether'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadElRouterSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"totalReportOracles"`
 */
export const useReadElRouterTotalReportOracles = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'totalReportOracles'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"totalVotes"`
 */
export const useReadElRouterTotalVotes = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'totalVotes'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"version"`
 */
export const useReadElRouterVersion = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"withdrawals"`
 */
export const useReadElRouterWithdrawals = /*#__PURE__*/ createUseReadContract({
  abi: elRouterAbi,
  functionName: 'withdrawals'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__
 */
export const useWriteElRouter = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"addReportOracle"`
 */
export const useWriteElRouterAddReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'addReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"addSentinel"`
 */
export const useWriteElRouterAddSentinel = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'addSentinel'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"blacklistReportOracle"`
 */
export const useWriteElRouterBlacklistReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'blacklistReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"executeReport"`
 */
export const useWriteElRouterExecuteReport = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'executeReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"forceNextReportBlock"`
 */
export const useWriteElRouterForceNextReportBlock = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'forceNextReportBlock'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteElRouterGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteElRouterInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteElRouterPause = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useWriteElRouterReceiveWithdrawEther = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"removeReportOracle"`
 */
export const useWriteElRouterRemoveReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'removeReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"removeSentinel"`
 */
export const useWriteElRouterRemoveSentinel = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'removeSentinel'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteElRouterRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"revokeConsensusReport"`
 */
export const useWriteElRouterRevokeConsensusReport = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'revokeConsensusReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteElRouterRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"setBunkerMode"`
 */
export const useWriteElRouterSetBunkerMode = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'setBunkerMode'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteElRouterSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteElRouterSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"submitReport"`
 */
export const useWriteElRouterSubmitReport = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'submitReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"unBlacklistReportOracle"`
 */
export const useWriteElRouterUnBlacklistReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'unBlacklistReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteElRouterUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteElRouterUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: elRouterAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__
 */
export const useSimulateElRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"addReportOracle"`
 */
export const useSimulateElRouterAddReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'addReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"addSentinel"`
 */
export const useSimulateElRouterAddSentinel = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'addSentinel'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"blacklistReportOracle"`
 */
export const useSimulateElRouterBlacklistReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'blacklistReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"executeReport"`
 */
export const useSimulateElRouterExecuteReport = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'executeReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"forceNextReportBlock"`
 */
export const useSimulateElRouterForceNextReportBlock = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'forceNextReportBlock'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateElRouterGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateElRouterInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateElRouterPause = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useSimulateElRouterReceiveWithdrawEther = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"removeReportOracle"`
 */
export const useSimulateElRouterRemoveReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'removeReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"removeSentinel"`
 */
export const useSimulateElRouterRemoveSentinel = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'removeSentinel'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateElRouterRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"revokeConsensusReport"`
 */
export const useSimulateElRouterRevokeConsensusReport = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'revokeConsensusReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateElRouterRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"setBunkerMode"`
 */
export const useSimulateElRouterSetBunkerMode = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'setBunkerMode'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateElRouterSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateElRouterSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"submitReport"`
 */
export const useSimulateElRouterSubmitReport = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'submitReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"unBlacklistReportOracle"`
 */
export const useSimulateElRouterUnBlacklistReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'unBlacklistReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateElRouterUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elRouterAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateElRouterUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: elRouterAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__
 */
export const useWatchElRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"AddReportOracle"`
 */
export const useWatchElRouterAddReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'AddReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"AdvanceNextBlock"`
 */
export const useWatchElRouterAdvanceNextBlockEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'AdvanceNextBlock'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"BlacklistReportOracle"`
 */
export const useWatchElRouterBlacklistReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'BlacklistReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"ConsensusApprove"`
 */
export const useWatchElRouterConsensusApproveEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'ConsensusApprove'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"ConsensusFail"`
 */
export const useWatchElRouterConsensusFailEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'ConsensusFail'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"ExecuteReport"`
 */
export const useWatchElRouterExecuteReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'ExecuteReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchElRouterInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchElRouterPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"ReceiveBridgeEther"`
 */
export const useWatchElRouterReceiveBridgeEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'ReceiveBridgeEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchElRouterReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"ReceiveWithdrawEther"`
 */
export const useWatchElRouterReceiveWithdrawEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'ReceiveWithdrawEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"RemoveReportOracle"`
 */
export const useWatchElRouterRemoveReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'RemoveReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"RevokeConsensusReport"`
 */
export const useWatchElRouterRevokeConsensusReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'RevokeConsensusReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchElRouterRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchElRouterRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchElRouterRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"SetBunkerMode"`
 */
export const useWatchElRouterSetBunkerModeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'SetBunkerMode'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchElRouterSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchElRouterSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"SubmitReport"`
 */
export const useWatchElRouterSubmitReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'SubmitReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"UnBlacklistReportOracle"`
 */
export const useWatchElRouterUnBlacklistReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'UnBlacklistReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchElRouterUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elRouterAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchElRouterUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elRouterAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__
 */
export const useReadElStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadElStakeTogetherAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"ANTI_FRAUD_MANAGER_ROLE"`
 */
export const useReadElStakeTogetherAntiFraudManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'ANTI_FRAUD_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"ANTI_FRAUD_SENTINEL_ROLE"`
 */
export const useReadElStakeTogetherAntiFraudSentinelRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'ANTI_FRAUD_SENTINEL_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadElStakeTogetherDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadElStakeTogetherDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'DOMAIN_SEPARATOR'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"POOL_MANAGER_ROLE"`
 */
export const useReadElStakeTogetherPoolManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'POOL_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadElStakeTogetherUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadElStakeTogetherUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"VALIDATOR_ORACLE_MANAGER_ROLE"`
 */
export const useReadElStakeTogetherValidatorOracleManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'VALIDATOR_ORACLE_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"VALIDATOR_ORACLE_ROLE"`
 */
export const useReadElStakeTogetherValidatorOracleRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'VALIDATOR_ORACLE_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"VALIDATOR_ORACLE_SENTINEL_ROLE"`
 */
export const useReadElStakeTogetherValidatorOracleSentinelRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'VALIDATOR_ORACLE_SENTINEL_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"airdrop"`
 */
export const useReadElStakeTogetherAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'airdrop'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadElStakeTogetherAllowance = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadElStakeTogetherBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"beaconBalance"`
 */
export const useReadElStakeTogetherBeaconBalance = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'beaconBalance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"bridge"`
 */
export const useReadElStakeTogetherBridge = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'bridge'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"config"`
 */
export const useReadElStakeTogetherConfig = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'config'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"currentOracleIndex"`
 */
export const useReadElStakeTogetherCurrentOracleIndex = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'currentOracleIndex'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadElStakeTogetherDecimals = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadElStakeTogetherEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'eip712Domain'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"getFee"`
 */
export const useReadElStakeTogetherGetFee = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'getFee'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"getFeeAddress"`
 */
export const useReadElStakeTogetherGetFeeAddress = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'getFeeAddress'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"getFeesRoles"`
 */
export const useReadElStakeTogetherGetFeesRoles = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'getFeesRoles'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadElStakeTogetherGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"getWithdrawBeaconBlock"`
 */
export const useReadElStakeTogetherGetWithdrawBeaconBlock = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'getWithdrawBeaconBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"getWithdrawBlock"`
 */
export const useReadElStakeTogetherGetWithdrawBlock = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'getWithdrawBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadElStakeTogetherHasRole = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"isListedInAntiFraud"`
 */
export const useReadElStakeTogetherIsListedInAntiFraud = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'isListedInAntiFraud'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"isValidatorOracle"`
 */
export const useReadElStakeTogetherIsValidatorOracle = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'isValidatorOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"l1Adapter"`
 */
export const useReadElStakeTogetherL1Adapter = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'l1Adapter'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"lastResetBlock"`
 */
export const useReadElStakeTogetherLastResetBlock = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'lastResetBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"name"`
 */
export const useReadElStakeTogetherName = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadElStakeTogetherNonces = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'nonces'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"paused"`
 */
export const useReadElStakeTogetherPaused = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"pools"`
 */
export const useReadElStakeTogetherPools = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'pools'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadElStakeTogetherProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"router"`
 */
export const useReadElStakeTogetherRouter = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'router'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"shares"`
 */
export const useReadElStakeTogetherShares = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'shares'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"sharesByWei"`
 */
export const useReadElStakeTogetherSharesByWei = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'sharesByWei'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadElStakeTogetherSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadElStakeTogetherSymbol = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"totalDeposited"`
 */
export const useReadElStakeTogetherTotalDeposited = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'totalDeposited'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"totalShares"`
 */
export const useReadElStakeTogetherTotalShares = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'totalShares'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadElStakeTogetherTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"totalWithdrawnPool"`
 */
export const useReadElStakeTogetherTotalWithdrawnPool = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'totalWithdrawnPool'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"totalWithdrawnValidator"`
 */
export const useReadElStakeTogetherTotalWithdrawnValidator = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'totalWithdrawnValidator'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"validators"`
 */
export const useReadElStakeTogetherValidators = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'validators'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"version"`
 */
export const useReadElStakeTogetherVersion = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"weiByShares"`
 */
export const useReadElStakeTogetherWeiByShares = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'weiByShares'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"withdrawBalance"`
 */
export const useReadElStakeTogetherWithdrawBalance = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'withdrawBalance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"withdrawals"`
 */
export const useReadElStakeTogetherWithdrawals = /*#__PURE__*/ createUseReadContract({
  abi: elstakeTogetherAbi,
  functionName: 'withdrawals'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__
 */
export const useWriteElStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"addPool"`
 */
export const useWriteElStakeTogetherAddPool = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'addPool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"addToAntiFraud"`
 */
export const useWriteElStakeTogetherAddToAntiFraud = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'addToAntiFraud'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"addValidatorOracle"`
 */
export const useWriteElStakeTogetherAddValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'addValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"anticipateWithdrawBeacon"`
 */
export const useWriteElStakeTogetherAnticipateWithdrawBeacon = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'anticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteElStakeTogetherApprove = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteElStakeTogetherBurn = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteElStakeTogetherBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"claimAirdrop"`
 */
export const useWriteElStakeTogetherClaimAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'claimAirdrop'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"depositDonation"`
 */
export const useWriteElStakeTogetherDepositDonation = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'depositDonation'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"depositPool"`
 */
export const useWriteElStakeTogetherDepositPool = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'depositPool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"forceNextValidatorOracle"`
 */
export const useWriteElStakeTogetherForceNextValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'forceNextValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteElStakeTogetherGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteElStakeTogetherInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteElStakeTogetherPause = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteElStakeTogetherPermit = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"processFeeRewards"`
 */
export const useWriteElStakeTogetherProcessFeeRewards = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'processFeeRewards'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"removeFromAntiFraud"`
 */
export const useWriteElStakeTogetherRemoveFromAntiFraud = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'removeFromAntiFraud'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"removePool"`
 */
export const useWriteElStakeTogetherRemovePool = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'removePool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"removeValidatorOracle"`
 */
export const useWriteElStakeTogetherRemoveValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'removeValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteElStakeTogetherRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"requestAddValidator"`
 */
export const useWriteElStakeTogetherRequestAddValidator = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'requestAddValidator'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteElStakeTogetherRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setBeaconBalance"`
 */
export const useWriteElStakeTogetherSetBeaconBalance = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'setBeaconBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteElStakeTogetherSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setFee"`
 */
export const useWriteElStakeTogetherSetFee = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'setFee'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setFeeAddress"`
 */
export const useWriteElStakeTogetherSetFeeAddress = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'setFeeAddress'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setL1Adapter"`
 */
export const useWriteElStakeTogetherSetL1Adapter = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'setL1Adapter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setWithdrawBalance"`
 */
export const useWriteElStakeTogetherSetWithdrawBalance = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'setWithdrawBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteElStakeTogetherTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteElStakeTogetherTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteElStakeTogetherUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"updateDelegations"`
 */
export const useWriteElStakeTogetherUpdateDelegations = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'updateDelegations'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteElStakeTogetherUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"withdrawBeacon"`
 */
export const useWriteElStakeTogetherWithdrawBeacon = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'withdrawBeacon'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"withdrawPool"`
 */
export const useWriteElStakeTogetherWithdrawPool = /*#__PURE__*/ createUseWriteContract({
  abi: elstakeTogetherAbi,
  functionName: 'withdrawPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__
 */
export const useSimulateElStakeTogether = /*#__PURE__*/ createUseSimulateContract({ abi: elstakeTogetherAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"addPool"`
 */
export const useSimulateElStakeTogetherAddPool = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'addPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"addToAntiFraud"`
 */
export const useSimulateElStakeTogetherAddToAntiFraud = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'addToAntiFraud'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"addValidatorOracle"`
 */
export const useSimulateElStakeTogetherAddValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'addValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"anticipateWithdrawBeacon"`
 */
export const useSimulateElStakeTogetherAnticipateWithdrawBeacon = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'anticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateElStakeTogetherApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateElStakeTogetherBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateElStakeTogetherBurnFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"claimAirdrop"`
 */
export const useSimulateElStakeTogetherClaimAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'claimAirdrop'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"depositDonation"`
 */
export const useSimulateElStakeTogetherDepositDonation = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'depositDonation'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"depositPool"`
 */
export const useSimulateElStakeTogetherDepositPool = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'depositPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"forceNextValidatorOracle"`
 */
export const useSimulateElStakeTogetherForceNextValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'forceNextValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateElStakeTogetherGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateElStakeTogetherInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateElStakeTogetherPause = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateElStakeTogetherPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"processFeeRewards"`
 */
export const useSimulateElStakeTogetherProcessFeeRewards = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'processFeeRewards'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"removeFromAntiFraud"`
 */
export const useSimulateElStakeTogetherRemoveFromAntiFraud = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'removeFromAntiFraud'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"removePool"`
 */
export const useSimulateElStakeTogetherRemovePool = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'removePool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"removeValidatorOracle"`
 */
export const useSimulateElStakeTogetherRemoveValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'removeValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateElStakeTogetherRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"requestAddValidator"`
 */
export const useSimulateElStakeTogetherRequestAddValidator = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'requestAddValidator'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateElStakeTogetherRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setBeaconBalance"`
 */
export const useSimulateElStakeTogetherSetBeaconBalance = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'setBeaconBalance'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateElStakeTogetherSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setFee"`
 */
export const useSimulateElStakeTogetherSetFee = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'setFee'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setFeeAddress"`
 */
export const useSimulateElStakeTogetherSetFeeAddress = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'setFeeAddress'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setL1Adapter"`
 */
export const useSimulateElStakeTogetherSetL1Adapter = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'setL1Adapter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"setWithdrawBalance"`
 */
export const useSimulateElStakeTogetherSetWithdrawBalance = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'setWithdrawBalance'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateElStakeTogetherTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateElStakeTogetherTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateElStakeTogetherUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"updateDelegations"`
 */
export const useSimulateElStakeTogetherUpdateDelegations = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'updateDelegations'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateElStakeTogetherUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"withdrawBeacon"`
 */
export const useSimulateElStakeTogetherWithdrawBeacon = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'withdrawBeacon'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `functionName` set to `"withdrawPool"`
 */
export const useSimulateElStakeTogetherWithdrawPool = /*#__PURE__*/ createUseSimulateContract({
  abi: elstakeTogetherAbi,
  functionName: 'withdrawPool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__
 */
export const useWatchElStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"AddPool"`
 */
export const useWatchElStakeTogetherAddPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'AddPool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"AddValidatorOracle"`
 */
export const useWatchElStakeTogetherAddValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'AddValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"AnticipateWithdrawBeacon"`
 */
export const useWatchElStakeTogetherAnticipateWithdrawBeaconEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'AnticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchElStakeTogetherApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"BurnShares"`
 */
export const useWatchElStakeTogetherBurnSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'BurnShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"DepositBase"`
 */
export const useWatchElStakeTogetherDepositBaseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'DepositBase'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"DepositLimitWasReached"`
 */
export const useWatchElStakeTogetherDepositLimitWasReachedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'DepositLimitWasReached'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchElStakeTogetherEip712DomainChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'EIP712DomainChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchElStakeTogetherInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"MintFeeShares"`
 */
export const useWatchElStakeTogetherMintFeeSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'MintFeeShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"MintShares"`
 */
export const useWatchElStakeTogetherMintSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'MintShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"NextValidatorOracle"`
 */
export const useWatchElStakeTogetherNextValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'NextValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchElStakeTogetherPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"ProcessStakeRewards"`
 */
export const useWatchElStakeTogetherProcessStakeRewardsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'ProcessStakeRewards'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"ProcessStakeValidator"`
 */
export const useWatchElStakeTogetherProcessStakeValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'ProcessStakeValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchElStakeTogetherReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"RemovePool"`
 */
export const useWatchElStakeTogetherRemovePoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'RemovePool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"RemoveValidatorOracle"`
 */
export const useWatchElStakeTogetherRemoveValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'RemoveValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"RequestAddValidator"`
 */
export const useWatchElStakeTogetherRequestAddValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'RequestAddValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchElStakeTogetherRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchElStakeTogetherRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchElStakeTogetherRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetAdapter"`
 */
export const useWatchElStakeTogetherSetAdapterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetAdapter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetAntiFraudStatus"`
 */
export const useWatchElStakeTogetherSetAntiFraudStatusEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetAntiFraudStatus'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetBeaconBalance"`
 */
export const useWatchElStakeTogetherSetBeaconBalanceEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetBeaconBalance'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchElStakeTogetherSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetFee"`
 */
export const useWatchElStakeTogetherSetFeeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetFee'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetFeeAddress"`
 */
export const useWatchElStakeTogetherSetFeeAddressEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetFeeAddress'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchElStakeTogetherSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchElStakeTogetherSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetValidatorSize"`
 */
export const useWatchElStakeTogetherSetValidatorSizeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetValidatorSize'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetWithdrawBalance"`
 */
export const useWatchElStakeTogetherSetWithdrawBalanceEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetWithdrawBalance'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"SetWithdrawalsCredentials"`
 */
export const useWatchElStakeTogetherSetWithdrawalsCredentialsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'SetWithdrawalsCredentials'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchElStakeTogetherTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"TransferShares"`
 */
export const useWatchElStakeTogetherTransferSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'TransferShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchElStakeTogetherUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"UpdateDelegations"`
 */
export const useWatchElStakeTogetherUpdateDelegationsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'UpdateDelegations'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchElStakeTogetherUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"WithdrawBase"`
 */
export const useWatchElStakeTogetherWithdrawBaseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elstakeTogetherAbi,
  eventName: 'WithdrawBase'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elstakeTogetherAbi}__ and `eventName` set to `"WithdrawalsLimitWasReached"`
 */
export const useWatchElStakeTogetherWithdrawalsLimitWasReachedEvent = /*#__PURE__*/ createUseWatchContractEvent(
  {
    abi: elstakeTogetherAbi,
    eventName: 'WithdrawalsLimitWasReached'
  }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__
 */
export const useReadElWithdrawals = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadElWithdrawalsAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadElWithdrawalsDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadElWithdrawalsDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'DOMAIN_SEPARATOR'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadElWithdrawalsUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadElWithdrawalsUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadElWithdrawalsAllowance = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadElWithdrawalsBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadElWithdrawalsDecimals = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadElWithdrawalsEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'eip712Domain'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadElWithdrawalsGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadElWithdrawalsHasRole = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"isWithdrawReady"`
 */
export const useReadElWithdrawalsIsWithdrawReady = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'isWithdrawReady'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"name"`
 */
export const useReadElWithdrawalsName = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadElWithdrawalsNonces = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'nonces'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"paused"`
 */
export const useReadElWithdrawalsPaused = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadElWithdrawalsProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"router"`
 */
export const useReadElWithdrawalsRouter = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'router'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"stakeTogether"`
 */
export const useReadElWithdrawalsStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'stakeTogether'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadElWithdrawalsSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadElWithdrawalsSymbol = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadElWithdrawalsTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"version"`
 */
export const useReadElWithdrawalsVersion = /*#__PURE__*/ createUseReadContract({
  abi: elWithdrawalsAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__
 */
export const useWriteElWithdrawals = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteElWithdrawalsApprove = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteElWithdrawalsBurn = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteElWithdrawalsBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteElWithdrawalsGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteElWithdrawalsInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteElWithdrawalsMint = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteElWithdrawalsPause = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteElWithdrawalsPermit = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useWriteElWithdrawalsReceiveWithdrawEther = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteElWithdrawalsRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteElWithdrawalsRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"setRouter"`
 */
export const useWriteElWithdrawalsSetRouter = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteElWithdrawalsSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteElWithdrawalsTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteElWithdrawalsTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteElWithdrawalsTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteElWithdrawalsUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteElWithdrawalsUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteElWithdrawalsWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: elWithdrawalsAbi,
  functionName: 'withdraw'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__
 */
export const useSimulateElWithdrawals = /*#__PURE__*/ createUseSimulateContract({ abi: elWithdrawalsAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateElWithdrawalsApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateElWithdrawalsBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateElWithdrawalsBurnFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateElWithdrawalsGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateElWithdrawalsInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateElWithdrawalsMint = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateElWithdrawalsPause = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateElWithdrawalsPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useSimulateElWithdrawalsReceiveWithdrawEther = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateElWithdrawalsRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateElWithdrawalsRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"setRouter"`
 */
export const useSimulateElWithdrawalsSetRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateElWithdrawalsSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateElWithdrawalsTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateElWithdrawalsTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateElWithdrawalsTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateElWithdrawalsUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateElWithdrawalsUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateElWithdrawalsWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: elWithdrawalsAbi,
  functionName: 'withdraw'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__
 */
export const useWatchElWithdrawalsEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: elWithdrawalsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchElWithdrawalsApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchElWithdrawalsEip712DomainChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'EIP712DomainChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchElWithdrawalsInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchElWithdrawalsPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchElWithdrawalsReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"ReceiveWithdrawEther"`
 */
export const useWatchElWithdrawalsReceiveWithdrawEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'ReceiveWithdrawEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchElWithdrawalsRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchElWithdrawalsRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchElWithdrawalsRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchElWithdrawalsSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchElWithdrawalsSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchElWithdrawalsTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchElWithdrawalsUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchElWithdrawalsUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link elWithdrawalsAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchElWithdrawalsWithdrawEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: elWithdrawalsAbi,
  eventName: 'Withdraw'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc165UpgradeableAbi}__
 */
export const useReadErc165Upgradeable = /*#__PURE__*/ createUseReadContract({
  abi: erc165UpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc165UpgradeableAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc165UpgradeableSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: erc165UpgradeableAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc165UpgradeableAbi}__
 */
export const useWatchErc165UpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc165UpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc165UpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchErc165UpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc165UpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1967UtilsAbi}__
 */
export const useWatchErc1967UtilsEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc1967UtilsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1967UtilsAbi}__ and `eventName` set to `"AdminChanged"`
 */
export const useWatchErc1967UtilsAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc1967UtilsAbi,
  eventName: 'AdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1967UtilsAbi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const useWatchErc1967UtilsBeaconUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc1967UtilsAbi,
  eventName: 'BeaconUpgraded'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1967UtilsAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchErc1967UtilsUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc1967UtilsAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__
 */
export const useReadErc20BurnableUpgradeable = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableUpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20BurnableUpgradeableAllowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BurnableUpgradeableBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20BurnableUpgradeableDecimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"name"`
 */
export const useReadErc20BurnableUpgradeableName = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20BurnableUpgradeableSymbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20BurnableUpgradeableTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__
 */
export const useWriteErc20BurnableUpgradeable = /*#__PURE__*/ createUseWriteContract({
  abi: erc20BurnableUpgradeableAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20BurnableUpgradeableApprove = /*#__PURE__*/ createUseWriteContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteErc20BurnableUpgradeableBurn = /*#__PURE__*/ createUseWriteContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteErc20BurnableUpgradeableBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20BurnableUpgradeableTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20BurnableUpgradeableTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__
 */
export const useSimulateErc20BurnableUpgradeable = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20BurnableUpgradeableAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20BurnableUpgradeableApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateErc20BurnableUpgradeableBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateErc20BurnableUpgradeableBurnFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20BurnableUpgradeableTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20BurnableUpgradeableTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20BurnableUpgradeableAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__
 */
export const useWatchErc20BurnableUpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20BurnableUpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20BurnableUpgradeableApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20BurnableUpgradeableAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchErc20BurnableUpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20BurnableUpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20BurnableUpgradeableAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20BurnableUpgradeableTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20BurnableUpgradeableAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__
 */
export const useReadErc20PermitUpgradeable = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadErc20PermitUpgradeableDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'DOMAIN_SEPARATOR'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20PermitUpgradeableAllowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20PermitUpgradeableBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20PermitUpgradeableDecimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadErc20PermitUpgradeableEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'eip712Domain'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"name"`
 */
export const useReadErc20PermitUpgradeableName = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadErc20PermitUpgradeableNonces = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'nonces'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20PermitUpgradeableSymbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20PermitUpgradeableTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__
 */
export const useWriteErc20PermitUpgradeable = /*#__PURE__*/ createUseWriteContract({
  abi: erc20PermitUpgradeableAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20PermitUpgradeableApprove = /*#__PURE__*/ createUseWriteContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteErc20PermitUpgradeablePermit = /*#__PURE__*/ createUseWriteContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20PermitUpgradeableTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20PermitUpgradeableTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__
 */
export const useSimulateErc20PermitUpgradeable = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20PermitUpgradeableAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20PermitUpgradeableApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateErc20PermitUpgradeablePermit = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20PermitUpgradeableTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20PermitUpgradeableTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20PermitUpgradeableAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__
 */
export const useWatchErc20PermitUpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20PermitUpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20PermitUpgradeableApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20PermitUpgradeableAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchErc20PermitUpgradeableEip712DomainChangedEvent = /*#__PURE__*/ createUseWatchContractEvent(
  {
    abi: erc20PermitUpgradeableAbi,
    eventName: 'EIP712DomainChanged'
  }
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchErc20PermitUpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20PermitUpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20PermitUpgradeableAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20PermitUpgradeableTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20PermitUpgradeableAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__
 */
export const useReadErc20Upgradeable = /*#__PURE__*/ createUseReadContract({
  abi: erc20UpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20UpgradeableAllowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20UpgradeableAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20UpgradeableBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20UpgradeableAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20UpgradeableDecimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20UpgradeableAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"name"`
 */
export const useReadErc20UpgradeableName = /*#__PURE__*/ createUseReadContract({
  abi: erc20UpgradeableAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20UpgradeableSymbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20UpgradeableAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20UpgradeableTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20UpgradeableAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__
 */
export const useWriteErc20Upgradeable = /*#__PURE__*/ createUseWriteContract({
  abi: erc20UpgradeableAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20UpgradeableApprove = /*#__PURE__*/ createUseWriteContract({
  abi: erc20UpgradeableAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20UpgradeableTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20UpgradeableAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20UpgradeableTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20UpgradeableAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__
 */
export const useSimulateErc20Upgradeable = /*#__PURE__*/ createUseSimulateContract({ abi: erc20UpgradeableAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20UpgradeableApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20UpgradeableAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20UpgradeableTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20UpgradeableAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20UpgradeableTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20UpgradeableAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20UpgradeableAbi}__
 */
export const useWatchErc20UpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20UpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20UpgradeableApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20UpgradeableAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchErc20UpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20UpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20UpgradeableAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20UpgradeableTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20UpgradeableAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const useReadIAccessControl = /*#__PURE__*/ createUseReadContract({
  abi: iAccessControlAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadIAccessControlGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: iAccessControlAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadIAccessControlHasRole = /*#__PURE__*/ createUseReadContract({
  abi: iAccessControlAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const useWriteIAccessControl = /*#__PURE__*/ createUseWriteContract({
  abi: iAccessControlAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteIAccessControlGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: iAccessControlAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteIAccessControlRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: iAccessControlAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteIAccessControlRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: iAccessControlAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const useSimulateIAccessControl = /*#__PURE__*/ createUseSimulateContract({ abi: iAccessControlAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateIAccessControlGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: iAccessControlAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateIAccessControlRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: iAccessControlAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateIAccessControlRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: iAccessControlAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const useWatchIAccessControlEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: iAccessControlAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchIAccessControlRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAccessControlAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchIAccessControlRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAccessControlAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchIAccessControlRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAccessControlAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAirdropAbi}__
 */
export const useReadIAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: iAirdropAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"isClaimed"`
 */
export const useReadIAirdropIsClaimed = /*#__PURE__*/ createUseReadContract({
  abi: iAirdropAbi,
  functionName: 'isClaimed'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__
 */
export const useWriteIAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"addMerkleRoot"`
 */
export const useWriteIAirdropAddMerkleRoot = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi,
  functionName: 'addMerkleRoot'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteIAirdropClaim = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi,
  functionName: 'claim'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIAirdropInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteIAirdropPause = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"setRouter"`
 */
export const useWriteIAirdropSetRouter = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteIAirdropSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteIAirdropTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteIAirdropUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: iAirdropAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__
 */
export const useSimulateIAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"addMerkleRoot"`
 */
export const useSimulateIAirdropAddMerkleRoot = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi,
  functionName: 'addMerkleRoot'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateIAirdropClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi,
  functionName: 'claim'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIAirdropInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateIAirdropPause = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"setRouter"`
 */
export const useSimulateIAirdropSetRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateIAirdropSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateIAirdropTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAirdropAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateIAirdropUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: iAirdropAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAirdropAbi}__
 */
export const useWatchIAirdropEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAirdropAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAirdropAbi}__ and `eventName` set to `"AddMerkleRoot"`
 */
export const useWatchIAirdropAddMerkleRootEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAirdropAbi,
  eventName: 'AddMerkleRoot'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAirdropAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchIAirdropClaimEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAirdropAbi,
  eventName: 'Claim'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAirdropAbi}__ and `eventName` set to `"ClaimBatch"`
 */
export const useWatchIAirdropClaimBatchEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAirdropAbi,
  eventName: 'ClaimBatch'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAirdropAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIAirdropReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAirdropAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAirdropAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchIAirdropSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAirdropAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAirdropAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIAirdropSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iAirdropAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBeaconAbi}__
 */
export const useReadIBeacon = /*#__PURE__*/ createUseReadContract({
  abi: iBeaconAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBeaconAbi}__ and `functionName` set to `"implementation"`
 */
export const useReadIBeaconImplementation = /*#__PURE__*/ createUseReadContract({
  abi: iBeaconAbi,
  functionName: 'implementation'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iDepositContractAbi}__
 */
export const useReadIDepositContract = /*#__PURE__*/ createUseReadContract({
  abi: iDepositContractAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iDepositContractAbi}__ and `functionName` set to `"get_deposit_count"`
 */
export const useReadIDepositContractGetDepositCount = /*#__PURE__*/ createUseReadContract({
  abi: iDepositContractAbi,
  functionName: 'get_deposit_count'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iDepositContractAbi}__ and `functionName` set to `"get_deposit_root"`
 */
export const useReadIDepositContractGetDepositRoot = /*#__PURE__*/ createUseReadContract({
  abi: iDepositContractAbi,
  functionName: 'get_deposit_root'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iDepositContractAbi}__
 */
export const useWriteIDepositContract = /*#__PURE__*/ createUseWriteContract({
  abi: iDepositContractAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iDepositContractAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteIDepositContractDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: iDepositContractAbi,
  functionName: 'deposit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iDepositContractAbi}__
 */
export const useSimulateIDepositContract = /*#__PURE__*/ createUseSimulateContract({ abi: iDepositContractAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iDepositContractAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateIDepositContractDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: iDepositContractAbi,
  functionName: 'deposit'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iDepositContractAbi}__
 */
export const useWatchIDepositContractEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iDepositContractAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iDepositContractAbi}__ and `eventName` set to `"DepositEvent"`
 */
export const useWatchIDepositContractDepositEventEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iDepositContractAbi,
  eventName: 'DepositEvent'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAdapterAbi}__
 */
export const useWriteIelAdapter = /*#__PURE__*/ createUseWriteContract({
  abi: ielAdapterAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAdapterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteIelAdapterSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: ielAdapterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAdapterAbi}__
 */
export const useSimulateIelAdapter = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAdapterAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAdapterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateIelAdapterSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAdapterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__
 */
export const useWatchIelAdapterEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: ielAdapterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__ and `eventName` set to `"AddAdapterOracle"`
 */
export const useWatchIelAdapterAddAdapterOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAdapterAbi,
  eventName: 'AddAdapterOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__ and `eventName` set to `"AddValidator"`
 */
export const useWatchIelAdapterAddValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAdapterAbi,
  eventName: 'AddValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__ and `eventName` set to `"L2Withdraw"`
 */
export const useWatchIelAdapterL2WithdrawEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAdapterAbi,
  eventName: 'L2Withdraw'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__ and `eventName` set to `"NextAdapterOracle"`
 */
export const useWatchIelAdapterNextAdapterOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAdapterAbi,
  eventName: 'NextAdapterOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIelAdapterReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAdapterAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__ and `eventName` set to `"RemoveAdapterOracle"`
 */
export const useWatchIelAdapterRemoveAdapterOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAdapterAbi,
  eventName: 'RemoveAdapterOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchIelAdapterSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAdapterAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAdapterAbi}__ and `eventName` set to `"SetL2Router"`
 */
export const useWatchIelAdapterSetL2RouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAdapterAbi,
  eventName: 'SetL2Router'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielAirdropAbi}__
 */
export const useReadIelAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: ielAirdropAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"isClaimed"`
 */
export const useReadIelAirdropIsClaimed = /*#__PURE__*/ createUseReadContract({
  abi: ielAirdropAbi,
  functionName: 'isClaimed'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__
 */
export const useWriteIelAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"addMerkleRoot"`
 */
export const useWriteIelAirdropAddMerkleRoot = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi,
  functionName: 'addMerkleRoot'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteIelAirdropClaim = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi,
  functionName: 'claim'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIelAirdropInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteIelAirdropPause = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"setRouter"`
 */
export const useWriteIelAirdropSetRouter = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteIelAirdropSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteIelAirdropTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteIelAirdropUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: ielAirdropAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__
 */
export const useSimulateIelAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"addMerkleRoot"`
 */
export const useSimulateIelAirdropAddMerkleRoot = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi,
  functionName: 'addMerkleRoot'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateIelAirdropClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi,
  functionName: 'claim'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIelAirdropInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateIelAirdropPause = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"setRouter"`
 */
export const useSimulateIelAirdropSetRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateIelAirdropSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateIelAirdropTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielAirdropAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateIelAirdropUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: ielAirdropAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAirdropAbi}__
 */
export const useWatchIelAirdropEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: ielAirdropAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAirdropAbi}__ and `eventName` set to `"AddMerkleRoot"`
 */
export const useWatchIelAirdropAddMerkleRootEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAirdropAbi,
  eventName: 'AddMerkleRoot'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAirdropAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchIelAirdropClaimEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAirdropAbi,
  eventName: 'Claim'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAirdropAbi}__ and `eventName` set to `"ClaimBatch"`
 */
export const useWatchIelAirdropClaimBatchEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAirdropAbi,
  eventName: 'ClaimBatch'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAirdropAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIelAirdropReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAirdropAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAirdropAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchIelAirdropSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAirdropAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielAirdropAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIelAirdropSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielAirdropAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielBridgeAbi}__
 */
export const useWriteIelBridge = /*#__PURE__*/ createUseWriteContract({
  abi: ielBridgeAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielBridgeAbi}__ and `functionName` set to `"bridgeETHTo"`
 */
export const useWriteIelBridgeBridgeEthTo = /*#__PURE__*/ createUseWriteContract({
  abi: ielBridgeAbi,
  functionName: 'bridgeETHTo'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielBridgeAbi}__
 */
export const useSimulateIelBridge = /*#__PURE__*/ createUseSimulateContract({
  abi: ielBridgeAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielBridgeAbi}__ and `functionName` set to `"bridgeETHTo"`
 */
export const useSimulateIelBridgeBridgeEthTo = /*#__PURE__*/ createUseSimulateContract({
  abi: ielBridgeAbi,
  functionName: 'bridgeETHTo'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielDepositContractAbi}__
 */
export const useReadIelDepositContract = /*#__PURE__*/ createUseReadContract({
  abi: ielDepositContractAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielDepositContractAbi}__ and `functionName` set to `"get_deposit_count"`
 */
export const useReadIelDepositContractGetDepositCount = /*#__PURE__*/ createUseReadContract({
  abi: ielDepositContractAbi,
  functionName: 'get_deposit_count'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielDepositContractAbi}__ and `functionName` set to `"get_deposit_root"`
 */
export const useReadIelDepositContractGetDepositRoot = /*#__PURE__*/ createUseReadContract({
  abi: ielDepositContractAbi,
  functionName: 'get_deposit_root'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielDepositContractAbi}__
 */
export const useWriteIelDepositContract = /*#__PURE__*/ createUseWriteContract({
  abi: ielDepositContractAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielDepositContractAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteIelDepositContractDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: ielDepositContractAbi,
  functionName: 'deposit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielDepositContractAbi}__
 */
export const useSimulateIelDepositContract = /*#__PURE__*/ createUseSimulateContract({
  abi: ielDepositContractAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielDepositContractAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateIelDepositContractDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: ielDepositContractAbi,
  functionName: 'deposit'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielDepositContractAbi}__
 */
export const useWatchIelDepositContractEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielDepositContractAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielDepositContractAbi}__ and `eventName` set to `"DepositEvent"`
 */
export const useWatchIelDepositContractDepositEventEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielDepositContractAbi,
  eventName: 'DepositEvent'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielRouterAbi}__
 */
export const useReadIelRouter = /*#__PURE__*/ createUseReadContract({
  abi: ielRouterAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"getReportHash"`
 */
export const useReadIelRouterGetReportHash = /*#__PURE__*/ createUseReadContract({
  abi: ielRouterAbi,
  functionName: 'getReportHash'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"isReadyToExecute"`
 */
export const useReadIelRouterIsReadyToExecute = /*#__PURE__*/ createUseReadContract({
  abi: ielRouterAbi,
  functionName: 'isReadyToExecute'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"isReadyToSubmit"`
 */
export const useReadIelRouterIsReadyToSubmit = /*#__PURE__*/ createUseReadContract({
  abi: ielRouterAbi,
  functionName: 'isReadyToSubmit'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"isReportOracleBlackListed"`
 */
export const useReadIelRouterIsReportOracleBlackListed = /*#__PURE__*/ createUseReadContract({
  abi: ielRouterAbi,
  functionName: 'isReportOracleBlackListed'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"reportBlock"`
 */
export const useReadIelRouterReportBlock = /*#__PURE__*/ createUseReadContract({
  abi: ielRouterAbi,
  functionName: 'reportBlock'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__
 */
export const useWriteIelRouter = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"addReportOracle"`
 */
export const useWriteIelRouterAddReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'addReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"addSentinel"`
 */
export const useWriteIelRouterAddSentinel = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'addSentinel'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"blacklistReportOracle"`
 */
export const useWriteIelRouterBlacklistReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'blacklistReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"executeReport"`
 */
export const useWriteIelRouterExecuteReport = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'executeReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"forceNextReportBlock"`
 */
export const useWriteIelRouterForceNextReportBlock = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'forceNextReportBlock'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIelRouterInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"isReportOracle"`
 */
export const useWriteIelRouterIsReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'isReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteIelRouterPause = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useWriteIelRouterReceiveWithdrawEther = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"removeReportOracle"`
 */
export const useWriteIelRouterRemoveReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'removeReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"removeSentinel"`
 */
export const useWriteIelRouterRemoveSentinel = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'removeSentinel'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"revokeConsensusReport"`
 */
export const useWriteIelRouterRevokeConsensusReport = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'revokeConsensusReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteIelRouterSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteIelRouterSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"submitReport"`
 */
export const useWriteIelRouterSubmitReport = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'submitReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"unBlacklistReportOracle"`
 */
export const useWriteIelRouterUnBlacklistReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'unBlacklistReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteIelRouterUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: ielRouterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__
 */
export const useSimulateIelRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"addReportOracle"`
 */
export const useSimulateIelRouterAddReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'addReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"addSentinel"`
 */
export const useSimulateIelRouterAddSentinel = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'addSentinel'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"blacklistReportOracle"`
 */
export const useSimulateIelRouterBlacklistReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'blacklistReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"executeReport"`
 */
export const useSimulateIelRouterExecuteReport = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'executeReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"forceNextReportBlock"`
 */
export const useSimulateIelRouterForceNextReportBlock = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'forceNextReportBlock'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIelRouterInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"isReportOracle"`
 */
export const useSimulateIelRouterIsReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'isReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateIelRouterPause = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useSimulateIelRouterReceiveWithdrawEther = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"removeReportOracle"`
 */
export const useSimulateIelRouterRemoveReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'removeReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"removeSentinel"`
 */
export const useSimulateIelRouterRemoveSentinel = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'removeSentinel'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"revokeConsensusReport"`
 */
export const useSimulateIelRouterRevokeConsensusReport = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'revokeConsensusReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateIelRouterSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateIelRouterSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"submitReport"`
 */
export const useSimulateIelRouterSubmitReport = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'submitReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"unBlacklistReportOracle"`
 */
export const useSimulateIelRouterUnBlacklistReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'unBlacklistReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielRouterAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateIelRouterUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: ielRouterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__
 */
export const useWatchIelRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: ielRouterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"AddReportOracle"`
 */
export const useWatchIelRouterAddReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'AddReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"AdvanceNextBlock"`
 */
export const useWatchIelRouterAdvanceNextBlockEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'AdvanceNextBlock'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"BlacklistReportOracle"`
 */
export const useWatchIelRouterBlacklistReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'BlacklistReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"ConsensusApprove"`
 */
export const useWatchIelRouterConsensusApproveEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'ConsensusApprove'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"ConsensusFail"`
 */
export const useWatchIelRouterConsensusFailEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'ConsensusFail'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"ExecuteReport"`
 */
export const useWatchIelRouterExecuteReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'ExecuteReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"ReceiveBridgeEther"`
 */
export const useWatchIelRouterReceiveBridgeEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'ReceiveBridgeEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIelRouterReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"ReceiveWithdrawEther"`
 */
export const useWatchIelRouterReceiveWithdrawEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'ReceiveWithdrawEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"RemoveReportOracle"`
 */
export const useWatchIelRouterRemoveReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'RemoveReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"RevokeConsensusReport"`
 */
export const useWatchIelRouterRevokeConsensusReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'RevokeConsensusReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"SetBunkerMode"`
 */
export const useWatchIelRouterSetBunkerModeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'SetBunkerMode'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchIelRouterSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIelRouterSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"SubmitReport"`
 */
export const useWatchIelRouterSubmitReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'SubmitReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielRouterAbi}__ and `eventName` set to `"UnBlacklistReportOracle"`
 */
export const useWatchIelRouterUnBlacklistReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielRouterAbi,
  eventName: 'UnBlacklistReportOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__
 */
export const useReadIelStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIelStakeTogetherAllowance = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIelStakeTogetherBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"beaconBalance"`
 */
export const useReadIelStakeTogetherBeaconBalance = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'beaconBalance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"getFeeAddress"`
 */
export const useReadIelStakeTogetherGetFeeAddress = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'getFeeAddress'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"getFeesRoles"`
 */
export const useReadIelStakeTogetherGetFeesRoles = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'getFeesRoles'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"getWithdrawBeaconBlock"`
 */
export const useReadIelStakeTogetherGetWithdrawBeaconBlock = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'getWithdrawBeaconBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"getWithdrawBlock"`
 */
export const useReadIelStakeTogetherGetWithdrawBlock = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'getWithdrawBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"isListedInAntiFraud"`
 */
export const useReadIelStakeTogetherIsListedInAntiFraud = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'isListedInAntiFraud'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"isValidatorOracle"`
 */
export const useReadIelStakeTogetherIsValidatorOracle = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'isValidatorOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"sharesByWei"`
 */
export const useReadIelStakeTogetherSharesByWei = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'sharesByWei'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIelStakeTogetherTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"weiByShares"`
 */
export const useReadIelStakeTogetherWeiByShares = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'weiByShares'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"withdrawBalance"`
 */
export const useReadIelStakeTogetherWithdrawBalance = /*#__PURE__*/ createUseReadContract({
  abi: ielstakeTogetherAbi,
  functionName: 'withdrawBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__
 */
export const useWriteIelStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"addPool"`
 */
export const useWriteIelStakeTogetherAddPool = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'addPool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"addToAntiFraud"`
 */
export const useWriteIelStakeTogetherAddToAntiFraud = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'addToAntiFraud'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"addValidatorOracle"`
 */
export const useWriteIelStakeTogetherAddValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'addValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"anticipateWithdrawBeacon"`
 */
export const useWriteIelStakeTogetherAnticipateWithdrawBeacon = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'anticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIelStakeTogetherApprove = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"claimAirdrop"`
 */
export const useWriteIelStakeTogetherClaimAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'claimAirdrop'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"depositDonation"`
 */
export const useWriteIelStakeTogetherDepositDonation = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'depositDonation'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"depositPool"`
 */
export const useWriteIelStakeTogetherDepositPool = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'depositPool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"forceNextValidatorOracle"`
 */
export const useWriteIelStakeTogetherForceNextValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'forceNextValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteIelStakeTogetherPause = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"processFeeRewards"`
 */
export const useWriteIelStakeTogetherProcessFeeRewards = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'processFeeRewards'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"removeFromAntiFraud"`
 */
export const useWriteIelStakeTogetherRemoveFromAntiFraud = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'removeFromAntiFraud'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"removePool"`
 */
export const useWriteIelStakeTogetherRemovePool = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'removePool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"removeValidatorOracle"`
 */
export const useWriteIelStakeTogetherRemoveValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'removeValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"requestAddValidator"`
 */
export const useWriteIelStakeTogetherRequestAddValidator = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'requestAddValidator'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setBeaconBalance"`
 */
export const useWriteIelStakeTogetherSetBeaconBalance = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setBeaconBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteIelStakeTogetherSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setFee"`
 */
export const useWriteIelStakeTogetherSetFee = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setFee'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setFeeAddress"`
 */
export const useWriteIelStakeTogetherSetFeeAddress = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setFeeAddress'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setL1Adapter"`
 */
export const useWriteIelStakeTogetherSetL1Adapter = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setL1Adapter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setWithdrawBalance"`
 */
export const useWriteIelStakeTogetherSetWithdrawBalance = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setWithdrawBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIelStakeTogetherTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIelStakeTogetherTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteIelStakeTogetherUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"updateDelegations"`
 */
export const useWriteIelStakeTogetherUpdateDelegations = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'updateDelegations'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"withdrawBeacon"`
 */
export const useWriteIelStakeTogetherWithdrawBeacon = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'withdrawBeacon'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"withdrawPool"`
 */
export const useWriteIelStakeTogetherWithdrawPool = /*#__PURE__*/ createUseWriteContract({
  abi: ielstakeTogetherAbi,
  functionName: 'withdrawPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__
 */
export const useSimulateIelStakeTogether = /*#__PURE__*/ createUseSimulateContract({ abi: ielstakeTogetherAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"addPool"`
 */
export const useSimulateIelStakeTogetherAddPool = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'addPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"addToAntiFraud"`
 */
export const useSimulateIelStakeTogetherAddToAntiFraud = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'addToAntiFraud'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"addValidatorOracle"`
 */
export const useSimulateIelStakeTogetherAddValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'addValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"anticipateWithdrawBeacon"`
 */
export const useSimulateIelStakeTogetherAnticipateWithdrawBeacon = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'anticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIelStakeTogetherApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"claimAirdrop"`
 */
export const useSimulateIelStakeTogetherClaimAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'claimAirdrop'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"depositDonation"`
 */
export const useSimulateIelStakeTogetherDepositDonation = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'depositDonation'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"depositPool"`
 */
export const useSimulateIelStakeTogetherDepositPool = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'depositPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"forceNextValidatorOracle"`
 */
export const useSimulateIelStakeTogetherForceNextValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'forceNextValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateIelStakeTogetherPause = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"processFeeRewards"`
 */
export const useSimulateIelStakeTogetherProcessFeeRewards = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'processFeeRewards'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"removeFromAntiFraud"`
 */
export const useSimulateIelStakeTogetherRemoveFromAntiFraud = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'removeFromAntiFraud'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"removePool"`
 */
export const useSimulateIelStakeTogetherRemovePool = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'removePool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"removeValidatorOracle"`
 */
export const useSimulateIelStakeTogetherRemoveValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'removeValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"requestAddValidator"`
 */
export const useSimulateIelStakeTogetherRequestAddValidator = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'requestAddValidator'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setBeaconBalance"`
 */
export const useSimulateIelStakeTogetherSetBeaconBalance = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setBeaconBalance'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateIelStakeTogetherSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setFee"`
 */
export const useSimulateIelStakeTogetherSetFee = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setFee'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setFeeAddress"`
 */
export const useSimulateIelStakeTogetherSetFeeAddress = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setFeeAddress'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setL1Adapter"`
 */
export const useSimulateIelStakeTogetherSetL1Adapter = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setL1Adapter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"setWithdrawBalance"`
 */
export const useSimulateIelStakeTogetherSetWithdrawBalance = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'setWithdrawBalance'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIelStakeTogetherTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIelStakeTogetherTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateIelStakeTogetherUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"updateDelegations"`
 */
export const useSimulateIelStakeTogetherUpdateDelegations = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'updateDelegations'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"withdrawBeacon"`
 */
export const useSimulateIelStakeTogetherWithdrawBeacon = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'withdrawBeacon'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `functionName` set to `"withdrawPool"`
 */
export const useSimulateIelStakeTogetherWithdrawPool = /*#__PURE__*/ createUseSimulateContract({
  abi: ielstakeTogetherAbi,
  functionName: 'withdrawPool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__
 */
export const useWatchIelStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"AddPool"`
 */
export const useWatchIelStakeTogetherAddPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'AddPool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"AddValidatorOracle"`
 */
export const useWatchIelStakeTogetherAddValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'AddValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"AnticipateWithdrawBeacon"`
 */
export const useWatchIelStakeTogetherAnticipateWithdrawBeaconEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'AnticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"BurnShares"`
 */
export const useWatchIelStakeTogetherBurnSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'BurnShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"DepositBase"`
 */
export const useWatchIelStakeTogetherDepositBaseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'DepositBase'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"DepositLimitWasReached"`
 */
export const useWatchIelStakeTogetherDepositLimitWasReachedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'DepositLimitWasReached'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"MintFeeShares"`
 */
export const useWatchIelStakeTogetherMintFeeSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'MintFeeShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"MintShares"`
 */
export const useWatchIelStakeTogetherMintSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'MintShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"NextValidatorOracle"`
 */
export const useWatchIelStakeTogetherNextValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'NextValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"ProcessStakeRewards"`
 */
export const useWatchIelStakeTogetherProcessStakeRewardsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'ProcessStakeRewards'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"ProcessStakeValidator"`
 */
export const useWatchIelStakeTogetherProcessStakeValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'ProcessStakeValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIelStakeTogetherReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"RemovePool"`
 */
export const useWatchIelStakeTogetherRemovePoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'RemovePool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"RemoveValidatorOracle"`
 */
export const useWatchIelStakeTogetherRemoveValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'RemoveValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"RequestAddValidator"`
 */
export const useWatchIelStakeTogetherRequestAddValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'RequestAddValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetAdapter"`
 */
export const useWatchIelStakeTogetherSetAdapterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetAdapter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetAntiFraudStatus"`
 */
export const useWatchIelStakeTogetherSetAntiFraudStatusEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetAntiFraudStatus'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetBeaconBalance"`
 */
export const useWatchIelStakeTogetherSetBeaconBalanceEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetBeaconBalance'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchIelStakeTogetherSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetFee"`
 */
export const useWatchIelStakeTogetherSetFeeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetFee'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetFeeAddress"`
 */
export const useWatchIelStakeTogetherSetFeeAddressEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetFeeAddress'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchIelStakeTogetherSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIelStakeTogetherSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetValidatorSize"`
 */
export const useWatchIelStakeTogetherSetValidatorSizeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetValidatorSize'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetWithdrawBalance"`
 */
export const useWatchIelStakeTogetherSetWithdrawBalanceEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'SetWithdrawBalance'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"SetWithdrawalsCredentials"`
 */
export const useWatchIelStakeTogetherSetWithdrawalsCredentialsEvent = /*#__PURE__*/ createUseWatchContractEvent(
  {
    abi: ielstakeTogetherAbi,
    eventName: 'SetWithdrawalsCredentials'
  }
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"TransferShares"`
 */
export const useWatchIelStakeTogetherTransferSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'TransferShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"UpdateDelegations"`
 */
export const useWatchIelStakeTogetherUpdateDelegationsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'UpdateDelegations'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"WithdrawBase"`
 */
export const useWatchIelStakeTogetherWithdrawBaseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielstakeTogetherAbi,
  eventName: 'WithdrawBase'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielstakeTogetherAbi}__ and `eventName` set to `"WithdrawalsLimitWasReached"`
 */
export const useWatchIelStakeTogetherWithdrawalsLimitWasReachedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ielstakeTogetherAbi,
    eventName: 'WithdrawalsLimitWasReached'
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__
 */
export const useReadIelWithdrawals = /*#__PURE__*/ createUseReadContract({
  abi: ielWithdrawalsAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"isWithdrawReady"`
 */
export const useReadIelWithdrawalsIsWithdrawReady = /*#__PURE__*/ createUseReadContract({
  abi: ielWithdrawalsAbi,
  functionName: 'isWithdrawReady'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__
 */
export const useWriteIelWithdrawals = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIelWithdrawalsInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteIelWithdrawalsMint = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteIelWithdrawalsPause = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useWriteIelWithdrawalsReceiveWithdrawEther = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"setRouter"`
 */
export const useWriteIelWithdrawalsSetRouter = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteIelWithdrawalsSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIelWithdrawalsTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteIelWithdrawalsTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIelWithdrawalsTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteIelWithdrawalsUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteIelWithdrawalsWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: ielWithdrawalsAbi,
  functionName: 'withdraw'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__
 */
export const useSimulateIelWithdrawals = /*#__PURE__*/ createUseSimulateContract({ abi: ielWithdrawalsAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIelWithdrawalsInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateIelWithdrawalsMint = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateIelWithdrawalsPause = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useSimulateIelWithdrawalsReceiveWithdrawEther = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"setRouter"`
 */
export const useSimulateIelWithdrawalsSetRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateIelWithdrawalsSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIelWithdrawalsTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateIelWithdrawalsTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIelWithdrawalsTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateIelWithdrawalsUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateIelWithdrawalsWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: ielWithdrawalsAbi,
  functionName: 'withdraw'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielWithdrawalsAbi}__
 */
export const useWatchIelWithdrawalsEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: ielWithdrawalsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIelWithdrawalsReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielWithdrawalsAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `eventName` set to `"ReceiveWithdrawEther"`
 */
export const useWatchIelWithdrawalsReceiveWithdrawEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielWithdrawalsAbi,
  eventName: 'ReceiveWithdrawEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchIelWithdrawalsSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielWithdrawalsAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIelWithdrawalsSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielWithdrawalsAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ielWithdrawalsAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchIelWithdrawalsWithdrawEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ielWithdrawalsAbi,
  eventName: 'Withdraw'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc165Abi}__
 */
export const useReadIerc165 = /*#__PURE__*/ createUseReadContract({
  abi: ierc165Abi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc165SupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: ierc165Abi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1822ProxiableAbi}__
 */
export const useReadIerc1822Proxiable = /*#__PURE__*/ createUseReadContract({
  abi: ierc1822ProxiableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1822ProxiableAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadIerc1822ProxiableProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: ierc1822ProxiableAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useReadIerc20 = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useWriteIerc20 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useSimulateIerc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20Abi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20Abi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20Transfer = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20Abi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20TransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20Abi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useWatchIerc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc20Abi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20ApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc20Abi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20TransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc20Abi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useReadIerc20Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20MetadataAllowance = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20MetadataBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIerc20MetadataDecimals = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc20MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc20MetadataSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20MetadataTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWriteIerc20Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20MetadataApprove = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20MetadataTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20MetadataTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useSimulateIerc20Metadata = /*#__PURE__*/ createUseSimulateContract({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20MetadataApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20MetadataAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20MetadataTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20MetadataAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20MetadataTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20MetadataAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWatchIerc20MetadataEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20MetadataApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc20MetadataAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20MetadataTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc20MetadataAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useReadIerc20Permit = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadIerc20PermitDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi,
  functionName: 'DOMAIN_SEPARATOR'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadIerc20PermitNonces = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi,
  functionName: 'nonces'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useWriteIerc20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20PermitAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteIerc20PermitPermit = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20PermitAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useSimulateIerc20Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20PermitAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateIerc20PermitPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20PermitAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc5267Abi}__
 */
export const useReadIerc5267 = /*#__PURE__*/ createUseReadContract({
  abi: ierc5267Abi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc5267Abi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadIerc5267Eip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: ierc5267Abi,
  functionName: 'eip712Domain'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc5267Abi}__
 */
export const useWatchIerc5267Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc5267Abi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc5267Abi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchIerc5267Eip712DomainChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc5267Abi,
  eventName: 'EIP712DomainChanged'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iRouterAbi}__
 */
export const useReadIRouter = /*#__PURE__*/ createUseReadContract({
  abi: iRouterAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"getReportHash"`
 */
export const useReadIRouterGetReportHash = /*#__PURE__*/ createUseReadContract({
  abi: iRouterAbi,
  functionName: 'getReportHash'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"isReadyToExecute"`
 */
export const useReadIRouterIsReadyToExecute = /*#__PURE__*/ createUseReadContract({
  abi: iRouterAbi,
  functionName: 'isReadyToExecute'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"isReadyToSubmit"`
 */
export const useReadIRouterIsReadyToSubmit = /*#__PURE__*/ createUseReadContract({
  abi: iRouterAbi,
  functionName: 'isReadyToSubmit'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"isReportOracleBlackListed"`
 */
export const useReadIRouterIsReportOracleBlackListed = /*#__PURE__*/ createUseReadContract({
  abi: iRouterAbi,
  functionName: 'isReportOracleBlackListed'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"reportBlock"`
 */
export const useReadIRouterReportBlock = /*#__PURE__*/ createUseReadContract({
  abi: iRouterAbi,
  functionName: 'reportBlock'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__
 */
export const useWriteIRouter = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"addReportOracle"`
 */
export const useWriteIRouterAddReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'addReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"addSentinel"`
 */
export const useWriteIRouterAddSentinel = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'addSentinel'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"blacklistReportOracle"`
 */
export const useWriteIRouterBlacklistReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'blacklistReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"executeReport"`
 */
export const useWriteIRouterExecuteReport = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'executeReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"forceNextReportBlock"`
 */
export const useWriteIRouterForceNextReportBlock = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'forceNextReportBlock'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIRouterInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"isReportOracle"`
 */
export const useWriteIRouterIsReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'isReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteIRouterPause = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useWriteIRouterReceiveWithdrawEther = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"removeReportOracle"`
 */
export const useWriteIRouterRemoveReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'removeReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"removeSentinel"`
 */
export const useWriteIRouterRemoveSentinel = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'removeSentinel'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"revokeConsensusReport"`
 */
export const useWriteIRouterRevokeConsensusReport = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'revokeConsensusReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteIRouterSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteIRouterSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"submitReport"`
 */
export const useWriteIRouterSubmitReport = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'submitReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"unBlacklistReportOracle"`
 */
export const useWriteIRouterUnBlacklistReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'unBlacklistReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteIRouterUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: iRouterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__
 */
export const useSimulateIRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"addReportOracle"`
 */
export const useSimulateIRouterAddReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'addReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"addSentinel"`
 */
export const useSimulateIRouterAddSentinel = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'addSentinel'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"blacklistReportOracle"`
 */
export const useSimulateIRouterBlacklistReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'blacklistReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"executeReport"`
 */
export const useSimulateIRouterExecuteReport = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'executeReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"forceNextReportBlock"`
 */
export const useSimulateIRouterForceNextReportBlock = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'forceNextReportBlock'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIRouterInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"isReportOracle"`
 */
export const useSimulateIRouterIsReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'isReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateIRouterPause = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useSimulateIRouterReceiveWithdrawEther = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"removeReportOracle"`
 */
export const useSimulateIRouterRemoveReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'removeReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"removeSentinel"`
 */
export const useSimulateIRouterRemoveSentinel = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'removeSentinel'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"revokeConsensusReport"`
 */
export const useSimulateIRouterRevokeConsensusReport = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'revokeConsensusReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateIRouterSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateIRouterSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"submitReport"`
 */
export const useSimulateIRouterSubmitReport = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'submitReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"unBlacklistReportOracle"`
 */
export const useSimulateIRouterUnBlacklistReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'unBlacklistReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iRouterAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateIRouterUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: iRouterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__
 */
export const useWatchIRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"AddReportOracle"`
 */
export const useWatchIRouterAddReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'AddReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"AdvanceNextBlock"`
 */
export const useWatchIRouterAdvanceNextBlockEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'AdvanceNextBlock'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"BlacklistReportOracle"`
 */
export const useWatchIRouterBlacklistReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'BlacklistReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"ConsensusApprove"`
 */
export const useWatchIRouterConsensusApproveEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'ConsensusApprove'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"ConsensusFail"`
 */
export const useWatchIRouterConsensusFailEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'ConsensusFail'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"ExecuteReport"`
 */
export const useWatchIRouterExecuteReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'ExecuteReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIRouterReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"ReceiveWithdrawEther"`
 */
export const useWatchIRouterReceiveWithdrawEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'ReceiveWithdrawEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"RemoveReportOracle"`
 */
export const useWatchIRouterRemoveReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'RemoveReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"RevokeConsensusReport"`
 */
export const useWatchIRouterRevokeConsensusReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'RevokeConsensusReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"SetBunkerMode"`
 */
export const useWatchIRouterSetBunkerModeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'SetBunkerMode'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchIRouterSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIRouterSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"SubmitReport"`
 */
export const useWatchIRouterSubmitReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'SubmitReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iRouterAbi}__ and `eventName` set to `"UnBlacklistReportOracle"`
 */
export const useWatchIRouterUnBlacklistReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iRouterAbi,
  eventName: 'UnBlacklistReportOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__
 */
export const useReadIStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIStakeTogetherAllowance = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIStakeTogetherBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"beaconBalance"`
 */
export const useReadIStakeTogetherBeaconBalance = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'beaconBalance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"getFeeAddress"`
 */
export const useReadIStakeTogetherGetFeeAddress = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'getFeeAddress'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"getFeesRoles"`
 */
export const useReadIStakeTogetherGetFeesRoles = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'getFeesRoles'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"getWithdrawBeaconBlock"`
 */
export const useReadIStakeTogetherGetWithdrawBeaconBlock = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'getWithdrawBeaconBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"getWithdrawBlock"`
 */
export const useReadIStakeTogetherGetWithdrawBlock = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'getWithdrawBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"isListedInAntiFraud"`
 */
export const useReadIStakeTogetherIsListedInAntiFraud = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'isListedInAntiFraud'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"isValidatorOracle"`
 */
export const useReadIStakeTogetherIsValidatorOracle = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'isValidatorOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"sharesByWei"`
 */
export const useReadIStakeTogetherSharesByWei = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'sharesByWei'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIStakeTogetherTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"weiByShares"`
 */
export const useReadIStakeTogetherWeiByShares = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'weiByShares'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"withdrawBalance"`
 */
export const useReadIStakeTogetherWithdrawBalance = /*#__PURE__*/ createUseReadContract({
  abi: istakeTogetherAbi,
  functionName: 'withdrawBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__
 */
export const useWriteIStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"addPool"`
 */
export const useWriteIStakeTogetherAddPool = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'addPool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"addToAntiFraud"`
 */
export const useWriteIStakeTogetherAddToAntiFraud = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'addToAntiFraud'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"addValidator"`
 */
export const useWriteIStakeTogetherAddValidator = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'addValidator'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"addValidatorOracle"`
 */
export const useWriteIStakeTogetherAddValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'addValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"anticipateWithdrawBeacon"`
 */
export const useWriteIStakeTogetherAnticipateWithdrawBeacon = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'anticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIStakeTogetherApprove = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"claimAirdrop"`
 */
export const useWriteIStakeTogetherClaimAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'claimAirdrop'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"depositDonation"`
 */
export const useWriteIStakeTogetherDepositDonation = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'depositDonation'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"depositPool"`
 */
export const useWriteIStakeTogetherDepositPool = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'depositPool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"forceNextValidatorOracle"`
 */
export const useWriteIStakeTogetherForceNextValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'forceNextValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteIStakeTogetherPause = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"processFeeRewards"`
 */
export const useWriteIStakeTogetherProcessFeeRewards = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'processFeeRewards'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"removeFromAntiFraud"`
 */
export const useWriteIStakeTogetherRemoveFromAntiFraud = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'removeFromAntiFraud'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"removePool"`
 */
export const useWriteIStakeTogetherRemovePool = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'removePool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"removeValidatorOracle"`
 */
export const useWriteIStakeTogetherRemoveValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'removeValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setBeaconBalance"`
 */
export const useWriteIStakeTogetherSetBeaconBalance = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'setBeaconBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteIStakeTogetherSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setFee"`
 */
export const useWriteIStakeTogetherSetFee = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'setFee'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setFeeAddress"`
 */
export const useWriteIStakeTogetherSetFeeAddress = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'setFeeAddress'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setWithdrawBalance"`
 */
export const useWriteIStakeTogetherSetWithdrawBalance = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'setWithdrawBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIStakeTogetherTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIStakeTogetherTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteIStakeTogetherUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"updateDelegations"`
 */
export const useWriteIStakeTogetherUpdateDelegations = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'updateDelegations'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"withdrawBeacon"`
 */
export const useWriteIStakeTogetherWithdrawBeacon = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'withdrawBeacon'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"withdrawPool"`
 */
export const useWriteIStakeTogetherWithdrawPool = /*#__PURE__*/ createUseWriteContract({
  abi: istakeTogetherAbi,
  functionName: 'withdrawPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__
 */
export const useSimulateIStakeTogether = /*#__PURE__*/ createUseSimulateContract({ abi: istakeTogetherAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"addPool"`
 */
export const useSimulateIStakeTogetherAddPool = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'addPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"addToAntiFraud"`
 */
export const useSimulateIStakeTogetherAddToAntiFraud = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'addToAntiFraud'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"addValidator"`
 */
export const useSimulateIStakeTogetherAddValidator = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'addValidator'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"addValidatorOracle"`
 */
export const useSimulateIStakeTogetherAddValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'addValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"anticipateWithdrawBeacon"`
 */
export const useSimulateIStakeTogetherAnticipateWithdrawBeacon = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'anticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIStakeTogetherApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"claimAirdrop"`
 */
export const useSimulateIStakeTogetherClaimAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'claimAirdrop'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"depositDonation"`
 */
export const useSimulateIStakeTogetherDepositDonation = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'depositDonation'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"depositPool"`
 */
export const useSimulateIStakeTogetherDepositPool = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'depositPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"forceNextValidatorOracle"`
 */
export const useSimulateIStakeTogetherForceNextValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'forceNextValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateIStakeTogetherPause = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"processFeeRewards"`
 */
export const useSimulateIStakeTogetherProcessFeeRewards = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'processFeeRewards'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"removeFromAntiFraud"`
 */
export const useSimulateIStakeTogetherRemoveFromAntiFraud = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'removeFromAntiFraud'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"removePool"`
 */
export const useSimulateIStakeTogetherRemovePool = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'removePool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"removeValidatorOracle"`
 */
export const useSimulateIStakeTogetherRemoveValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'removeValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setBeaconBalance"`
 */
export const useSimulateIStakeTogetherSetBeaconBalance = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'setBeaconBalance'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateIStakeTogetherSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setFee"`
 */
export const useSimulateIStakeTogetherSetFee = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'setFee'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setFeeAddress"`
 */
export const useSimulateIStakeTogetherSetFeeAddress = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'setFeeAddress'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"setWithdrawBalance"`
 */
export const useSimulateIStakeTogetherSetWithdrawBalance = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'setWithdrawBalance'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIStakeTogetherTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIStakeTogetherTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateIStakeTogetherUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"updateDelegations"`
 */
export const useSimulateIStakeTogetherUpdateDelegations = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'updateDelegations'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"withdrawBeacon"`
 */
export const useSimulateIStakeTogetherWithdrawBeacon = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'withdrawBeacon'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link istakeTogetherAbi}__ and `functionName` set to `"withdrawPool"`
 */
export const useSimulateIStakeTogetherWithdrawPool = /*#__PURE__*/ createUseSimulateContract({
  abi: istakeTogetherAbi,
  functionName: 'withdrawPool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__
 */
export const useWatchIStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: istakeTogetherAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"AddPool"`
 */
export const useWatchIStakeTogetherAddPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'AddPool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"AddValidator"`
 */
export const useWatchIStakeTogetherAddValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'AddValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"AddValidatorOracle"`
 */
export const useWatchIStakeTogetherAddValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'AddValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"AnticipateWithdrawBeacon"`
 */
export const useWatchIStakeTogetherAnticipateWithdrawBeaconEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'AnticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"BurnShares"`
 */
export const useWatchIStakeTogetherBurnSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'BurnShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"DepositBase"`
 */
export const useWatchIStakeTogetherDepositBaseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'DepositBase'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"DepositLimitWasReached"`
 */
export const useWatchIStakeTogetherDepositLimitWasReachedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'DepositLimitWasReached'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"MintFeeShares"`
 */
export const useWatchIStakeTogetherMintFeeSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'MintFeeShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"MintShares"`
 */
export const useWatchIStakeTogetherMintSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'MintShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"NextValidatorOracle"`
 */
export const useWatchIStakeTogetherNextValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'NextValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"ProcessStakeRewards"`
 */
export const useWatchIStakeTogetherProcessStakeRewardsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'ProcessStakeRewards'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"ProcessStakeValidator"`
 */
export const useWatchIStakeTogetherProcessStakeValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'ProcessStakeValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIStakeTogetherReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"RemovePool"`
 */
export const useWatchIStakeTogetherRemovePoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'RemovePool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"RemoveValidatorOracle"`
 */
export const useWatchIStakeTogetherRemoveValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'RemoveValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetAntiFraudStatus"`
 */
export const useWatchIStakeTogetherSetAntiFraudStatusEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetAntiFraudStatus'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetBeaconBalance"`
 */
export const useWatchIStakeTogetherSetBeaconBalanceEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetBeaconBalance'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchIStakeTogetherSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetFee"`
 */
export const useWatchIStakeTogetherSetFeeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetFee'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetFeeAddress"`
 */
export const useWatchIStakeTogetherSetFeeAddressEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetFeeAddress'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchIStakeTogetherSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIStakeTogetherSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetValidatorSize"`
 */
export const useWatchIStakeTogetherSetValidatorSizeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetValidatorSize'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetWithdrawBalance"`
 */
export const useWatchIStakeTogetherSetWithdrawBalanceEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetWithdrawBalance'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"SetWithdrawalsCredentials"`
 */
export const useWatchIStakeTogetherSetWithdrawalsCredentialsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'SetWithdrawalsCredentials'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"TransferShares"`
 */
export const useWatchIStakeTogetherTransferSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'TransferShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"UpdateDelegations"`
 */
export const useWatchIStakeTogetherUpdateDelegationsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'UpdateDelegations'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"WithdrawBase"`
 */
export const useWatchIStakeTogetherWithdrawBaseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'WithdrawBase'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link istakeTogetherAbi}__ and `eventName` set to `"WithdrawalsLimitWasReached"`
 */
export const useWatchIStakeTogetherWithdrawalsLimitWasReachedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: istakeTogetherAbi,
  eventName: 'WithdrawalsLimitWasReached'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__
 */
export const useReadIStakeTogetherWrapper = /*#__PURE__*/ createUseReadContract({
  abi: iStakeTogetherWrapperAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"stpEthPerWstpETH"`
 */
export const useReadIStakeTogetherWrapperStpEthPerWstpEth = /*#__PURE__*/ createUseReadContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'stpEthPerWstpETH'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"wstpETHPerStpETH"`
 */
export const useReadIStakeTogetherWrapperWstpEthPerStpEth = /*#__PURE__*/ createUseReadContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'wstpETHPerStpETH'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__
 */
export const useWriteIStakeTogetherWrapper = /*#__PURE__*/ createUseWriteContract({
  abi: iStakeTogetherWrapperAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteIStakeTogetherWrapperSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIStakeTogetherWrapperTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteIStakeTogetherWrapperTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIStakeTogetherWrapperTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"unwrap"`
 */
export const useWriteIStakeTogetherWrapperUnwrap = /*#__PURE__*/ createUseWriteContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'unwrap'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"wrap"`
 */
export const useWriteIStakeTogetherWrapperWrap = /*#__PURE__*/ createUseWriteContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'wrap'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__
 */
export const useSimulateIStakeTogetherWrapper = /*#__PURE__*/ createUseSimulateContract({
  abi: iStakeTogetherWrapperAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateIStakeTogetherWrapperSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIStakeTogetherWrapperTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateIStakeTogetherWrapperTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIStakeTogetherWrapperTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"unwrap"`
 */
export const useSimulateIStakeTogetherWrapperUnwrap = /*#__PURE__*/ createUseSimulateContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'unwrap'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `functionName` set to `"wrap"`
 */
export const useSimulateIStakeTogetherWrapperWrap = /*#__PURE__*/ createUseSimulateContract({
  abi: iStakeTogetherWrapperAbi,
  functionName: 'wrap'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__
 */
export const useWatchIStakeTogetherWrapperEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iStakeTogetherWrapperAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIStakeTogetherWrapperReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iStakeTogetherWrapperAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIStakeTogetherWrapperSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iStakeTogetherWrapperAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `eventName` set to `"Unwrapped"`
 */
export const useWatchIStakeTogetherWrapperUnwrappedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iStakeTogetherWrapperAbi,
  eventName: 'Unwrapped'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iStakeTogetherWrapperAbi}__ and `eventName` set to `"Wrapped"`
 */
export const useWatchIStakeTogetherWrapperWrappedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iStakeTogetherWrapperAbi,
  eventName: 'Wrapped'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iWithdrawalsAbi}__
 */
export const useReadIWithdrawals = /*#__PURE__*/ createUseReadContract({
  abi: iWithdrawalsAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"isWithdrawReady"`
 */
export const useReadIWithdrawalsIsWithdrawReady = /*#__PURE__*/ createUseReadContract({
  abi: iWithdrawalsAbi,
  functionName: 'isWithdrawReady'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__
 */
export const useWriteIWithdrawals = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIWithdrawalsInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteIWithdrawalsMint = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteIWithdrawalsPause = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useWriteIWithdrawalsReceiveWithdrawEther = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"setRouter"`
 */
export const useWriteIWithdrawalsSetRouter = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteIWithdrawalsSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIWithdrawalsTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteIWithdrawalsTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIWithdrawalsTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteIWithdrawalsUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteIWithdrawalsWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: iWithdrawalsAbi,
  functionName: 'withdraw'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__
 */
export const useSimulateIWithdrawals = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIWithdrawalsInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateIWithdrawalsMint = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateIWithdrawalsPause = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useSimulateIWithdrawalsReceiveWithdrawEther = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"setRouter"`
 */
export const useSimulateIWithdrawalsSetRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateIWithdrawalsSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIWithdrawalsTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateIWithdrawalsTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIWithdrawalsTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateIWithdrawalsUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateIWithdrawalsWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: iWithdrawalsAbi,
  functionName: 'withdraw'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iWithdrawalsAbi}__
 */
export const useWatchIWithdrawalsEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: iWithdrawalsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchIWithdrawalsReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iWithdrawalsAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `eventName` set to `"ReceiveWithdrawEther"`
 */
export const useWatchIWithdrawalsReceiveWithdrawEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iWithdrawalsAbi,
  eventName: 'ReceiveWithdrawEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchIWithdrawalsSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iWithdrawalsAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchIWithdrawalsSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iWithdrawalsAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iWithdrawalsAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchIWithdrawalsWithdrawEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iWithdrawalsAbi,
  eventName: 'Withdraw'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initializableAbi}__
 */
export const useWatchInitializableEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: initializableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initializableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchInitializableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: initializableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link noncesUpgradeableAbi}__
 */
export const useReadNoncesUpgradeable = /*#__PURE__*/ createUseReadContract({
  abi: noncesUpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link noncesUpgradeableAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadNoncesUpgradeableNonces = /*#__PURE__*/ createUseReadContract({
  abi: noncesUpgradeableAbi,
  functionName: 'nonces'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link noncesUpgradeableAbi}__
 */
export const useWatchNoncesUpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: noncesUpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link noncesUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchNoncesUpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: noncesUpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pausableUpgradeableAbi}__
 */
export const useReadPausableUpgradeable = /*#__PURE__*/ createUseReadContract({
  abi: pausableUpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pausableUpgradeableAbi}__ and `functionName` set to `"paused"`
 */
export const useReadPausableUpgradeablePaused = /*#__PURE__*/ createUseReadContract({
  abi: pausableUpgradeableAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableUpgradeableAbi}__
 */
export const useWatchPausableUpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: pausableUpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchPausableUpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: pausableUpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableUpgradeableAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchPausableUpgradeablePausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: pausableUpgradeableAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableUpgradeableAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchPausableUpgradeableUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: pausableUpgradeableAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reentrancyGuardUpgradeableAbi}__
 */
export const useWatchReentrancyGuardUpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: reentrancyGuardUpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reentrancyGuardUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchReentrancyGuardUpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: reentrancyGuardUpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__
 */
export const useReadRouter = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadRouterAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadRouterDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"ORACLE_REPORT_MANAGER_ROLE"`
 */
export const useReadRouterOracleReportManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'ORACLE_REPORT_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"ORACLE_REPORT_ROLE"`
 */
export const useReadRouterOracleReportRole = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'ORACLE_REPORT_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"ORACLE_SENTINEL_ROLE"`
 */
export const useReadRouterOracleSentinelRole = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'ORACLE_SENTINEL_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadRouterUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadRouterUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"airdrop"`
 */
export const useReadRouterAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'airdrop'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"bunkermode"`
 */
export const useReadRouterBunkermode = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'bunkermode'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"config"`
 */
export const useReadRouterConfig = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'config'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"consensusReport"`
 */
export const useReadRouterConsensusReport = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'consensusReport'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"executedReports"`
 */
export const useReadRouterExecutedReports = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'executedReports'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"getReportHash"`
 */
export const useReadRouterGetReportHash = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'getReportHash'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadRouterGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadRouterHasRole = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"isReadyToExecute"`
 */
export const useReadRouterIsReadyToExecute = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'isReadyToExecute'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"isReadyToSubmit"`
 */
export const useReadRouterIsReadyToSubmit = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'isReadyToSubmit'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"isReportOracle"`
 */
export const useReadRouterIsReportOracle = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'isReportOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"isReportOracleBlackListed"`
 */
export const useReadRouterIsReportOracleBlackListed = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'isReportOracleBlackListed'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"lastConsensusBlock"`
 */
export const useReadRouterLastConsensusBlock = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'lastConsensusBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"lastExecutedBlock"`
 */
export const useReadRouterLastExecutedBlock = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'lastExecutedBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"paused"`
 */
export const useReadRouterPaused = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"pendingExecution"`
 */
export const useReadRouterPendingExecution = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'pendingExecution'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadRouterProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"reportBlock"`
 */
export const useReadRouterReportBlock = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'reportBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"reportDelayBlock"`
 */
export const useReadRouterReportDelayBlock = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'reportDelayBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"reportOraclesBlacklist"`
 */
export const useReadRouterReportOraclesBlacklist = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'reportOraclesBlacklist'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"reportVotesForBlock"`
 */
export const useReadRouterReportVotesForBlock = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'reportVotesForBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"reports"`
 */
export const useReadRouterReports = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'reports'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"revokedReports"`
 */
export const useReadRouterRevokedReports = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'revokedReports'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"stakeTogether"`
 */
export const useReadRouterStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'stakeTogether'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadRouterSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"totalReportOracles"`
 */
export const useReadRouterTotalReportOracles = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'totalReportOracles'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"totalVotes"`
 */
export const useReadRouterTotalVotes = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'totalVotes'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"version"`
 */
export const useReadRouterVersion = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"withdrawals"`
 */
export const useReadRouterWithdrawals = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'withdrawals'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__
 */
export const useWriteRouter = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"addReportOracle"`
 */
export const useWriteRouterAddReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'addReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"addSentinel"`
 */
export const useWriteRouterAddSentinel = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'addSentinel'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"blacklistReportOracle"`
 */
export const useWriteRouterBlacklistReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'blacklistReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"executeReport"`
 */
export const useWriteRouterExecuteReport = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'executeReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"forceNextReportBlock"`
 */
export const useWriteRouterForceNextReportBlock = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'forceNextReportBlock'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteRouterGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteRouterInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteRouterPause = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useWriteRouterReceiveWithdrawEther = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"removeReportOracle"`
 */
export const useWriteRouterRemoveReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'removeReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"removeSentinel"`
 */
export const useWriteRouterRemoveSentinel = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'removeSentinel'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteRouterRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"revokeConsensusReport"`
 */
export const useWriteRouterRevokeConsensusReport = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'revokeConsensusReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteRouterRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"setBunkerMode"`
 */
export const useWriteRouterSetBunkerMode = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'setBunkerMode'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteRouterSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteRouterSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"submitReport"`
 */
export const useWriteRouterSubmitReport = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'submitReport'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"unBlacklistReportOracle"`
 */
export const useWriteRouterUnBlacklistReportOracle = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'unBlacklistReportOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteRouterUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteRouterUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: routerAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__
 */
export const useSimulateRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"addReportOracle"`
 */
export const useSimulateRouterAddReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'addReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"addSentinel"`
 */
export const useSimulateRouterAddSentinel = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'addSentinel'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"blacklistReportOracle"`
 */
export const useSimulateRouterBlacklistReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'blacklistReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"executeReport"`
 */
export const useSimulateRouterExecuteReport = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'executeReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"forceNextReportBlock"`
 */
export const useSimulateRouterForceNextReportBlock = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'forceNextReportBlock'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateRouterGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateRouterInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateRouterPause = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useSimulateRouterReceiveWithdrawEther = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"removeReportOracle"`
 */
export const useSimulateRouterRemoveReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'removeReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"removeSentinel"`
 */
export const useSimulateRouterRemoveSentinel = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'removeSentinel'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateRouterRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"revokeConsensusReport"`
 */
export const useSimulateRouterRevokeConsensusReport = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'revokeConsensusReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateRouterRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"setBunkerMode"`
 */
export const useSimulateRouterSetBunkerMode = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'setBunkerMode'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateRouterSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateRouterSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"submitReport"`
 */
export const useSimulateRouterSubmitReport = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'submitReport'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"unBlacklistReportOracle"`
 */
export const useSimulateRouterUnBlacklistReportOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'unBlacklistReportOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateRouterUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateRouterUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: routerAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__
 */
export const useWatchRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"AddReportOracle"`
 */
export const useWatchRouterAddReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'AddReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"AdvanceNextBlock"`
 */
export const useWatchRouterAdvanceNextBlockEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'AdvanceNextBlock'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"BlacklistReportOracle"`
 */
export const useWatchRouterBlacklistReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'BlacklistReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"ConsensusApprove"`
 */
export const useWatchRouterConsensusApproveEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'ConsensusApprove'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"ConsensusFail"`
 */
export const useWatchRouterConsensusFailEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'ConsensusFail'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"ExecuteReport"`
 */
export const useWatchRouterExecuteReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'ExecuteReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchRouterInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchRouterPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchRouterReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"ReceiveWithdrawEther"`
 */
export const useWatchRouterReceiveWithdrawEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'ReceiveWithdrawEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"RemoveReportOracle"`
 */
export const useWatchRouterRemoveReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'RemoveReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"RevokeConsensusReport"`
 */
export const useWatchRouterRevokeConsensusReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'RevokeConsensusReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchRouterRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchRouterRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchRouterRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"SetBunkerMode"`
 */
export const useWatchRouterSetBunkerModeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'SetBunkerMode'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchRouterSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchRouterSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"SubmitReport"`
 */
export const useWatchRouterSubmitReportEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'SubmitReport'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"UnBlacklistReportOracle"`
 */
export const useWatchRouterUnBlacklistReportOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'UnBlacklistReportOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchRouterUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link routerAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchRouterUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: routerAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__
 */
export const useReadStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadStakeTogetherAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"ANTI_FRAUD_MANAGER_ROLE"`
 */
export const useReadStakeTogetherAntiFraudManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'ANTI_FRAUD_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"ANTI_FRAUD_SENTINEL_ROLE"`
 */
export const useReadStakeTogetherAntiFraudSentinelRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'ANTI_FRAUD_SENTINEL_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadStakeTogetherDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadStakeTogetherDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'DOMAIN_SEPARATOR'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"POOL_MANAGER_ROLE"`
 */
export const useReadStakeTogetherPoolManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'POOL_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadStakeTogetherUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadStakeTogetherUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"VALIDATOR_ORACLE_MANAGER_ROLE"`
 */
export const useReadStakeTogetherValidatorOracleManagerRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'VALIDATOR_ORACLE_MANAGER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"VALIDATOR_ORACLE_ROLE"`
 */
export const useReadStakeTogetherValidatorOracleRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'VALIDATOR_ORACLE_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"VALIDATOR_ORACLE_SENTINEL_ROLE"`
 */
export const useReadStakeTogetherValidatorOracleSentinelRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'VALIDATOR_ORACLE_SENTINEL_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"airdrop"`
 */
export const useReadStakeTogetherAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'airdrop'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadStakeTogetherAllowance = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadStakeTogetherBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"beaconBalance"`
 */
export const useReadStakeTogetherBeaconBalance = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'beaconBalance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"config"`
 */
export const useReadStakeTogetherConfig = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'config'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"currentOracleIndex"`
 */
export const useReadStakeTogetherCurrentOracleIndex = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'currentOracleIndex'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadStakeTogetherDecimals = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"deposit"`
 */
export const useReadStakeTogetherDeposit = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'deposit'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadStakeTogetherEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'eip712Domain'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"getFee"`
 */
export const useReadStakeTogetherGetFee = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'getFee'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"getFeeAddress"`
 */
export const useReadStakeTogetherGetFeeAddress = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'getFeeAddress'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"getFeesRoles"`
 */
export const useReadStakeTogetherGetFeesRoles = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'getFeesRoles'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadStakeTogetherGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"getWithdrawBeaconBlock"`
 */
export const useReadStakeTogetherGetWithdrawBeaconBlock = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'getWithdrawBeaconBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"getWithdrawBlock"`
 */
export const useReadStakeTogetherGetWithdrawBlock = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'getWithdrawBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadStakeTogetherHasRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"isListedInAntiFraud"`
 */
export const useReadStakeTogetherIsListedInAntiFraud = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'isListedInAntiFraud'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"isValidatorOracle"`
 */
export const useReadStakeTogetherIsValidatorOracle = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'isValidatorOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"lastResetBlock"`
 */
export const useReadStakeTogetherLastResetBlock = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'lastResetBlock'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"name"`
 */
export const useReadStakeTogetherName = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadStakeTogetherNonces = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'nonces'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"paused"`
 */
export const useReadStakeTogetherPaused = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"pools"`
 */
export const useReadStakeTogetherPools = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'pools'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadStakeTogetherProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"router"`
 */
export const useReadStakeTogetherRouter = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'router'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"shares"`
 */
export const useReadStakeTogetherShares = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'shares'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"sharesByWei"`
 */
export const useReadStakeTogetherSharesByWei = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'sharesByWei'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadStakeTogetherSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadStakeTogetherSymbol = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"totalDeposited"`
 */
export const useReadStakeTogetherTotalDeposited = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'totalDeposited'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"totalShares"`
 */
export const useReadStakeTogetherTotalShares = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'totalShares'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadStakeTogetherTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"totalWithdrawnPool"`
 */
export const useReadStakeTogetherTotalWithdrawnPool = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'totalWithdrawnPool'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"totalWithdrawnValidator"`
 */
export const useReadStakeTogetherTotalWithdrawnValidator = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'totalWithdrawnValidator'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"validators"`
 */
export const useReadStakeTogetherValidators = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'validators'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"version"`
 */
export const useReadStakeTogetherVersion = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"weiByShares"`
 */
export const useReadStakeTogetherWeiByShares = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'weiByShares'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"withdrawBalance"`
 */
export const useReadStakeTogetherWithdrawBalance = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'withdrawBalance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"withdrawalCredentials"`
 */
export const useReadStakeTogetherWithdrawalCredentials = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'withdrawalCredentials'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"withdrawals"`
 */
export const useReadStakeTogetherWithdrawals = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherAbi,
  functionName: 'withdrawals'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__
 */
export const useWriteStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"addPool"`
 */
export const useWriteStakeTogetherAddPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'addPool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"addToAntiFraud"`
 */
export const useWriteStakeTogetherAddToAntiFraud = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'addToAntiFraud'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"addValidator"`
 */
export const useWriteStakeTogetherAddValidator = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'addValidator'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"addValidatorOracle"`
 */
export const useWriteStakeTogetherAddValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'addValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"anticipateWithdrawBeacon"`
 */
export const useWriteStakeTogetherAnticipateWithdrawBeacon = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'anticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteStakeTogetherApprove = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteStakeTogetherBurn = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteStakeTogetherBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"claimAirdrop"`
 */
export const useWriteStakeTogetherClaimAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'claimAirdrop'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"depositDonation"`
 */
export const useWriteStakeTogetherDepositDonation = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'depositDonation'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"depositPool"`
 */
export const useWriteStakeTogetherDepositPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'depositPool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"forceNextValidatorOracle"`
 */
export const useWriteStakeTogetherForceNextValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'forceNextValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteStakeTogetherGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteStakeTogetherInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteStakeTogetherPause = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteStakeTogetherPermit = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"processFeeRewards"`
 */
export const useWriteStakeTogetherProcessFeeRewards = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'processFeeRewards'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"removeFromAntiFraud"`
 */
export const useWriteStakeTogetherRemoveFromAntiFraud = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'removeFromAntiFraud'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"removePool"`
 */
export const useWriteStakeTogetherRemovePool = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'removePool'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"removeValidatorOracle"`
 */
export const useWriteStakeTogetherRemoveValidatorOracle = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'removeValidatorOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteStakeTogetherRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteStakeTogetherRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setBeaconBalance"`
 */
export const useWriteStakeTogetherSetBeaconBalance = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'setBeaconBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteStakeTogetherSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setFee"`
 */
export const useWriteStakeTogetherSetFee = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'setFee'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setFeeAddress"`
 */
export const useWriteStakeTogetherSetFeeAddress = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'setFeeAddress'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setWithdrawBalance"`
 */
export const useWriteStakeTogetherSetWithdrawBalance = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'setWithdrawBalance'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteStakeTogetherTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteStakeTogetherTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteStakeTogetherUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"updateDelegations"`
 */
export const useWriteStakeTogetherUpdateDelegations = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'updateDelegations'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteStakeTogetherUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"withdrawBeacon"`
 */
export const useWriteStakeTogetherWithdrawBeacon = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'withdrawBeacon'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"withdrawPool"`
 */
export const useWriteStakeTogetherWithdrawPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherAbi,
  functionName: 'withdrawPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__
 */
export const useSimulateStakeTogether = /*#__PURE__*/ createUseSimulateContract({ abi: stakeTogetherAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"addPool"`
 */
export const useSimulateStakeTogetherAddPool = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'addPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"addToAntiFraud"`
 */
export const useSimulateStakeTogetherAddToAntiFraud = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'addToAntiFraud'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"addValidator"`
 */
export const useSimulateStakeTogetherAddValidator = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'addValidator'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"addValidatorOracle"`
 */
export const useSimulateStakeTogetherAddValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'addValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"anticipateWithdrawBeacon"`
 */
export const useSimulateStakeTogetherAnticipateWithdrawBeacon = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'anticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateStakeTogetherApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateStakeTogetherBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateStakeTogetherBurnFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"claimAirdrop"`
 */
export const useSimulateStakeTogetherClaimAirdrop = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'claimAirdrop'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"depositDonation"`
 */
export const useSimulateStakeTogetherDepositDonation = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'depositDonation'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"depositPool"`
 */
export const useSimulateStakeTogetherDepositPool = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'depositPool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"forceNextValidatorOracle"`
 */
export const useSimulateStakeTogetherForceNextValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'forceNextValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateStakeTogetherGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateStakeTogetherInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateStakeTogetherPause = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateStakeTogetherPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"processFeeRewards"`
 */
export const useSimulateStakeTogetherProcessFeeRewards = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'processFeeRewards'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"removeFromAntiFraud"`
 */
export const useSimulateStakeTogetherRemoveFromAntiFraud = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'removeFromAntiFraud'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"removePool"`
 */
export const useSimulateStakeTogetherRemovePool = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'removePool'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"removeValidatorOracle"`
 */
export const useSimulateStakeTogetherRemoveValidatorOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'removeValidatorOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateStakeTogetherRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateStakeTogetherRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setBeaconBalance"`
 */
export const useSimulateStakeTogetherSetBeaconBalance = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'setBeaconBalance'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateStakeTogetherSetConfig = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'setConfig'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setFee"`
 */
export const useSimulateStakeTogetherSetFee = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'setFee'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setFeeAddress"`
 */
export const useSimulateStakeTogetherSetFeeAddress = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'setFeeAddress'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"setWithdrawBalance"`
 */
export const useSimulateStakeTogetherSetWithdrawBalance = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'setWithdrawBalance'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateStakeTogetherTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateStakeTogetherTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateStakeTogetherUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"updateDelegations"`
 */
export const useSimulateStakeTogetherUpdateDelegations = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'updateDelegations'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateStakeTogetherUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"withdrawBeacon"`
 */
export const useSimulateStakeTogetherWithdrawBeacon = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'withdrawBeacon'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherAbi}__ and `functionName` set to `"withdrawPool"`
 */
export const useSimulateStakeTogetherWithdrawPool = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherAbi,
  functionName: 'withdrawPool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__
 */
export const useWatchStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: stakeTogetherAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"AddPool"`
 */
export const useWatchStakeTogetherAddPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'AddPool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"AddValidator"`
 */
export const useWatchStakeTogetherAddValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'AddValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"AddValidatorOracle"`
 */
export const useWatchStakeTogetherAddValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'AddValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"AnticipateWithdrawBeacon"`
 */
export const useWatchStakeTogetherAnticipateWithdrawBeaconEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'AnticipateWithdrawBeacon'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchStakeTogetherApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"BurnShares"`
 */
export const useWatchStakeTogetherBurnSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'BurnShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"DepositBase"`
 */
export const useWatchStakeTogetherDepositBaseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'DepositBase'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"DepositLimitWasReached"`
 */
export const useWatchStakeTogetherDepositLimitWasReachedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'DepositLimitWasReached'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchStakeTogetherEip712DomainChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'EIP712DomainChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchStakeTogetherInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"MintFeeShares"`
 */
export const useWatchStakeTogetherMintFeeSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'MintFeeShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"MintShares"`
 */
export const useWatchStakeTogetherMintSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'MintShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"NextValidatorOracle"`
 */
export const useWatchStakeTogetherNextValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'NextValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchStakeTogetherPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"ProcessStakeRewards"`
 */
export const useWatchStakeTogetherProcessStakeRewardsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'ProcessStakeRewards'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"ProcessStakeValidator"`
 */
export const useWatchStakeTogetherProcessStakeValidatorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'ProcessStakeValidator'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchStakeTogetherReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"RemovePool"`
 */
export const useWatchStakeTogetherRemovePoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'RemovePool'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"RemoveValidatorOracle"`
 */
export const useWatchStakeTogetherRemoveValidatorOracleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'RemoveValidatorOracle'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchStakeTogetherRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchStakeTogetherRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchStakeTogetherRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetAntiFraudStatus"`
 */
export const useWatchStakeTogetherSetAntiFraudStatusEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetAntiFraudStatus'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetBeaconBalance"`
 */
export const useWatchStakeTogetherSetBeaconBalanceEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetBeaconBalance'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetConfig"`
 */
export const useWatchStakeTogetherSetConfigEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetConfig'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetFee"`
 */
export const useWatchStakeTogetherSetFeeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetFee'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetFeeAddress"`
 */
export const useWatchStakeTogetherSetFeeAddressEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetFeeAddress'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchStakeTogetherSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchStakeTogetherSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetValidatorSize"`
 */
export const useWatchStakeTogetherSetValidatorSizeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetValidatorSize'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetWithdrawBalance"`
 */
export const useWatchStakeTogetherSetWithdrawBalanceEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetWithdrawBalance'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"SetWithdrawalsCredentials"`
 */
export const useWatchStakeTogetherSetWithdrawalsCredentialsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'SetWithdrawalsCredentials'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchStakeTogetherTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"TransferShares"`
 */
export const useWatchStakeTogetherTransferSharesEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'TransferShares'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchStakeTogetherUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"UpdateDelegations"`
 */
export const useWatchStakeTogetherUpdateDelegationsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'UpdateDelegations'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchStakeTogetherUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"WithdrawBase"`
 */
export const useWatchStakeTogetherWithdrawBaseEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'WithdrawBase'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherAbi}__ and `eventName` set to `"WithdrawalsLimitWasReached"`
 */
export const useWatchStakeTogetherWithdrawalsLimitWasReachedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherAbi,
  eventName: 'WithdrawalsLimitWasReached'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__
 */
export const useReadStakeTogetherWrapper = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadStakeTogetherWrapperAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadStakeTogetherWrapperDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadStakeTogetherWrapperDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'DOMAIN_SEPARATOR'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadStakeTogetherWrapperUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadStakeTogetherWrapperUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadStakeTogetherWrapperAllowance = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadStakeTogetherWrapperBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadStakeTogetherWrapperDecimals = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadStakeTogetherWrapperEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'eip712Domain'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadStakeTogetherWrapperGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadStakeTogetherWrapperHasRole = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"name"`
 */
export const useReadStakeTogetherWrapperName = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadStakeTogetherWrapperNonces = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'nonces'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"paused"`
 */
export const useReadStakeTogetherWrapperPaused = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadStakeTogetherWrapperProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"stakeTogether"`
 */
export const useReadStakeTogetherWrapperStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'stakeTogether'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"stpEthPerWstpETH"`
 */
export const useReadStakeTogetherWrapperStpEthPerWstpEth = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'stpEthPerWstpETH'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadStakeTogetherWrapperSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadStakeTogetherWrapperSymbol = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadStakeTogetherWrapperTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"version"`
 */
export const useReadStakeTogetherWrapperVersion = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"wstpETHPerStpETH"`
 */
export const useReadStakeTogetherWrapperWstpEthPerStpEth = /*#__PURE__*/ createUseReadContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'wstpETHPerStpETH'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__
 */
export const useWriteStakeTogetherWrapper = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteStakeTogetherWrapperApprove = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteStakeTogetherWrapperBurn = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteStakeTogetherWrapperBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteStakeTogetherWrapperGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteStakeTogetherWrapperInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteStakeTogetherWrapperPause = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteStakeTogetherWrapperPermit = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteStakeTogetherWrapperRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteStakeTogetherWrapperRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteStakeTogetherWrapperSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteStakeTogetherWrapperTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteStakeTogetherWrapperTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteStakeTogetherWrapperTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteStakeTogetherWrapperUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"unwrap"`
 */
export const useWriteStakeTogetherWrapperUnwrap = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'unwrap'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteStakeTogetherWrapperUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"wrap"`
 */
export const useWriteStakeTogetherWrapperWrap = /*#__PURE__*/ createUseWriteContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'wrap'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__
 */
export const useSimulateStakeTogetherWrapper = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateStakeTogetherWrapperApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateStakeTogetherWrapperBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateStakeTogetherWrapperBurnFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateStakeTogetherWrapperGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateStakeTogetherWrapperInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateStakeTogetherWrapperPause = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateStakeTogetherWrapperPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateStakeTogetherWrapperRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateStakeTogetherWrapperRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateStakeTogetherWrapperSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateStakeTogetherWrapperTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateStakeTogetherWrapperTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateStakeTogetherWrapperTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateStakeTogetherWrapperUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"unwrap"`
 */
export const useSimulateStakeTogetherWrapperUnwrap = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'unwrap'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateStakeTogetherWrapperUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `functionName` set to `"wrap"`
 */
export const useSimulateStakeTogetherWrapperWrap = /*#__PURE__*/ createUseSimulateContract({
  abi: stakeTogetherWrapperAbi,
  functionName: 'wrap'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__
 */
export const useWatchStakeTogetherWrapperEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchStakeTogetherWrapperApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchStakeTogetherWrapperEip712DomainChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'EIP712DomainChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchStakeTogetherWrapperInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchStakeTogetherWrapperPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchStakeTogetherWrapperReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchStakeTogetherWrapperRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchStakeTogetherWrapperRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchStakeTogetherWrapperRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchStakeTogetherWrapperSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchStakeTogetherWrapperTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchStakeTogetherWrapperUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"Unwrapped"`
 */
export const useWatchStakeTogetherWrapperUnwrappedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'Unwrapped'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchStakeTogetherWrapperUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakeTogetherWrapperAbi}__ and `eventName` set to `"Wrapped"`
 */
export const useWatchStakeTogetherWrapperWrappedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakeTogetherWrapperAbi,
  eventName: 'Wrapped'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__
 */
export const useReadUupsUpgradeable = /*#__PURE__*/ createUseReadContract({
  abi: uupsUpgradeableAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadUupsUpgradeableUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: uupsUpgradeableAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadUupsUpgradeableProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: uupsUpgradeableAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__
 */
export const useWriteUupsUpgradeable = /*#__PURE__*/ createUseWriteContract({
  abi: uupsUpgradeableAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteUupsUpgradeableUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: uupsUpgradeableAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__
 */
export const useSimulateUupsUpgradeable = /*#__PURE__*/ createUseSimulateContract({ abi: uupsUpgradeableAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateUupsUpgradeableUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: uupsUpgradeableAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uupsUpgradeableAbi}__
 */
export const useWatchUupsUpgradeableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: uupsUpgradeableAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchUupsUpgradeableInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: uupsUpgradeableAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchUupsUpgradeableUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: uupsUpgradeableAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__
 */
export const useReadWithdrawals = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 */
export const useReadWithdrawalsAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadWithdrawalsDefaultAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'DEFAULT_ADMIN_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadWithdrawalsDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'DOMAIN_SEPARATOR'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadWithdrawalsUpgraderRole = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'UPGRADER_ROLE'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadWithdrawalsUpgradeInterfaceVersion = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'UPGRADE_INTERFACE_VERSION'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadWithdrawalsAllowance = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'allowance'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadWithdrawalsBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadWithdrawalsDecimals = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'decimals'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadWithdrawalsEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'eip712Domain'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadWithdrawalsGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'getRoleAdmin'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadWithdrawalsHasRole = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'hasRole'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"isWithdrawReady"`
 */
export const useReadWithdrawalsIsWithdrawReady = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'isWithdrawReady'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"name"`
 */
export const useReadWithdrawalsName = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadWithdrawalsNonces = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'nonces'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"paused"`
 */
export const useReadWithdrawalsPaused = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadWithdrawalsProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'proxiableUUID'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"router"`
 */
export const useReadWithdrawalsRouter = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'router'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"stakeTogether"`
 */
export const useReadWithdrawalsStakeTogether = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'stakeTogether'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadWithdrawalsSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadWithdrawalsSymbol = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadWithdrawalsTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"version"`
 */
export const useReadWithdrawalsVersion = /*#__PURE__*/ createUseReadContract({
  abi: withdrawalsAbi,
  functionName: 'version'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__
 */
export const useWriteWithdrawals = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteWithdrawalsApprove = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteWithdrawalsBurn = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteWithdrawalsBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteWithdrawalsGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteWithdrawalsInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteWithdrawalsMint = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteWithdrawalsPause = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteWithdrawalsPermit = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useWriteWithdrawalsReceiveWithdrawEther = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteWithdrawalsRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteWithdrawalsRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"setRouter"`
 */
export const useWriteWithdrawalsSetRouter = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useWriteWithdrawalsSetStakeTogether = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteWithdrawalsTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useWriteWithdrawalsTransferExtraAmount = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteWithdrawalsTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteWithdrawalsUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteWithdrawalsUpgradeToAndCall = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteWithdrawalsWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: withdrawalsAbi,
  functionName: 'withdraw'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__
 */
export const useSimulateWithdrawals = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateWithdrawalsApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateWithdrawalsBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'burn'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateWithdrawalsBurnFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'burnFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateWithdrawalsGrantRole = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'grantRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateWithdrawalsInitialize = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'initialize'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateWithdrawalsMint = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateWithdrawalsPause = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateWithdrawalsPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'permit'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"receiveWithdrawEther"`
 */
export const useSimulateWithdrawalsReceiveWithdrawEther = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'receiveWithdrawEther'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateWithdrawalsRenounceRole = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'renounceRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateWithdrawalsRevokeRole = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'revokeRole'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"setRouter"`
 */
export const useSimulateWithdrawalsSetRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'setRouter'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"setStakeTogether"`
 */
export const useSimulateWithdrawalsSetStakeTogether = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'setStakeTogether'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateWithdrawalsTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'transfer'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"transferExtraAmount"`
 */
export const useSimulateWithdrawalsTransferExtraAmount = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'transferExtraAmount'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateWithdrawalsTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateWithdrawalsUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateWithdrawalsUpgradeToAndCall = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'upgradeToAndCall'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link withdrawalsAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateWithdrawalsWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: withdrawalsAbi,
  functionName: 'withdraw'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__
 */
export const useWatchWithdrawalsEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: withdrawalsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchWithdrawalsApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchWithdrawalsEip712DomainChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'EIP712DomainChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchWithdrawalsInitializedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'Initialized'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchWithdrawalsPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"ReceiveEther"`
 */
export const useWatchWithdrawalsReceiveEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'ReceiveEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"ReceiveWithdrawEther"`
 */
export const useWatchWithdrawalsReceiveWithdrawEtherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'ReceiveWithdrawEther'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchWithdrawalsRoleAdminChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'RoleAdminChanged'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchWithdrawalsRoleGrantedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'RoleGranted'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchWithdrawalsRoleRevokedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'RoleRevoked'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"SetRouter"`
 */
export const useWatchWithdrawalsSetRouterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'SetRouter'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"SetStakeTogether"`
 */
export const useWatchWithdrawalsSetStakeTogetherEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'SetStakeTogether'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchWithdrawalsTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchWithdrawalsUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchWithdrawalsUpgradedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'Upgraded'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link withdrawalsAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchWithdrawalsWithdrawEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: withdrawalsAbi,
  eventName: 'Withdraw'
})
