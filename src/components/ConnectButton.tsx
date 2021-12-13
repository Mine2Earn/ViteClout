import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { APIHOST } from '../config';
import styled from 'styled-components';

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

export default function ConnectButton() {
    const { isLoggedIn } = useContext(UserContext);
    if (isLoggedIn)
        return (
            <StyledButton
                className="left"
                onClick={() => {
                    window.location.href = `${APIHOST}/auth/logout`;
                }}
            >
                Logout
            </StyledButton>
        );
    return (
        <StyledButton
            className="left"
            onClick={() => {
                window.location.href = `${APIHOST}/auth/twitter`;
            }}
        >
            Connect with Twitter
        </StyledButton>
    );
}
