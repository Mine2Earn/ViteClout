import styled from 'styled-components';

const StyledTable = styled.table<any>`
    width: 100%;
    border-collapse: collapse;
`;

const StyledTH = styled.th`
    text-align: left;
`;

const StyledRow = styled.tr`
    border-top: 1px solid white;
    height: 2em;
`;

export default function Table(props: { head: Array<string>; body: Array<Array<string>> }) {
    const listHeader = props.head.map((title, index) => <StyledTH key={index}>{title}</StyledTH>);
    const bodyElem = props.body.map((row, index) => {
        return (
            <StyledRow key={index}>
                {row.map((el, index2) => (
                    <td key={index2}>{el}</td>
                ))}
            </StyledRow>
        );
    });

    return (
        <StyledTable>
            <thead>{listHeader}</thead>
            <tbody>{bodyElem}</tbody>
        </StyledTable>
    );
}
