import React, { FormEvent, useRef, useState} from 'react';
import { emailDescription, emailValidation } from '../../utils/regex';
import useAuth from '../../hooks/useAuth';
import './auth.css';

const Login:React.FC  = ( ) => {
    const [showPassword, setShowPassword] = useState(false);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const { login, error, isLoading } = useAuth();

    const submitHandler = async (e:FormEvent)=> {
        e.preventDefault();
        const enteredEmail = emailInputRef.current!.value.trim();
        const enteredPassword = passwordInputRef.current!.value.trim();

        login({ email: enteredEmail, password: enteredPassword})

    };

    return (
        <form onSubmit={submitHandler}>
            <fieldset>
                <label htmlFor="email">Email</label>
                <input 
                    disabled={isLoading ? true : false}
                    type="email" 
                    className="email"
                    name="email" 
                    ref={emailInputRef} 
                    title={emailDescription}
                    pattern={`${emailValidation}`}
                    required
                    placeholder='me@example.com'
                />
                <br></br>
                <label htmlFor="password">Password</label>
                <input 
                    type={showPassword? 'text' : 'password'} 
                    name="password"
                    placeholder='     '
                    ref={passwordInputRef} 
                    disabled={isLoading ? true : false}
                    required
                    className='password'
                />
                <span>
                    <input 
                        className='checkbox'
                        type='checkbox' 
                        onClick={()=> setShowPassword(!showPassword)} 
                        disabled={isLoading ? true : false}
                    />
                    <i>Show Password</i>
                </span>
                <br></br>
                <button 
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="go"
                >
                    Login
                </button>
                <button 
                    type='reset' 
                    className="warning"
                    disabled={isLoading ? true : false}
                >
                    Clear
                </button>
                {error && <p className="error">{error}</p>}
                {isLoading && <p>Loading...</p>}
            </fieldset>
        </form>
    )
}

export default Login;