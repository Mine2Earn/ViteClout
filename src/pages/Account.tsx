import { useContext } from 'react';
import styled from 'styled-components';
import ConnectButton from '../components/ConnectButton';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import ProfileDescription from '../components/ProfileDescription';
import ProfilePicture from '../components/ProfilePicture';
import Title from '../components/Title';
import TokenBalance from '../components/TokenBalance';
import { UserContext } from '../context/UserContext';

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

    console.log(userInfo);

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
                            <TokenBalance address="vite_8dbacfdd1d1b178632b8aa5c2bd73d9f49e514ff56a81cedfc"></TokenBalance>
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
