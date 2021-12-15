import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { APIHOST } from '../config';

const StyledImage = styled.img`
    width: ${(p: { size?: string }) => (p.size ? p.size : '150px')};
    height: ${(p: { size?: string }) => (p.size ? p.size : '150px')};
`;

export default function ProfilePicture(props: { twttag: string; size?: string }) {
    const [imgSrc, setImgSrc] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        axios
            .get(`${APIHOST}/vuilders/infofromtwt?twitter_tag=["${props.twttag}"]`)
            .then(res => {
                if (res.status === 200 && res.data.message === 'Ok') {
                    if (!res.data.vuilders.length) return;
                    setImgSrc(res.data.vuilders[0].avatar);
                }
            })
            .catch(console.error);
    }, [props.twttag]);
    return (
        <>
            <StyledImage src={imgSrc} alt={`profile picture of ${props.twttag}`} size={props.size} />
        </>
    );
}
