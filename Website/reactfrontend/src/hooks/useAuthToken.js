import { useState, useEffect } from 'react';

const useAuthToken = () => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return { authToken };
};

export default useAuthToken;
