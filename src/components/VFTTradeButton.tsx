import { useContractPrice } from '../hooks/useQueryContract';
import VFTButton, { ACTION } from './VFTButton';

export default function VFTTradeButton(props: { type: ACTION; tokenId: string }) {
    const [buyPrice, sellPrice] = useContractPrice(props.tokenId);

    if (props.type === ACTION.BUY) {
        return (
            <VFTButton type={props.type} price={buyPrice} tokenId={props.tokenId}>
                {buyPrice !== -1 ? `Buy for ${buyPrice / Math.pow(10, 18)} $VITE` : "Can't be bought"}
            </VFTButton>
        );
    } else {
        return (
            <VFTButton type={props.type} price={sellPrice} tokenId={props.tokenId}>
                {sellPrice !== -1 ? `Sell for ${sellPrice / Math.pow(10, 18)} $VITE` : "Can't be sold"}
            </VFTButton>
        );
    }
}
