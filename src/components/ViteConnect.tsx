import Connector from '@vite/connector';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { utils } from '@vite/vitejs';
const { ed25519, _Buffer, blake2bHex } = utils;

export default function Test() {
    const [uri, setURI] = useState<string>('http://google.fr');

    useEffect(() => {
        let test = async () => {
            const connector = new Connector({
                bridge: 'wss://biforst.vite.net/' // Required
            });

            if (!connector.connected) {
                connector.createSession().then(() => {
                    console.log('connect uri', connector.uri);
                    setURI(connector.uri);
                }); // create new session
            }

            // Subscribe to connection events
            connector.on('connect', (error, payload) => {
                if (error) {
                    throw error;
                }

                // Get provided accounts and chainId
                const { accounts, chainId } = payload.params[0];
                console.log(accounts);

                /*
                connector
                    .sendCustomRequest({
                        method: 'vite_signMessage',
                        params: {
                            message: _Buffer.from('Hello World').toString('base64')
                        }
                    })
                    .then((idk: any) => {
                        console.log('CALLED');
                        console.log(idk);
                    });*/

                connector
                    .sendCustomRequest({
                        method: 'vite_signAndSendTx',
                        params: {
                            /*
                             * block should match the interface:
                               {
                                    toAddress: string;   // regular user address or contract address
                                    tokenId: string;
                                    amount: string;     // in atomic unit
                                    fee?: string;       // in atomic unit
                                    data? string;       // base64 string
                               }
                             * the field `data`, can be generate:
                             * 1. regular transfer, refer to https://vite.wiki/api/vitejs/accountBlock/utils.html#messagetodata
                             * 2. call contract method, use vitejs-utils and vitejs-abi, refer to https://github.com/vitelabs/bridge#example
                             */
                            block: {
                                accountAddress: 'vite_61404d3b6361f979208c8a5c442ceb87c1f072446f58118f68',
                                amount: '2000000000000000000',
                                data: 'c2FkZmFzZg==',
                                toAddress: 'vite_61404d3b6361f979208c8a5c442ceb87c1f072446f58118f68',
                                tokenId: 'tti_5649544520544f4b454e6e40'
                            }
                        }
                    })
                    .then((r: any) => {
                        console.log(r);
                    });
            });
        };

        test();
    }, []);

    return <QRCode value={uri} />;
}
