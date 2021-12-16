import styled from 'styled-components';
import { useVCMint, useVCSign, useVCTrade } from '../hooks/useViteConnect';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { APIHOST } from '../config';

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
                const buyLoad = toast.loading('Accept transaction on your phone');
                buy(props.price)
                    .then(res => {
                        console.log(res);
                        toast.dismiss(buyLoad);
                        toast.success('Successfully bought VFT');
                        axios.get(`${APIHOST}/refreshDB`);
                    })
                    .catch(err => {
                        console.error(err);
                        toast.dismiss(buyLoad);
                        toast.error('Failed to buy VFT, are you connected?');
                    });
                break;
            case ACTION.SELL:
                const sealLoad = toast.loading('Accept transaction on your phone');
                sell(props.price)
                    .then(res => {
                        console.log(res);
                        toast.dismiss(sealLoad);
                        toast.success('Successfully sold VFT');
                        axios.get(`${APIHOST}/refreshDB`);
                    })
                    .catch(err => {
                        console.error(err);
                        toast.dismiss(sealLoad);
                        toast.error('Failed to sell VFT, are you connected?');
                    });
                break;
            case ACTION.MINT:
                const mintLoad = toast.loading('Accept transaction on your phone');
                mint()
                    .then(res => {
                        console.log(res);
                        toast.dismiss(mintLoad);
                        toast.success('Successfully minted VFT');
                        axios.get(`${APIHOST}/refreshDB`);
                    })
                    .catch(err => {
                        console.error(err);
                        toast.dismiss(mintLoad);
                        toast.error('Failed to mint VFT, are you connected?');
                    });
                break;
            case ACTION.SIGN:
                toast('Accept on your phone, it might take few seconds', {
                    icon: '⚙️'
                });
                sign('Hello').then(res => {
                    console.log(res);
                    toast.success('Successfully signed');
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
