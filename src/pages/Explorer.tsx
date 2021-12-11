import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Description from '../components/Description';
import Container from '../components/Container';
import FeaturedVuilders from '../components/FeaturedVuilders';
import SearchBar from '../components/Search';
import Table from '../components/Table';
import styled from 'styled-components';
import { wallet } from '@vite/vitejs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIHOST } from '../config';

const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 1em;
`;

const Subtitle = styled.h3`
    margin: 0.4em;
    margin-left: 0px;
`;

function Explorer() {
    let header = ['Token id', 'Fan address', 'Type', 'Price'];
    let [body, setBody] = useState<Array<Array<string>>>([]);

    let tokenH = ['Token id', 'Buy price', 'Number of Holders', 'Token sold'];
    let tokenB = [
        ['@elonmusk', '12.4 $VITE', '122', '234'],
        ['@ekazukii', '137 $VITE', '276', '512'],
        ['@obstinatem', '0.003 $VITE', '0', '0']
    ];

    let setDefaultVal = () => {
        axios
            .get(`${APIHOST}/transactions/last`)
            .then(res => {
                if (res.data.result) {
                    const results = res.data.result;

                    const __body = results.map(result => {
                        return ['@elonmusk', result.holder, result.type ? 'BUY' : 'SELL', `${result.amount}@${result.price} $VITE`];
                    });
                    console.log(__body);
                    setBody([...body, ...__body]);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    let getTransactionByHolder = address => {
        axios
            .get(`${APIHOST}/transactions/all?holder=${address}`)
            .then(res => {
                if (res.data.result) {
                    const results = res.data.result;

                    const __body = results.map(result => {
                        return ['@elonmusk', address, result.type ? 'BUY' : 'SELL', `${result.amount}@${result.price} $VITE`];
                    });
                    setBody(__body);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        setDefaultVal();
    }, []);

    const onSearch = query => {
        if (wallet.isValidAddress(query)) {
            getTransactionByHolder(query);
        } else {
            console.log('twt tag');
            //TODO: Query transactions of VFT
        }
    };
    const onChange = e => {
        let sort = e.target.value;
        // TODO: Query the backend to get sorted VFT
    };

    return (
        <>
            <Navbar></Navbar>
            <Title size={2}>Public Dashboard</Title>
            <Container bgcolor={'#292F34'} padding="1.6em">
                <FlexDiv>
                    <Subtitle>Transactions explorer</Subtitle>
                    <SearchBar onSearch={onSearch}></SearchBar>
                </FlexDiv>
                <Table head={header} body={body}></Table>
            </Container>

            <Container bgcolor={'#292F34'} padding="1.6em" mtop="1.6em">
                <FlexDiv>
                    <Subtitle>Tokens explorer</Subtitle>
                    <label htmlFor="sort">Sort by :</label>
                    <select name="sort" id="sort" onChange={onChange}>
                        <option value="holder">Number of holder</option>
                        <option value="price">Buy price</option>
                        <option value="sold">Token solded</option>
                    </select>
                </FlexDiv>
                <Table head={tokenH} body={tokenB}></Table>
            </Container>
        </>
    );
}

export default Explorer;
