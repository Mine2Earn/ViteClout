import styled from 'styled-components';
import ConnectButton from './ConnectButton';

const StyledNavbar = styled.nav`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    display: flex;
    justify-content: center;

    .left  {
        margin-left: auto;
    }
    background-color: #04111d;
`;

export default function Navbar() {
    return (
        <StyledNavbar>
            <p>Hey</p>
            <p>Search</p>
            <ConnectButton />
        </StyledNavbar>
    );
}
