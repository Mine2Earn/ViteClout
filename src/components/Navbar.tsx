import styled from 'styled-components';

const StyledNavbar = styled.nav`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  display: flex;
  justify-content: center;

  .left {
    margin-left: auto;
  }
`;

export default function Navbar() {
  return(
      <StyledNavbar>
          <p>Hey</p>
          <p>Search</p>
          <p className="left">Login TWTICON - VCICON</p>
      </StyledNavbar>
    );
}