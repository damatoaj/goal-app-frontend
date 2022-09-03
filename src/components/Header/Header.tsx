import React from 'react';
import {User} from '../../interfaces/user.model';

import AuthHeader from './AuthHeader';

type headerProps = {
    user: User | null;
}

const Header:React.FC <headerProps> = (props) => {
    if(props.user) {
        return    <AuthHeader user={props.user} />
    } else {
       return <></>
    }
};

export default Header;