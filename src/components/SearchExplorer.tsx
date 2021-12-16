import styled from 'styled-components';

const StyledSearch = styled.input`
    margin-left: 30px;
    width: 24em;
    height: 80%;
    border: none;
    background-color: #202225;
    padding: 1em 2em;
    border-radius: 6px;
    color: #8a939b;
`;

export default function SearchBar(props: { onSearch: Function }) {
    const onSubmit = (e: any) => {
        if (e.code === 'Enter') props.onSearch(e.target.value);
    };

    return (
        <div>
            <StyledSearch type="text" name="search-query" id="search-query" onKeyDown={onSubmit} placeholder="Search by vuilder name / fan address" />
        </div>
    );
}
