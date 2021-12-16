import Home from './pages/Home';
import Vuilder from './pages/Vuilder';
import { useState, useEffect } from 'react';
import { UserContext, IUser } from './context/UserContext';
import axios from 'axios';
import Connector from '@vite/connector';
import React from 'react';
import { APIHOST } from './config';
import Account from './pages/Account';
import Explorer from './pages/Explorer';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

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
    const [user, setUser] = useState<IUser>();

    const fetchAPI = async () => {
        try {
            const user = await axios.get(`${APIHOST}/auth/success`, { withCredentials: true });
            setUser(user.data.user);
            setIsLoggedIn(true);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    const Middle = () => {
        const { tag } = useParams();
        if (tag) {
            return <Vuilder twttag={tag} />;
        } else {
            return <Vuilder twttag="ElonMusk" />;
        }
    };

    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} />
            <VCContext.Provider value={connector}>
                <UserContext.Provider value={{ isLoggedIn, user }}>
                    <div className="App">
                        <Router>
                            <Routes>
                                <Route path="/vuilder/:tag" element={<Middle />} />
                                <Route path="/account" element={<Account />} />
                                <Route path="/explorer" element={<Explorer />} />
                                <Route path="*" element={<Home />} />
                            </Routes>
                        </Router>
                    </div>
                </UserContext.Provider>
            </VCContext.Provider>
        </>
    );
}

export default App;
