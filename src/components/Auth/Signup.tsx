import React, { FormEvent, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './auth.css';

import { emailValidation, passwordDescription, emailDescription } from '../../utils/regex';

const Signup:React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const { signup, error, isLoading} = useAuth();

    const submitHandler = async (e:FormEvent) => {
        e.preventDefault();
        const enteredUserName = usernameInputRef.current!.value.trim();
        const enteredEmail = emailInputRef.current!.value.trim();
        const enteredPassword = passwordInputRef.current!.value.trim();
       
        signup({ name: enteredUserName, email:  enteredEmail, password: enteredPassword })
    };

    return(
        <form onSubmit={submitHandler}>
            <fieldset>
                <label htmlFor="name">User name</label>
                <input 
                    type="text" 
                    name="name" 
                    ref={usernameInputRef} 
                    required
                    disabled={isLoading ? true : false}
                    placeholder='    '
                />
                <br></br>
                <label htmlFor="email">Email</label>
                <input
                    disabled={isLoading ? true : false}
                    type="email" 
                    name="email" 
                    ref={emailInputRef} 
                    pattern={`${emailValidation}`} 
                    className='email'
                    title={emailDescription}
                    placeholder="me@example.com"
                    required
                />
                <br></br>
                <label htmlFor="password">Password</label>
                <input 
                    disabled={isLoading ? true : false}
                    type={showPassword ? 'text': 'password'} 
                    name="password" 
                    ref={passwordInputRef} 
                    className='password'
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    title={passwordDescription}
                    placeholder="8 characters long"
                    required
                />
                <span>
                    <input className='checkbox' type='checkbox' onClick={()=> setShowPassword(!showPassword)} />
                    <i>Show Password</i>
                </span>
                <br></br>
                <button 
                    type="submit" 
                    disabled={isLoading ? true : false}
                    className="go"
                >
                    Signup
                </button>
                <button 
                    type='reset' 
                    className='warning'
                    disabled={isLoading ? true : false}
                >
                    Clear
                </button>
                {error && <p className="error">{error}</p>}
                {isLoading && <p>{isLoading}</p>}
            </fieldset>
        </form>
    )
}

export default Signup;