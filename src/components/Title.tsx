import styled from 'styled-components';

const StyledTitle = styled.h1`
    font-size: 4em;
    text-align: center;
`;

const StyledTitle2 = styled.h2`
    font-size: 2.5em;
    text-align: center;
`;

export default function Title(props: { children: any; size?: number }) {
    if (props.size == 2) {
        return <StyledTitle2>{props.children}</StyledTitle2>;
    } else {
        return <StyledTitle>{props.children}</StyledTitle>;
    }
}
