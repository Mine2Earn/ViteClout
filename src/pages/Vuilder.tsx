import styled from 'styled-components';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import ProfileDescription from '../components/ProfileDescription';
import ProfilePicture from '../components/ProfilePicture';
import Title from '../components/Title';
import TokenInfo from '../components/VFTHistory';
import VFTButton from '../components/VFTButton';
import VuilderInfo from '../components/VuilderInfo';

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
                            <ColumnFlexStartContainer>
                                <VuilderInfo></VuilderInfo>
                                <ProfileDescription twttag={props.twttag}></ProfileDescription>
                            </ColumnFlexStartContainer>
                            <ColumnFlexContainer>
                                <VFTButton>Buy</VFTButton>
                                <VFTButton sell={true}>Sell</VFTButton>
                            </ColumnFlexContainer>
                        </FlexContainerStart>
                    </Container>
                    <Container padding={'10px'} bgcolor={'#292F34'} mtop={'20px'} mright={'none'}>
                        <TokenInfo></TokenInfo>
                    </Container>
                </Container>
                <Container mleft={'25px'}>
                    <FloatRight>
                        <a className="twitter-timeline" data-width="500" data-height="500" data-theme="dark" href="https://twitter.com/elonmusk?ref_src=twsrc%5Etfw">
                            Tweets by elonmusk
                        </a>
                    </FloatRight>
                </Container>
            </FlexContainer>
        </>
    );
}
