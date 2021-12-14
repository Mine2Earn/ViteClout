import axios from 'axios';
import { useEffect, useState } from 'react';
import { APIHOST } from '../config';
import Table from './Table';

export default function TokenBalance(props: { address: string }) {
    const thead = ['Token id', 'Balance'];
    const [body, setBody] = useState<string[][]>([]);

    let fetchBalances = async () => {
        try {
            const res = await axios.get(`${APIHOST}/transactions/balances?holder=${props.address}`);
            const results = res.data.result;

            const _body = results.map(result => {
                return [result.token_id, result.amount];
            });

            setBody(_body);
        } catch (error) {}
    };

    useEffect(() => {
        fetchBalances();
    }, [props.address]);

    return <Table body={body} head={thead}></Table>;
}
