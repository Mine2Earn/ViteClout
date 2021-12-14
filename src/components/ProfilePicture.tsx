import styled from 'styled-components';

const StyledImage = styled.img`
    width: ${(p: { size?: string }) => (p.size ? p.size : '150px')};
    height: ${(p: { size?: string }) => (p.size ? p.size : '150px')};
`;

//TODO: Connect to profile picture endpoint
export default function ProfilePicture(props: { twttag: string; size?: string }) {
    return (
        <>
            <StyledImage src="https://via.placeholder.com/150" alt={`profile picture of ${props.twttag}`} size={props.size} />
        </>
    );
}
