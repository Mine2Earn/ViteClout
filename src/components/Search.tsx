import { useState } from 'react';
import styled from 'styled-components';

const StyledSearch = styled.input`
    width: 24em;
    height: 2.5em;
`;

export default function SearchBar(props: { onSearch: Function }) {
    let [query, setQuery] = useState('');

    return (
        <div>
            <StyledSearch type="text" name="search-query" id="search-query" placeholder="Search by vuilder name / fan address" />
        </div>
    );
}
