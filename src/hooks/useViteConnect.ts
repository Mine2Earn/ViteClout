import { ViteAPI, accountBlock as accountBlockUtils } from '@vite/vitejs';
import HTTP_RPC from '@vite/vitejs-http';
import { useContext, useEffect, useState } from 'react';
import { VCContext, VCConnector } from '../App';
import { ABI, CONTRACT_ADDRESS } from '../config';
import { useContractBalance } from './useQueryContract';

const { createAccountBlock } = accountBlockUtils;

const provider = new ViteAPI(new HTTP_RPC('https://buidl.vite.net/gvite', 60000), test => {
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
    const account = useVCAccount();
    const [balance] = useContractBalance(VFTId, account);

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
        if (balance <= 0) return Promise.reject('Not enough VFT');

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

export function useVCAccount() {
    const connected = useVCConnect();
    const connector: VCConnector = useContext(VCContext);
    const [account, setAccount] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (connected) {
            setAccount(connector.accounts[0]);
        }
    }, [connected, connector.accounts]);

    return account;
}
