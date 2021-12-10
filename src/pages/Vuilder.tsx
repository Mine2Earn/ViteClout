import styled from 'styled-components';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import ProfileDescription from '../components/ProfileDescription';
import ProfilePicture from '../components/ProfilePicture';
import Title from '../components/Title';
import TokenInfo from '../components/VFTHistory';
import VFTButton, { ACTION } from '../components/VFTButton';
import VFTTradeButton from '../components/VFTTradeButton';
import VuilderInfo from '../components/VuilderInfo';
import TwitterFeed from '../components/TwitterFeed';
import TwitterBanner from '../components/TwitterBanner';
import VCQRCode from '../components/VCQRCode';

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

const ColumnFlexStartContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 15px;
`;

const FloatRight = styled.div`
    margin-left: auto;
`;

const Background = styled.div`
    background-color: black;
`;

//TODO: Add the twitter banner of the account
export default function Vuilder(props: { twttag: string }) {
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
                                    <VFTTradeButton type={ACTION.BUY} tokenId="vite_8dbacfdd1d1b178632b8aa5c2bd73d9f49e514ff56a81cedfc"></VFTTradeButton>
                                    <VFTTradeButton type={ACTION.SELL} tokenId="vite_8dbacfdd1d1b178632b8aa5c2bd73d9f49e514ff56a81cedfc"></VFTTradeButton>
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
                        <TwitterFeed></TwitterFeed>
                    </FloatRight>
                </Container>
            </FlexContainer>
            <VCQRCode></VCQRCode>
            <VFTButton type={ACTION.SIGN}>Sign</VFTButton>
            <VFTButton type={ACTION.MINT}>Mint</VFTButton>
        </>
    );
}
