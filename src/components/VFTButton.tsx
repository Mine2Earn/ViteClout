import styled from 'styled-components';
import { useVCMint, useVCSign, useVCTrade } from '../hooks/useViteConnect';

export enum ACTION {
    BUY,
    SELL,
    MINT,
    SIGN
}

type StyledProps = {
    type: number;
    children?: any;
    price?: number;
    tokenId?: string;
};

const StyledButton = styled.button`
    padding: 1em;
    background-color: ${(p: { bgType: ACTION }) => (p.bgType === ACTION.SELL ? '#dc3545' : p.bgType === ACTION.BUY ? '#28a745' : '#00A7FF')};
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

export default function VFTButton(props: StyledProps) {
    let sign = useVCSign();
    let mint = useVCMint();
    //@ts-ignore
    let [buy, sell] = useVCTrade(props.tokenId);

    let onClick = () => {
        switch (props.type) {
            case ACTION.BUY:
                buy(props.price)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.error(err);
                    });
                break;
            case ACTION.SELL:
                sell(props.price)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.error(err);
                    });
                break;
            case ACTION.MINT:
                mint().then(res => {
                    console.log(res);
                });
                break;
            case ACTION.SIGN:
                sign('Hello').then(res => {
                    console.log(res);
                });
                break;
        }
    };

    return (
        <StyledButton bgType={props.type} onClick={onClick}>
            {props.children}
        </StyledButton>
    );
}
