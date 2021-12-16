import { useContext, useEffect, useState } from 'react';
import { VCContext } from '../App';
import QRCode from 'qrcode.react';
import styled from 'styled-components';

const BorderedDiv = styled.div`
    border: 20px solid white;
`;

export default function VCQRCode() {
    const connector = useContext(VCContext);
    const [URI, setURI] = useState<undefined | string>(undefined);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        if (!connector.connected) {
            console.log('[VCQRCode] Creating session');
            connector.createSession().then(() => {
                console.log('[VCQRCode] connect uri', connector.uri);
                setURI(connector.uri);
            });
        } else {
            setConnected(true);
        }

        connector.on('connect', (error, payload) => {
            if (error) {
                throw error;
            }
            setConnected(true);
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

    if (URI && !connected) {
        return (
            <BorderedDiv>
                <QRCode value={URI} />
            </BorderedDiv>
        );
    }

    return <></>;
}
