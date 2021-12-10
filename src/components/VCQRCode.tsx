import { useContext, useEffect, useState } from 'react';
import { VCContext } from '../App';
import QRCode from 'qrcode.react';

export default function VCQRCode() {
    const connector = useContext(VCContext);
    const [URI, setURI] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (!connector.connected) {
            console.log('[VCQRCode] Creating session');
            connector.createSession().then(() => {
                console.log('[VCQRCode] connect uri', connector.uri);
                setURI(connector.uri);
            });
        }

        connector.on('connect', (error, payload) => {
            if (error) {
                throw error;
            }

            console.log('Connected');
        });

        connector.on('session_request', (error, payload) => {
            if (error) {
                throw error;
            }
            // Get updated accounts and chainId
            console.log('session_request');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (URI) {
        return (
            <div>
                <QRCode value={URI} />
            </div>
        );
    }

    return <p>CRINGE</p>;
}
