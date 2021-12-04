import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-right: 10%;
  margin-left: 10%;
`;

export default function Title(props: any) {
    return(
        <StyledDiv>{props.children}</StyledDiv>
    )
}