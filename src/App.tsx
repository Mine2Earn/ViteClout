import Home from './pages/Home';
import Vuilder from './pages/Vuilder';
import Connector from '@vite/connector';
import React from 'react';

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
    return (
        <VCContext.Provider value={connector}>
            <div className="App">
                <Vuilder twttag="@elonmusk"></Vuilder>
            </div>
        </VCContext.Provider>
    );
}

export default App;
