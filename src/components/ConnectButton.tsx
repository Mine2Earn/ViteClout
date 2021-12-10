import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { APIHOST } from '../config';

export default function ConnectButton() {
    const { isLoggedIn } = useContext(UserContext);
    if (isLoggedIn)
        return (
            <a className="left" href="#">
                Logout
            </a>
        );
    return (
        <a className="left" href={`${APIHOST}/auth/twitter`}>
            Connect with twitter
        </a>
    );
}
