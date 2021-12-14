import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { APIHOST } from '../config';
import styled from 'styled-components';
import { useModal } from '../hooks/useModal';
import VCQRCode from '../components/VCQRCode';

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
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    padding: 2rem 0;
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

const Clear = styled.div`
    padding: 20px;
`;

export default function ConnectButton() {
    const [isShowing, toggle]: any = useModal();
    const { isLoggedIn } = useContext(UserContext);

    return (
        <>
            {isShowing && (
                <Modal>
                    <ModalBox>
                        <CloseButton onClick={toggle}>Close</CloseButton>
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
                        <p>Connect with Vite Connect</p>
                        <VCQRCode />
                    </ModalBox>
                </Modal>
            )}
            <StyledButton onClick={toggle}>Connect</StyledButton>
        </>
    );
}
