import { useState } from 'react';
import styled from 'styled-components';

const StyledSearch = styled.input`
    width: 24em;
    height: 80%;
`;

export default function SearchBar(props: { onSearch: Function }) {
    const onSubmit = e => {
        if (e.code === 'Enter') props.onSearch(e.target.value);
    };

    return (
        <div>
            <StyledSearch type="text" name="search-query" id="search-query" onKeyDown={onSubmit} placeholder="Search by vuilder name / fan address" />
        </div>
    );
}
