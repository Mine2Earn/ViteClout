import styled from 'styled-components';
import VuilderBlock from './VuilderBlock';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;

const Expand = styled.small`
    float: right;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

export default function VuildersGrid() {
    return (
        <>
            <StyledGrid>
                <VuilderBlock></VuilderBlock>
                <VuilderBlock></VuilderBlock>
                <VuilderBlock></VuilderBlock>
                <VuilderBlock></VuilderBlock>
                <VuilderBlock></VuilderBlock>
            </StyledGrid>
            <Expand>View more</Expand>
        </>
    );
}
