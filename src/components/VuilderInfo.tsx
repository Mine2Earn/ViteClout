import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { APIHOST } from '../config';
import { useContractReserve } from '../hooks/useQueryContract';

const StyledP = styled.p`
    margin: 3px;
`;

const StyledWord = styled.span`
    font-weight: bold;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 15px;
    justify-self: flex-start;
`;

export default function VuilderBlock({ twttag, address }: { twttag: string; address: string | undefined }) {
    let [data, setData] = useState({ followers: 0, following: 0 });
    let [reserve] = useContractReserve(address || '');

    useEffect(() => {
        console.log('HEY FREROT');
        axios
            .get(`${APIHOST}/vuilders/twitterinfo?twitter_tag=${twttag}`)
            .then(res => {
                if (res.status === 200 && res.data.message === 'Ok') {
                    setData({ followers: res.data.follow_count, following: res.data.followed_count });
                }
            })
            .catch(console.error);
    }, [twttag]);

    return (
        <FlexContainer>
            <StyledP>
                <StyledWord>{data.followers}</StyledWord> Followers - <StyledWord>{data.following}</StyledWord> Following - <StyledWord>{1000 - reserve}</StyledWord>{' '}
                Coins circulating
            </StyledP>
        </FlexContainer>
    );
}
