import axios from 'axios';
import { useEffect, useState } from 'react';
import { APIHOST } from '../config';
import Table from './Table';

export default function TokenInfo({ address }: { address: string | undefined }) {
    const header = ['Fan address', 'Operation', 'Price'];
    const [body, setBody] = useState<Array<Array<string>>>([]);

    const refresh = async () => {
        const response = await axios.get(`${APIHOST}/transactions/getfromtokenid?token_id=${address}`);
        const results = response.data.result;

        const _body = results.map(result => {
            return [result.holder, result.type ? 'BUY' : 'SELL', `${result.amount}@${result.price / Math.pow(10, 18)} $VITE`];
        });

        setBody(_body);
    };

    useEffect(() => {
        if (address) refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    return <Table head={header} body={body}></Table>;
}
