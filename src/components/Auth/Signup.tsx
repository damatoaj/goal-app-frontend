import axios from 'axios';
import React, { FormEvent, useRef } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import { User } from '../../interfaces/user.model';

type signupProps = {
    handleAuth: ( user:User ) => void;
}

const Signup:React.FC<signupProps> = (props) => {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    
    const submitHandler = async (e:FormEvent) => {
        e.preventDefault();
        const enteredUserName = usernameInputRef.current!.value.trim();
        const enteredEmail = emailInputRef.current!.value.trim();
        const enteredPassword = passwordInputRef.current!.value.trim();
        try {
            const resp = await axios.post(`${process.env.REACT_APP_URL}/signup`, {name:enteredUserName, email:enteredEmail, password:enteredPassword});
            localStorage.setItem('jwtToken', resp.data.token);
            setAuthToken(resp.data.token)
            props.handleAuth(resp.data.user);
        } catch (err) {
            console.log(`⛔️ Rutro:\n`, err)
        };
    };

    return(
        <form onSubmit={submitHandler}>
            <fieldset>
                <label htmlFor="name">User name</label>
                <input type="text" name="name" ref={usernameInputRef} />
                <br></br>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" ref={emailInputRef} />
                <br></br>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={passwordInputRef} />
                <br></br>
                <button type="submit" className="landing-btn update">Signup</button>
            </fieldset>
        </form>
    )
}

export default Signup;