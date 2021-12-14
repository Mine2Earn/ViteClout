import styled from 'styled-components';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import ProfileDescription from '../components/ProfileDescription';
import ProfilePicture from '../components/ProfilePicture';
import Title from '../components/Title';
import TokenInfo from '../components/VFTHistory';
import { ACTION } from '../components/VFTButton';
import VFTTradeButton from '../components/VFTTradeButton';
import VuilderInfo from '../components/VuilderInfo';
import TwitterFeed from '../components/TwitterFeed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIHOST } from '../config';

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const FlexContainerStart = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const ColumnFlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 15px;
`;

const FloatRight = styled.div`
    margin-left: auto;
`;

//TODO: Add the twitter banner of the account
export default function Vuilder(props: { twttag: string }) {
    const [address, setAddress] = useState('');

    useEffect(() => {
        axios
            .get(`${APIHOST}/vuilders/addressfromtag?twitter_tag=${props.twttag}`)
            .then(res => {
                if (res.status === 200 && res.data.message === 'Ok' && res.data.address) {
                    setAddress(res.data.address);
                }
            })
            .catch(console.error);
    });

    return (
        <>
            <Navbar></Navbar>
            <Title size={2}>Elon Musk - {props.twttag}</Title>

            <FlexContainer>
                <Container mright={'none'} mleft={'none'}>
                    <Container padding={'10px'} bgcolor={'#292F34'} mright={'none'}>
                        <FlexContainerStart>
                            <ProfilePicture twttag={props.twttag} size={'150px'}></ProfilePicture>
                            <FlexContainerStart>
                                <ColumnFlexContainer>
                                    <VuilderInfo></VuilderInfo>
                                    <ProfileDescription twttag={props.twttag}></ProfileDescription>
                                </ColumnFlexContainer>
                                <ColumnFlexContainer>
                                    <VFTTradeButton type={ACTION.BUY} tokenId={address}></VFTTradeButton>
                                    <VFTTradeButton type={ACTION.SELL} tokenId={address}></VFTTradeButton>
                                </ColumnFlexContainer>
                            </FlexContainerStart>
                        </FlexContainerStart>
                    </Container>
                    <Container padding={'10px'} bgcolor={'#292F34'} mtop={'20px'} mright={'none'}>
                        <TokenInfo></TokenInfo>
                    </Container>
                </Container>
                <Container mleft={'25px'}>
                    <FloatRight>
                        <TwitterFeed twttag={props.twttag}></TwitterFeed>
                    </FloatRight>
                </Container>
            </FlexContainer>
        </>
    );
}
