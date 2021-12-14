import styled from 'styled-components';
import Container from './Container';
import ProfilePicture from './ProfilePicture';
import { useNavigate } from 'react-router-dom';

const StyledBlock = styled.div`
    text-align: center;
`;

export default function VuilderBlock({ twttag }: { twttag: string }) {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/vuilder/${twttag}`);
    };

    return (
        <Container bgcolor={'#292F34'}>
            <StyledBlock>
                <p>@{twttag}</p>
                <ProfilePicture twttag={twttag}></ProfilePicture>
                <p>
                    <button onClick={onClick}>Learn more</button>
                </p>
            </StyledBlock>
        </Container>
    );
}
