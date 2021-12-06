import axios from 'axios';
import { useRef } from 'react';

/**
 * TODO: Should modify it with viteConnect
 */
export default function LinkWallet({ toggle }: { toggle: () => void }) {
    const address: any = useRef(null);

    const handleSubmit = () => {
        if (address.current.value !== null) {
            axios.post('http://localhost:3001/auth/twitter/link', { vite: address.current.value }, { withCredentials: true }).then(() => {
                toggle();
            });
        }
    };

    return (
        <>
            <div>
                <h1>Link Wallet</h1>
                <input type="text" ref={address} />
                <button onClick={handleSubmit}>Link</button>
            </div>
        </>
    );
}
