import styled from 'styled-components';

const StyledTitle = styled.h1`
    font-size: 4em;
    text-align: center;
    ${(p: { padding?: string }) => (p.padding ? `padding: ${p.padding}` : '')};
`;

const StyledTitle2 = styled.h2`
    font-size: 2.5em;
    text-align: center;
    ${(p: { padding?: string }) => (p.padding ? `padding: ${p.padding}` : '')};
`;

export default function Title(props: { children: any; size?: number; padding?: string }) {
    if (props.size === 2) {
        return <StyledTitle2 padding={props.padding}>{props.children}</StyledTitle2>;
    } else {
        return <StyledTitle padding={props.padding}>{props.children}</StyledTitle>;
    }
}
