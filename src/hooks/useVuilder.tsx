import axios from 'axios';
import { useEffect, useState } from 'react';
import { APIHOST } from '../config';

export const useVuilderAddress = (username: string) => {
    const [address, setAddress] = useState<string | undefined>(undefined);

    useEffect(() => {
        axios
            .get(`${APIHOST}/vuilders/addressfromtag?twitter_tag=${username}`)
            .then(res => {
                if (res.status === 200 && res.data.message === 'Ok' && res.data.address) {
                    setAddress(res.data.address);
                }
            })
            .catch(console.error);
    }, [username]);

    return address;
};
