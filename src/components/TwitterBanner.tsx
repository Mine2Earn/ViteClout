import styled from 'styled-components';

type BannerProps = {
    width?: string;
    height?: string;
};

const StyledImage = styled.img`
    width: ${(p: BannerProps) => (p.width ? p.width : '225px')};
    height: ${(p: BannerProps) => (p.height ? p.height : '75px')};
`;

export default function ProfilePicture(props: { width?: string; height?: string; twttag: string }) {
    return (
        <>
            <StyledImage src="https://via.placeholder.com/150" alt={`profile picture of ${props.twttag}`} width={props.width} height={props.height} />
        </>
    );
}
