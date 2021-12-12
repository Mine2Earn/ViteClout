import { useContext } from 'react';
import styled from 'styled-components';
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
                    {userInfo.user.displayName} @{userInfo.user.username}
                </Title>
                <FlexCtn>
                    <LW>
                        <Container bgcolor={'#292F34'}>
                            <p>Type: Vuilder</p>
                            <ProfilePicture twttag={`@${userInfo.user.username}`}></ProfilePicture>
                            <ProfileDescription twttag={`@${userInfo.user.username}`}></ProfileDescription>
                        </Container>
                    </LW>
                    <div>
                        <Container bgcolor={'#292F34'}>
                            <TokenBalance></TokenBalance>
                        </Container>
                    </div>
                </FlexCtn>
            </>
        );
    } else {
        return <></>;
    }
}
