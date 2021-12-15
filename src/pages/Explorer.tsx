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
    let tokenH = ['Token id', 'Buy price', 'Circulating Supply', 'Number of Transactions'];

    let [body, setBody] = useState<Array<Array<string>>>([]);
    let [tokenB, setTokenB] = useState<Array<Array<string>>>([]);

    let setDefaultVal = () => {
        axios
            .get(`${APIHOST}/transactions/last`)
            .then(res => {
                if (res.data.result) {
                    const results = res.data.result;

                    const __body = results.map(result => {
                        return ['@' + result.twitter_tag, result.holder, result.type ? 'BUY' : 'SELL', `${result.amount}@${result.price / Math.pow(10, 18)} $VITE`];
                    });

                    setBody(__body);
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
                        return ['@' + result.twitter_tag, address, result.type ? 'BUY' : 'SELL', `${result.amount}@${result.price / Math.pow(10, 18)} $VITE`];
                    });

                    setBody(__body);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    let getAddressByTag = async (twttag: string): Promise<string | undefined> => {
        try {
            const res = await axios.get(`${APIHOST}/vuilders/addressfromtag?twitter_tag=${twttag}`);
            return res.data?.address;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    /**
     * Fetch all transactions of a specific token and update the react state
     * @param twitterTag - The twitter tag of the Vuilder
     */
    let getTransactionByTag = async (twitterTag: string) => {
        try {
            // We get the vite address from the Vuilder twitter tag
            const address = await getAddressByTag(twitterTag);
            if (!address) return;
            const response = await axios.get(`${APIHOST}/transactions/getfromtokenid?token_id=${address}`);
            const results = response.data.result;

            const _body = results.map(result => {
                return ['@' + result.twitter_tag, result.holder, result.type ? 'BUY' : 'SELL', `${result.amount}@${result.price / Math.pow(10, 18)} $VITE`];
            });

            setBody(_body);
        } catch (error) {
            console.error(error);
        }
    };

    let getTokensInfo = async (sort: string) => {
        try {
            const response = await axios.get(`${APIHOST}/transactions/getalltokeninfo?orderBy=${sort}`);
            const results = response.data.result;

            const _tokenB = results.map(result => {
                return ['@' + result.twitter_tag, `${result.buyPrice} $VITE`, result.circulating_supply, result.numberSell];
            });

            setTokenB(_tokenB);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setDefaultVal();
        getTokensInfo('holders');
    }, []);

    const onSearch = query => {
        if (wallet.isValidAddress(query)) {
            getTransactionByHolder(query);
        } else {
            getTransactionByTag(query);
        }
    };
    const onChange = e => {
        let sort = e.target.value;
        getTokensInfo(sort);
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
                        <option value="holders">Number of holder</option>
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
