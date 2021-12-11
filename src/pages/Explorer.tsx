import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Description from '../components/Description';
import Container from '../components/Container';
import FeaturedVuilders from '../components/FeaturedVuilders';
import SearchBar from '../components/Search';
import Table from '../components/Table';

function Explorer() {
    let header = ['Token id', 'Fan address', 'Type', 'Price'];
    let body = [
        ['@elonmusk', 'vite_3enxysg12823', 'BUY', '3@45$VITE'],
        ['@elonmusk', 'vite_3enxysg12823', 'BUY', '3@45$VITE'],
        ['@elonmusk', 'vite_3enxysg12823', 'BUY', '3@45$VITE']
    ];
    const onSearch = () => {};

    return (
        <>
            <Navbar></Navbar>
            <Title size={2}>Tokens Explorer</Title>
            <Container bgcolor={'#292F34'} padding="1.6em">
                <h3>Transactions explorer</h3>
                <SearchBar onSearch={onSearch}></SearchBar>
                <Table head={header} body={body}></Table>
            </Container>
        </>
    );
}

export default Explorer;
