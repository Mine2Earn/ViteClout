import { ViteAPI, accountBlock as accountBlockUtils } from '@vite/vitejs';
import WS_RPC from '@vite/vitejs-ws';
import { useContext, useEffect, useState } from 'react';
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

export function useVCTrade(VFTId: string) {
    const connector: VCConnector = useContext(VCContext);

    let buy = async price => {
        if (!connector.connected) return Promise.reject('ViteConnect no connected');

        console.log('price is ' + price);

        let myAccountBlock = createAccountBlock('callContract', {
            address: connector.accounts[0],
            abi: ABI,
            methodName: 'buyVFT',
            toAddress: CONTRACT_ADDRESS,
            tokenId: 'tti_5649544520544f4b454e6e40',
            amount: price.toString(),
            params: [VFTId]
        }).setProvider(provider);

        let log = await myAccountBlock.autoSetPreviousAccountBlock();

        console.log('autoSet', log);

        return connector.sendCustomRequest({
            method: 'vite_signAndSendTx',
            params: [{ block: myAccountBlock.accountBlock }]
        });
    };

    let sell = async price => {
        if (!connector.connected) return Promise.reject('ViteConnect no connected');

        console.log('price is ' + price);

        let myAccountBlock = createAccountBlock('callContract', {
            address: connector.accounts[0],
            abi: ABI,
            methodName: 'sellVFT',
            toAddress: CONTRACT_ADDRESS,
            params: [VFTId]
        }).setProvider(provider);

        let log = await myAccountBlock.autoSetPreviousAccountBlock();

        console.log('autoSet', log);

        return connector.sendCustomRequest({
            method: 'vite_signAndSendTx',
            params: [{ block: myAccountBlock.accountBlock }]
        });
    };

    return [buy, sell];
}

export function useVCConnect() {
    let [connected, setConnected] = useState(false);
    const connector: VCConnector = useContext(VCContext);

    connector.on('connect', (err, payload) => {
        if (err) {
            console.error(err);
        }
        setConnected(true);
    });

    connector.on('disconnect', err => {
        if (err) {
            console.error(err);
        }
        setConnected(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => (connector.connected ? setConnected(true) : setConnected(false)), []);

    return connected;
}
