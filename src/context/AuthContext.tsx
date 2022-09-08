import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '../interfaces/user.model'

interface AuthContextInterface {
    user: User;
    authIsReady: boolean;
    dispatch: any;
};

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload.user, token: action.payload.token }
        case 'LOGOUT':
            return { authIsReady: false, user: null, token : null }
        case 'AUTH_IS_READY':
            return { user: action.payload.user, authIsReady: true }
    };
};

export const AuthContextProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });

    useEffect(()=> {
        console.log('useEffect')

    }, []);

    console.log('Authcontext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )


}