import { useState } from 'react';

export const useModal = (defValue?: boolean) => {
    const [isShowing, setIsShowing] = useState(defValue || false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return [isShowing, toggle];
};
