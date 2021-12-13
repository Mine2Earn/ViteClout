import Home from './pages/Home';
import Vuilder from './pages/Vuilder';
import { useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import LinkWallet from './components/LinkWallet';
import { useModal } from './hooks/useModal';
import axios from 'axios';
import Connector from '@vite/connector';
import React from 'react';
import { APIHOST } from './config';

export type VCConnector = {
    connected: boolean;
    uri: string;
    accounts: [string];
    sendCustomRequest: ({ method: string, params: [any] }) => Promise<any>;
    createSession: () => Promise<void>;
    on: (string, Function) => any;
};

const connector: VCConnector = new Connector({ bridge: 'wss://biforst.vite.net/' });

export const VCContext = React.createContext<VCConnector>(connector);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [isShowing, toggle]: any[] = useModal(false);

    const fetchAPI = async () => {
        try {
            const user: any = await axios.get(`${APIHOST}/auth/success`, { withCredentials: true });
            if (user.data.user.twitter_id) {
                console.log('Logged in');
                setUser(user.data.user);
                setIsLoggedIn(true);
            }
            const { status } = await axios.get(`${APIHOST}/auth/twitter/islinked`, { withCredentials: true });
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
        <VCContext.Provider value={connector}>
            <UserContext.Provider value={{ isLoggedIn, user }}>
                {isShowing && <LinkWallet toggle={toggle} />}
                <div className="App">
                    <Vuilder twttag="@elonmusk"></Vuilder>
                </div>
            </UserContext.Provider>
        </VCContext.Provider>
    );
}

export default App;
