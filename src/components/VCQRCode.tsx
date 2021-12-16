import { useContext, useEffect, useState } from 'react';
import { VCContext } from '../App';
import QRCode from 'qrcode.react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: white;
    width: 50%;
    height: 50%;
    padding: 2rem 0;
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
            <Container>
                <QRCode value={URI} />
            </Container>
        );
    }

    return <></>;
}
