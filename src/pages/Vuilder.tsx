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
import { useVuilderAddress } from '../hooks/useVuilder';
import badge from '../Twitter_Verified_Badge.svg';
import { useState, useEffect } from 'react';
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

const BadgeSize = styled.img`
    margin-left: 15px;
    width: 30px;
`;

//TODO: Add the twitter banner of the account
export default function Vuilder(props: { twttag: string }) {
    const address = useVuilderAddress(props.twttag.replace('@', ''));
    const [isVuilder, setIsVuilder] = useState(false);
    const [isRealVuilder, setIsRealVuilder] = useState(true);
    const [vuilderInfo, setVuilderInfo] = useState({ twitter_name: 'loading' });

    useEffect(() => {
        axios.get(`${APIHOST}/vuilders/isvuilder?twitter_tag=${props.twttag.replace('@', '')}`).then(res => {
            setIsVuilder(res.data.isVuilder);
        });

        axios
            .get(`${APIHOST}/vuilders/infofromtwt?twitter_tag=["${props.twttag.replace('@', '')}"]`)
            .then(res => {
                console.log('VUILDER INFO', res.data);
                setVuilderInfo(res.data.vuilders[0]);
            })
            .catch(err => {
                console.log(err);
                setIsRealVuilder(false);
            });
    }, []);

    if (!isRealVuilder) {
        return (
            <>
                <Navbar />
                <Title size={2}>This Vuilder doesnt exist</Title>
            </>
        );
    }

    if (!vuilderInfo)
        return (
            <>
                <Navbar />
                <Title size={2}>Loading...</Title>
            </>
        );

    return (
        <>
            <Navbar></Navbar>
            <Title size={2}>
                {vuilderInfo.twitter_name} - {props.twttag.replace('@', '')}
                {!!isVuilder && <BadgeSize src={badge} />}
            </Title>

            <FlexContainer>
                <Container mright={'none'} mleft={'none'}>
                    <Container padding={'10px'} bgcolor={'#292F34'} mright={'none'}>
                        <FlexContainerStart>
                            <ProfilePicture twttag={props.twttag.replace('@', '')} size={'150px'}></ProfilePicture>
                            <FlexContainerStart>
                                <ColumnFlexContainer>
                                    <VuilderInfo twttag={props.twttag.replace('@', '')} address={address}></VuilderInfo>
                                    <ProfileDescription twttag={props.twttag.replace('@', '')}></ProfileDescription>
                                </ColumnFlexContainer>
                                <ColumnFlexContainer>
                                    <VFTTradeButton type={ACTION.BUY} tokenId={address || ''}></VFTTradeButton>
                                    <VFTTradeButton type={ACTION.SELL} tokenId={address || ''}></VFTTradeButton>
                                </ColumnFlexContainer>
                            </FlexContainerStart>
                        </FlexContainerStart>
                    </Container>
                    <Container padding={'10px'} bgcolor={'#292F34'} mtop={'20px'} mright={'none'}>
                        <TokenInfo address={address}></TokenInfo>
                    </Container>
                </Container>
                <Container mleft={'25px'}>
                    <FloatRight>
                        <TwitterFeed twttag={props.twttag.replace('@', '')}></TwitterFeed>
                    </FloatRight>
                </Container>
            </FlexContainer>
        </>
    );
}
