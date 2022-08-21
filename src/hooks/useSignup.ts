import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

interface SignupForm {
    user: string;
    email: string;
    password: string; 
}

const useSignup = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { dispatch } = useAuthContext();

    const signup = async (form : SignupForm) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/signup`, form);
            if (!response) throw new Error('Could not complete signup');

            if(!isCanceled) {
                localStorage.setItem('jwtToken', response.data.token);
                dispatch({ type: 'LOGIN', payload: response.data.user })
                setError('');
                setIsLoading(false);
            }
        } catch (err: any) {
            if (!isCanceled) {
                setError(err.message);
                setIsLoading(false);
            }
        }
    }

    useEffect(()=> {
        return () => setIsCanceled(true);
    }, []);

    return { signup, error, isLoading }
};

export default useSignup;