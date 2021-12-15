/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { APIHOST } from '../config';
import styled from 'styled-components';
import { useModal } from '../hooks/useModal';
import VCQRCode from '../components/VCQRCode';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useVCConnect } from '../hooks/useViteConnect';
import { VCContext } from '../App';
import toast from 'react-hot-toast';

const StyledButton = styled.button`
    padding: 1em;
    background-color: #00a7ff;
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    white-space: nowrap;
    height: 3rem;
    width: auto;
    &:hover {
        cursor: pointer;
    }

    margin-left: ${(p: { l?: boolean }) => (p.l ? 'auto' : 'none')};
`;

const Modal = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
`;

const ModalBox = styled.div`
    background-color: #04111d;
    min-width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    padding: 2rem;
    overflow-wrap: break-word;
`;

const CloseButton = styled.button`
    padding: 1em;
    margin-right: 2.5em;
    background-color: #dc3545;
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    white-space: nowrap;
    align-self: flex-end;

    &:hover {
        cursor: pointer;
    }
`;

export default function ConnectButton() {
    const [isShowing, toggle]: any = useModal();
    const { isLoggedIn } = useContext(UserContext);
    const [isLinked, setIsLinked] = useState(true);
    const connected = useVCConnect();
    const connector = useContext(VCContext);

    const fetchApi = async () => {
        try {
            const { status } = await axios.get(`${APIHOST}/auth/twitter/islinked`, { withCredentials: true });
            console.log(status);
            if (status === 202) {
                setIsLinked(false);
                toggle();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const linkWallet = () => {
        if (connected) {
            axios
                .post(
                    `${APIHOST}/auth/link`,
                    {
                        address: connector.accounts[0]
                    },
                    { withCredentials: true }
                )
                .then(() => {
                    toast.success('Successfully linked wallet');
                    setIsLinked(true);
                })
                .catch(() => {
                    toast.error('Failed to link wallet');
                });
        } else {
            toast.error('You must connect with vite connect first');
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <>
            {isShowing && (
                <Modal>
                    <ModalBox>
                        {isLinked && <CloseButton onClick={toggle}>Close</CloseButton>}
                        {!isLoggedIn ? (
                            <StyledButton
                                onClick={() => {
                                    window.location.href = `${APIHOST}/auth/twitter`;
                                }}
                            >
                                Connect with Twitter
                            </StyledButton>
                        ) : (
                            <StyledButton
                                onClick={() => {
                                    window.location.href = `${APIHOST}/auth/logout`;
                                }}
                            >
                                Logout
                            </StyledButton>
                        )}
                        {!connected && <p>Connect with Vite Connect</p>}
                        {connected && <p>You connected with address:</p>}
                        {connected && <p>{connector.accounts[0]}</p>}
                        <VCQRCode />
                        {!isLinked && <StyledButton onClick={linkWallet}>Link Wallet</StyledButton>}
                    </ModalBox>
                </Modal>
            )}
            <StyledButton onClick={toggle} l={true}>
                Connect
            </StyledButton>
        </>
    );
}
