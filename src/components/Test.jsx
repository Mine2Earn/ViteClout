import { useContext } from 'react';
import { VCContext } from '../App';
import { useContractPrice, useContractReserve, useContractBalance } from '../hooks/useQueryContract';

export default function Test() {
    let connector = useContext(VCContext);
    const [balance] = useContractBalance(
        'vite_8dbacfdd1d1b178632b8aa5c2bd73d9f49e514ff56a81cedfc',
        connector.accounts[0] || 'vite_8dbacfdd1d1b178632b8aa5c2bd73d9f49e514ff56a81cedfc'
    );

    const [buyPrice] = useContractPrice('vite_8dbacfdd1d1b178632b8aa5c2bd73d9f49e514ff56a81cedfc');

    return (
        <p>
            {buyPrice} {balance}
        </p>
    );
}
