import axios from 'axios';
import React, { FormEvent, useRef } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import { User } from '../../interfaces/user.model';
import useSignup from '../../hooks/useSignup';


const Signup:React.FC = () => {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const { signup, error, isLoading} = useSignup();

    const submitHandler = async (e:FormEvent) => {
        e.preventDefault();
        const enteredUserName = usernameInputRef.current!.value.trim();
        const enteredEmail = emailInputRef.current!.value.trim();
        const enteredPassword = passwordInputRef.current!.value.trim();
       
        signup({ user: enteredUserName, email:  enteredEmail, password: enteredPassword })


    };

    return(
        <form onSubmit={submitHandler}>
            <fieldset>
                <label htmlFor="name">User name</label>
                <input type="text" name="name" ref={usernameInputRef} required />
                <br></br>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" ref={emailInputRef} required />
                <br></br>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={passwordInputRef} required />
                <br></br>
                <button type="submit" className="landing-btn update">Signup</button>
                {error && <p>{error}</p>}
                {isLoading && <p>{isLoading}</p>}
            </fieldset>
        </form>
    )
}

export default Signup;