import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 1em;
    background-color: ${(p: { sell?: boolean }) => (p.sell ? '#dc3545' : '#28a745')};
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    white-space: nowrap;

    &:hover {
        cursor: pointer;
    }
`;

export default function VFTButton(props: { sell?: boolean; children: any }) {
    return <StyledButton sell={props.sell}>{props.sell ? 'Sell 1 for 0.003 $VITE' : 'Buy 1 for 0.012 $VITE'}</StyledButton>;
}
