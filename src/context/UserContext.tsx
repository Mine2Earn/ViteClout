import { createContext } from 'react';

export type IUser = {
    displayName: 'string';
    id: string;
    photos: Array<any>;
    username: string;
    _json: any;
    _raw: any;
};

export type IUserContext = {
    isLoggedIn: boolean;
    user?: IUser;
};

export const UserContext = createContext<IUserContext>({
    isLoggedIn: false
});
