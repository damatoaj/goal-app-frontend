import React from 'react';
import { User } from '../../interfaces/user.model';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

type authHeaderProps = {
    user: User;
};

const AuthHeader: React.FC <authHeaderProps> = (props) => {
    const { logout } = useAuth();

    return (
        <>
            <header>
                <h3>
                    Welcome {props.user.name}
                </h3>
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/newOutcome'>Outcome Goals</Link>
                    <Link to="/" onClick={logout}>Logout</Link>
                </nav>
            </header>
            
        </>
    )
};

export default AuthHeader;