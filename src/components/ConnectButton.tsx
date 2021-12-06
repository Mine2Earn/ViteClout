import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function ConnectButton() {
    const { isLoggedIn } = useContext(UserContext);
    if (isLoggedIn)
        return (
            <a className="left" href="#">
                Logout
            </a>
        );
    return (
        <a className="left" href="http://localhost:3001/auth/twitter">
            Connect with twitter
        </a>
    );
}
