import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { APIHOST } from '../config';

const Desc = styled.div`
    margin: 10px 20px;
`;

//TODO: Connect to profile picture endpoint
export default function ProfileDescription(props: { twttag: string; size?: string }) {
    const [bio, setBio] = useState('LE NULLOS IS A PAS DE BIO');

    useEffect(() => {
        axios
            .get(`${APIHOST}/vuilders/infofromtwt?twitter_tag=["${props.twttag}"]`)
            .then(res => {
                if (res.status === 200 && res.data.message === 'Ok') {
                    if (!res.data.vuilders.length) return;
                    setBio(res.data.vuilders[0].bio);
                }
            })
            .catch(console.error);
    }, [props.twttag]);
    return (
        <Desc>
            <cite>{bio}</cite>
        </Desc>
    );
}
