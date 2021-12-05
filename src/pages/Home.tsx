import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Description from '../components/Description';
import Container from '../components/Container';
import FeaturedVuilders from '../components/FeaturedVuilders';

function Home() {
    return (
        <>
            <Navbar></Navbar>
            <Title>ViteClout</Title>
            <Container>
                <Description></Description>
                <FeaturedVuilders></FeaturedVuilders>
            </Container>
        </>
    );
}

export default Home;
