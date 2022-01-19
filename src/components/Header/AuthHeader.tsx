import React from 'react';
import { User } from '../../interfaces/user.model';
import { Link } from 'react-router-dom';

type authHeaderProps = {
    user: User;
    logoutHandler: () => void;
};

const AuthHeader: React.FC <authHeaderProps> = (props) => {
    return (
        <>
            <header>
                <h3>
                    Welcome {props.user.name}
                </h3>
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/newOutcome'>Outcome Goals</Link>
                    <Link to="/" onClick={props.logoutHandler}>Logout</Link>
                </nav>
            </header>
            
        </>
    )
};

export default AuthHeader;