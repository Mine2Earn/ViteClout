import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-size: 4em;
  text-align: center;
`;

export default function Title(props: any) {
    return(
        <StyledTitle>{props.children}</StyledTitle>
    )
}