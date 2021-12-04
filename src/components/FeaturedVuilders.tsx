import VuilderBlock from "./VuilderBlock";
import styled from 'styled-components';

const VuildersGrid = styled.div`
    display: grid;
    grid-template-columns: 100px 100px 100px 100px;
    grid-template-rows: 100px;
`;

export default function Title(props: any) {
    return(
        <VuildersGrid>
            <VuilderBlock></VuilderBlock>
            <VuilderBlock></VuilderBlock>
            <VuilderBlock></VuilderBlock>
            <VuilderBlock></VuilderBlock>
        </VuildersGrid>
    )
}