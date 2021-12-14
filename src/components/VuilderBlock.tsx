import styled from 'styled-components';
import Container from './Container';
import ProfilePicture from './ProfilePicture';
import { useNavigate } from 'react-router-dom';

const StyledBlock = styled.div`
    text-align: center;
`;

const StyledButton = styled.button`
    padding: 1em;
    background-color: #00a7ff;
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    white-space: nowrap;
    height: 3rem;
    width: auto;
    &:hover {
        cursor: pointer;
    }
`;

export default function VuilderBlock({ twttag }: { twttag: string }) {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/vuilder/${twttag}`);
    };

    return (
        <Container bgcolor={'#292F34'} mleft="5%" mright="5%" padding="2%">
            <StyledBlock>
                <p>@{twttag}</p>
                <ProfilePicture twttag={twttag}></ProfilePicture>
                <p>
                    <StyledButton onClick={onClick}>Learn more</StyledButton>
                </p>
            </StyledBlock>
        </Container>
    );
}
