import { useState } from 'react';
import { wallet } from '@vite/vitejs';
import styled from 'styled-components';
import { APIHOST } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StyledSearch = styled.input`
    width: 24em;
    height: 80%;
`;

export default function SearchBar(props: { onSearch: Function }) {
    const navigate = useNavigate();

    const onSubmit = e => {
        if (e.code === 'Enter') {
            const input = e.target.value;
            if (wallet.isValidAddress(input)) {
                axios
                    .get(`${APIHOST}/vuilders/tagfromaddress?address=${input}`)
                    .then(res => {
                        navigate(`/vuilder/${res.data.twitter_tag}`);
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error('No vuilder found');
                    });
            } else {
                navigate(`/vuilder/${input.replace('@', '')}`);
            }
        }
    };

    return (
        <div>
            <StyledSearch type="text" name="search-query" id="search-query" onKeyDown={onSubmit} placeholder="Search by vuilder name / fan address and press enter" />
        </div>
    );
}
