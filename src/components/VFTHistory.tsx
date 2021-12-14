import styled from 'styled-components';

const StyledTable = styled.table`
    font-size: 1em;
    text-overflow: ellipsis;
    width: 100%;
`;

//TODO: Connect with the database
export default function TokenInfo() {
    return (
        <StyledTable>
            <thead>
                <th>Vite address</th>
                <th>Operation</th>
                <th>Amount</th>
            </thead>
            <tbody>
                <tr>
                    <td>vite_99bf4a247462870dd...</td>
                    <td>BUY</td>
                    <td>4@12.78 $VFT</td>
                </tr>
                <tr>
                    <td>vite_48895412bb0959e6...</td>
                    <td>BUY</td>
                    <td>1@9.45 $VFT</td>
                </tr>
                <tr>
                    <td>vite_99bf4a247462870dd...</td>
                    <td>SELL</td>
                    <td>1@9.45 $VFT</td>
                </tr>
                <tr>
                    <td>vite_83d2aac7f89f82793f...</td>
                    <td>BUY</td>
                    <td>4@6.93 $VFT</td>
                </tr>
            </tbody>
        </StyledTable>
    );
}
