import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ConnectButton from '../components/ConnectButton';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import ProfileDescription from '../components/ProfileDescription';
import ProfilePicture from '../components/ProfilePicture';
import Title from '../components/Title';
import TokenBalance from '../components/TokenBalance';
import { UserContext } from '../context/UserContext';
import { APIHOST } from '../config';
import Table from '../components/Table';

const FlexCtn = styled.div`
    display: flex;
    justify-content: center;
`;

const LW = styled.div`
    width: 50%;
`;

const RW = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
`;

export default function Account() {
    let userInfo = useContext(UserContext);
    const address = 'vite_8dbacfdd1d1b178632b8aa5c2bd73d9f49e514ff56a81cedfc';

    let header = ['Token id', 'Type', 'Price'];
    let [body, setBody] = useState<Array<Array<string>>>([]);

    console.log(userInfo);

    let getTransactionByHolder = address => {
        axios
            .get(`${APIHOST}/transactions/all?holder=${address}`)
            .then(res => {
                if (res.data.result) {
                    const results = res.data.result;

                    const __body = results.map(result => {
                        return ['@' + result.twitter_tag, result.type ? 'BUY' : 'SELL', `${result.amount}@${result.price / Math.pow(10, 18)} $VITE`];
                    });

                    setBody(__body);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        getTransactionByHolder(address);
    }, []);

    if (userInfo.isLoggedIn && userInfo.user) {
        return (
            <>
                <Navbar></Navbar>
                <Title size={2}>
                    {userInfo.user.displayName} @{userInfo.user.twitter_tag}
                </Title>
                <FlexCtn>
                    <LW>
                        <Container bgcolor={'#292F34'}>
                            <p>Type: Vuilder</p>
                            <ProfilePicture twttag={`@${userInfo.user.twitter_tag}`}></ProfilePicture>
                            <button>CHANGE PROFILE PICTURE</button>
                            <ProfileDescription twttag={`@${userInfo.user.twitter_tag}`}></ProfileDescription>
                            <button>CHANGE DESCRIPTION</button>
                        </Container>
                    </LW>
                    <div>
                        <Container bgcolor={'#292F34'}>
                            <TokenBalance address={address}></TokenBalance>
                            <Table head={header} body={body}></Table>
                        </Container>
                    </div>
                </FlexCtn>
            </>
        );
    } else {
        // TODO: Show account of user connected with ViteConnect
        return (
            <>
                <ConnectButton></ConnectButton>
            </>
        );
    }
}
