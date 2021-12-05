import styled from 'styled-components';

const StyledP = styled.p`
    margin: 3px;
`;

const StyledWord = styled.span`
    font-weight: bold;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 15px;
    justify-self: flex-start;
`;

export default function VuilderBlock() {
    return (
        <FlexContainer>
            <StyledP>
                <StyledWord>238M</StyledWord> Followers - <StyledWord>12456</StyledWord> Tweets - <StyledWord>456</StyledWord> Coins circulating
            </StyledP>
        </FlexContainer>
    );
}
