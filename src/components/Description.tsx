import styled from 'styled-components';

const StyledDesc = styled.p`
  font-size: 1.2em;
  text-align: justify;
`;

const StyledWord = styled.span`
    font-weight: bold;
`;

export default function Title(props: any) {
    return(
        <StyledDesc>Viteclout is a social network based on the vite ecosystem, content creators are called <StyledWord>Vuilders</StyledWord> and they can mint their own coin on the <StyledWord>vite blockchain</StyledWord> to sell them on the website. The content creators could create event only for the token holders</StyledDesc>
    )
}