import { ViteAPI, accountBlock as accountBlockUtils } from '@vite/vitejs';
import WS_RPC from '@vite/vitejs-ws';
import { useContext } from 'react';
import { VCContext, VCConnector } from '../App';
import { ABI, CONTRACT_ADDRESS } from '../config';

const { createAccountBlock } = accountBlockUtils;

const provider = new ViteAPI(new WS_RPC('wss://buidl.vite.net/gvite/ws', 60000), test => {
    console.log(test);
});

export function useVCSign() {
    const connector: VCConnector = useContext(VCContext);

    return (message: string) => {
        if (!connector.connected) return Promise.reject('ViteConnect no connected');
        return connector.sendCustomRequest({
            method: 'vite_signMessage',
            params: [{ message: 'RW5jb2RlIHRoaXMgbWVzc2FnZSBwbHo=' }]
        });
    };
}

export function useVCMint() {
    const connector: VCConnector = useContext(VCContext);

    return async () => {
        if (!connector.connected) return Promise.reject('ViteConnect no connected');

        let myAccountBlock = createAccountBlock('callContract', {
            address: connector.accounts[0],
            abi: ABI,
            methodName: 'mint',
            toAddress: CONTRACT_ADDRESS,
            params: []
        }).setProvider(provider);

        let log = await myAccountBlock.autoSetPreviousAccountBlock();

        console.log('autoSet', log);

        return connector.sendCustomRequest({
            method: 'vite_signAndSendTx',
            params: [{ block: myAccountBlock.accountBlock }]
        });
    };
}

export function useVCTrade() {
    const connector: VCConnector = useContext(VCContext);

    let trade = async (forBuy: boolean, price: number) => {
        if (!connector.connected) return Promise.reject('ViteConnect no connected');

        let myAccountBlock = createAccountBlock('callContract', {
            address: connector.accounts[0],
            abi: ABI,
            methodName: 'mint',
            toAddress: CONTRACT_ADDRESS,
            params: []
        }).setProvider(provider);

        let log = await myAccountBlock.autoSetPreviousAccountBlock();

        console.log('autoSet', log);

        return connector.sendCustomRequest({
            method: 'vite_signAndSendTx',
            params: [{ block: myAccountBlock.accountBlock }]
        });
    };

    let buy = price => {
        return trade(true, price);
    };
    let sell = price => {
        return trade(false, price);
    };

    return [buy, sell];
}
