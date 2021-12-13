import styled from 'styled-components';
import axios from 'axios';
import { APIHOST } from '../config';
import VCQRCode from '../components/VCQRCode';
import VFTButton, { ACTION } from '../components/VFTButton';
import { useEffect, useContext, useState } from 'react';
import { VCContext } from '../App';
import { useVCConnect } from '../hooks/useViteConnect';

const Title = styled.h1`
    margin-top: 3rem;
`;

const Modal = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBox = styled.div`
    background-color: #04111d;
    width: 300px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    padding: 2rem 0;
`;

const Clear = styled.div`
    padding: 10px;
`;

const Para = styled.p`
    padding: 10%;
`;

export default function LinkWallet({ toggle }: { toggle: () => void }) {
    // if connected with viteconnect
    const connected = useVCConnect();
    const viteContext = useContext(VCContext);
    const [nonce, setNonce] = useState(undefined);
    console.log(connected);

    useEffect(() => {
        if (connected) {
            // Get Nonce
            axios
                .get(`${APIHOST}/auth/nonce?address=${viteContext.accounts[0]}`)
                .then(res => {
                    setNonce(res.data.nonce);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [connected]);

    const onSigned = (obj: any) => {
        console.log(obj);
        axios
            .post(`${APIHOST}/auth/nonce`, {
                signed: obj.signature,
                publicKey: obj.publicKey,
                address: viteContext.accounts[0]
            })
            .then(res => {
                console.log(res);
                toggle();
            })
            .catch(err => {
                console.log(err.response);
                console.log(err);
            });
    };

    return (
        <>
            <Modal>
                <ModalBox>
                    <Title>Link Wallet</Title>
                    <Para>Open your vite application and scan the QR code to connect.</Para>
                    <VCQRCode />
                    <Clear />
                    {connected && (
                        <VFTButton type={ACTION.SIGN} nonce={nonce} cb={onSigned}>
                            Sign
                        </VFTButton>
                    )}
                </ModalBox>
            </Modal>
        </>
    );
}
