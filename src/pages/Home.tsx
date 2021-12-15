import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Description from '../components/Description';
import Container from '../components/Container';
import FeaturedVuilders from '../components/FeaturedVuilders';
import TwitterAllFeed from '../components/TwitterAllFeed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIHOST } from '../config';
import styled from 'styled-components';
import Table from '../components/Table';

function Home() {
    let header = ['Token id', 'Fan address', 'Type', 'Price'];
    let [body, setBody] = useState<Array<Array<string>>>([]);

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

    useEffect(() => {
        setDefaultVal();
    }, []);

    let FlexDiv = styled.div`
        display: flex;
        margin-top: 5vh;
    `;

    return (
        <>
            <Navbar></Navbar>
            <Title>ViteClout</Title>
            <Container>
                <Description></Description>
                <FeaturedVuilders></FeaturedVuilders>
                <FlexDiv>
                    <TwitterAllFeed></TwitterAllFeed>
                    <Container>
                        <Table body={body} head={header}></Table>
                    </Container>
                </FlexDiv>
            </Container>
        </>
    );
}

export default Home;
