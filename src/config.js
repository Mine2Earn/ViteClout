export const RPC = 'wss://buidl.vite.net/gvite/ws';

export const ABI = [
    {
        constant: true,
        inputs: [{ name: 'vftid', type: 'address' }],
        name: 'getSellPrice',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'offchain'
    },
    { constant: false, inputs: [], name: 'mint', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' },
    {
        constant: true,
        inputs: [{ name: 'vftid', type: 'address' }],
        name: 'getReserve',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'offchain'
    },
    { constant: false, inputs: [{ name: 'vftid', type: 'address' }], name: 'buyVFT', outputs: [], payable: true, stateMutability: 'payable', type: 'function' },
    { constant: false, inputs: [{ name: 'vftid', type: 'address' }], name: 'sellVFT', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' },
    {
        constant: true,
        inputs: [{ name: 'vftid', type: 'address' }],
        name: 'getBuyPrice',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'offchain'
    },
    {
        constant: true,
        inputs: [
            { name: 'vftid', type: 'address' },
            { name: 'holder', type: 'address' }
        ],
        name: 'getBalance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'offchain'
    },
    { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'addr', type: 'address', result: 'vite_601d64d5005984f62fd0496d72e84a06e4dac246848fa3d66d' },
            { indexed: true, name: 'vftid', type: 'address', result: 'vite_601d64d5005984f62fd0496d72e84a06e4dac246848fa3d66d' },
            { indexed: false, name: 'value', type: 'uint256' },
            { indexed: false, name: 'tid', type: 'tokenId' }
        ],
        name: 'buyEvent',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'addr', type: 'address' },
            { indexed: true, name: 'vftid', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
            { indexed: false, name: 'tid', type: 'tokenId' }
        ],
        name: 'sellEvent',
        type: 'event'
    },
    { anonymous: false, inputs: [{ indexed: true, name: 'addr', type: 'address' }], name: 'mintEvent', type: 'event' }
];

export const CONTRACT_ADDRESS = 'vite_158a908bd23c17b10eec856c37ca4eba6769e79d92b1c63501';

// prettier-ignore
export const OFF_CHAIN_CODE = '608060405260043610610066576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063039d68cc146100685780634037d0b2146100c25780638ea13bef1461011c578063da3038351461017657610066565b005b6100ac6004803603602081101561007f5760006000fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101f1565b6040518082815260200191505060405180910390f35b610106600480360360208110156100d95760006000fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff169060200190929190505050610210565b6040518082815260200191505060405180910390f35b610160600480360360208110156101335760006000fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff169060200190929190505050610266565b6040518082815260200191505060405180910390f35b6101db6004803603604081101561018d5760006000fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff169060200190929190803574ffffffffffffffffffffffffffffffffffffffffff169060200190929190505050610285565b6040518082815260200191505060405180910390f35b600061020482600061031e63ffffffff16565b905061020b565b919050565b6000600160005060008374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021600050549050610261565b919050565b600061027982600161031e63ffffffff16565b9050610280565b919050565b6000600060005060008474ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002160005060008374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021600050549050610318565b92915050565b60006000600160005060008574ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021600050546103e803905060018314156103e1576000600160005060008674ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff168152602001908152602001600021600050541115156103d457600091505061045c565b8080600101915050610447565b6103e8600160005060008674ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000216000505410151561043d57600091505061045c565b8080600190039150505b808102660aa87bee5380000291505061045c56505b9291505056fea165627a7a7230582046e9afbf9d3b8aa7ce19fe5527a36b3b9b27d9290e1d14e79796e7d01a1d0f170029';
