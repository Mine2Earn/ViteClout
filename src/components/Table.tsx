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
    const listHeader = props.head.map(title => <StyledTH>{title}</StyledTH>);
    const bodyElem = props.body.map(row => {
        return (
            <StyledRow>
                {row.map(el => (
                    <td>{el}</td>
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
