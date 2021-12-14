import styled from 'styled-components';
import Container from './Container';
import ProfilePicture from './ProfilePicture';

const StyledBlock = styled.div`
    text-align: center;
`;

//TODO: Button redirect to Vuilder's page
export default function VuilderBlock({ twttag }: { twttag: string }) {
    return (
        <Container bgcolor={'#292F34'}>
            <StyledBlock>
                <p>@twttag</p>
                <ProfilePicture twttag={twttag}></ProfilePicture>
                <p>
                    <button>Learn more</button>
                </p>
            </StyledBlock>
        </Container>
    );
}
