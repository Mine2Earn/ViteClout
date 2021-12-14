import { ViteAPI, abi, wallet } from '@vite/vitejs';
import { useEffect, useState } from 'react';
import WS_RPC from '@vite/vitejs-ws';
import { OFF_CHAIN_CODE, ABI, CONTRACT_ADDRESS, RPC } from '../config';

const provider = new ViteAPI(new WS_RPC(RPC, 60000), test => {
    console.log(test);
});

export function useContractPrice(tokenId) {
    let [buyPrice, setBuyPrice] = useState(-1);
    let [sellPrice, setSellPrice] = useState(-1);

    useEffect(() => {
        if (!wallet.isValidAddress(tokenId)) return;

        let contractBuyCall = abi.encodeFunctionCall(ABI, [tokenId], 'getBuyPrice');
        let contractSellCall = abi.encodeFunctionCall(ABI, [tokenId], 'getSellPrice');

        provider
            .request('contract_callOffChainMethod', {
                address: CONTRACT_ADDRESS,
                offChainCode: OFF_CHAIN_CODE,
                data: Buffer.from(contractBuyCall, 'hex').toString('base64')
            })
            .then(res => {
                const decoded = abi.decodeParameters(['uint256'], Buffer.from(res, 'base64').toString('hex'));
                if (decoded && typeof decoded[0] === 'string' && parseInt(decoded[0])) {
                    setBuyPrice(parseInt(decoded[0]));
                }
            })
            .catch(err => {
                console.error(err);
            });

        provider
            .request('contract_callOffChainMethod', {
                address: CONTRACT_ADDRESS,
                offChainCode: OFF_CHAIN_CODE,
                data: Buffer.from(contractSellCall, 'hex').toString('base64')
            })
            .then(res => {
                const decoded = abi.decodeParameters(['uint256'], Buffer.from(res, 'base64').toString('hex'));
                if (decoded && typeof decoded[0] === 'string' && parseInt(decoded[0])) {
                    setSellPrice(parseInt(decoded[0]));
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [tokenId]);

    return [buyPrice, sellPrice];
}

export function useContractBalance(tokenId, holderId) {
    let [balance, setBalance] = useState(-1);

    useEffect(() => {
        if (!wallet.isValidAddress(tokenId)) return;

        let contractBuyCall = abi.encodeFunctionCall(ABI, [tokenId, holderId], 'getBalance');
        provider
            .request('contract_callOffChainMethod', {
                address: CONTRACT_ADDRESS,
                offChainCode: OFF_CHAIN_CODE,
                data: Buffer.from(contractBuyCall, 'hex').toString('base64')
            })
            .then(res => {
                const decoded = abi.decodeParameters(['uint256'], Buffer.from(res, 'base64').toString('hex'));

                if (decoded && typeof decoded[0] === 'string' && parseInt(decoded[0])) {
                    setBalance(parseInt(decoded[0]));
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [tokenId, holderId]);

    return [balance];
}

export function useContractReserve(tokenId: string) {
    let [reserve, setReserve] = useState(-1);

    useEffect(() => {
        if (!wallet.isValidAddress(tokenId)) return;

        let contractBuyCall = abi.encodeFunctionCall(ABI, [tokenId], 'getReserve');
        provider
            .request('contract_callOffChainMethod', {
                address: CONTRACT_ADDRESS,
                offChainCode: OFF_CHAIN_CODE,
                data: Buffer.from(contractBuyCall, 'hex').toString('base64')
            })
            .then(res => {
                const decoded = abi.decodeParameters(['uint256'], Buffer.from(res, 'base64').toString('hex'));

                if (decoded && typeof decoded[0] === 'string' && parseInt(decoded[0])) {
                    setReserve(parseInt(decoded[0]));
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [tokenId]);

    return [reserve];
}
