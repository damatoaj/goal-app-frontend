import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

interface SignupForm {
    name: string;
    email: string;
    password: string; 
}

interface LoginForm {
    email: string;
    password: string;
}

const useAuth = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { dispatch } = useAuthContext();

    const signup = async (form : SignupForm) => {
        setError('');
        setIsLoading(true);
        try {
            
            const response = await axios.post(`${process.env.REACT_APP_URL}/signup`, form);
            if (!response) throw new Error('Could not complete signup');

            if(!isCanceled) {
                dispatch({ type: 'LOGIN', payload: response.data })
                setError('');
                setIsLoading(false);
            }
        } catch (err: any) {
            if (!isCanceled) {
                setError(err.response.data);
                setIsLoading(false);
            }
        }
    };

    const login = async (form : LoginForm) => {
        setError('');
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/login`, form)

            if (!response) throw new Error('Could not complete login')
            if (!isCanceled) {
                dispatch({ type: 'LOGIN', payload: response.data});
                setError('');
                setIsLoading(false);
            }
        } catch (err: any) {
            if(!isCanceled) {
                setError(err.response.data);
                setIsLoading(false);
            }
        }
    };

    const logout = () => {
        setIsLoading(true);
        setError('');
        try {
            if(!isCanceled) {
                dispatch({ type: 'LOGOUT' });
                setIsLoading(false);
                setError('');
            }
        } catch (err: any) {
            if(!isCanceled) {
                setError('');
                setIsLoading(false);
            }
        }
    }

    useEffect(()=> {
        return () => setIsCanceled(true);
    }, []);

    return { signup, login, logout, error, isLoading }
};

export default useAuth;