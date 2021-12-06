import Home from './pages/Home';
import Vuilder from './pages/Vuilder';
import { useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import LinkWallet from './components/LinkWallet';
import { useModal } from './hooks/useModal';
import axios from 'axios';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [isShowing, toggle]: any[] = useModal();

    const fetchAPI = async () => {
        try {
            const user = await axios.get('http://localhost:3001/auth/success', { withCredentials: true });
            setUser(user.data.user);
            setIsLoggedIn(true);
            const { status } = await axios.get('http://localhost:3001/auth/twitter/islinked', { withCredentials: true });
            if (status === 202) {
                toggle();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, user }}>
            {isShowing && <LinkWallet toggle={toggle} />}
            <div className="App">
                <Vuilder twttag="@elonmusk"></Vuilder>
            </div>
        </UserContext.Provider>
    );
}

export default App;
