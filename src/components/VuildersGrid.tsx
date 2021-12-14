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

//TODO: Add modal who expand the grid
export default function VuildersGrid({ vuilders }: { vuilders: string[] }) {
    const components = vuilders.map(vuilder => {
        return <VuilderBlock twttag={vuilder}></VuilderBlock>;
    });

    return (
        <>
            <StyledGrid>{components}</StyledGrid>
            <Expand>View more</Expand>
        </>
    );
}
