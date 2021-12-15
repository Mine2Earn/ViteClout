import styled from 'styled-components';
import ConnectButton from './ConnectButton';
import Search from './Search';
import { Link } from 'react-router-dom';

const StyledNavbar = styled.nav`
    padding: 0 5%;
    font-size: 1.5em;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .left  {
        margin-left: auto;
    }

    background-color: #04111d;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin: 0 1em;

    &:hover {
        text-decoration: underline;
    }
`;

const StyledP = styled.p`
    color: #00a7ff;
`;

export default function Navbar() {
    return (
        <>
            <StyledNavbar>
                <StyledP>ViteClout</StyledP>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/account">Account</StyledLink>
                <StyledLink to="/explorer">Explorer</StyledLink>
                <Search onSearch={() => {}} />
                <ConnectButton />
            </StyledNavbar>
        </>
    );
}
