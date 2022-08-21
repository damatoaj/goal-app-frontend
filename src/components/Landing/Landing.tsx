import React, {useState, MouseEvent} from 'react';
import { User } from '../../interfaces/user.model';
import { Article } from '../../interfaces/article.model';
import Content from './article.json';

import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Info from './Info';

type landingProps = {
    handleAuth: (user:User)=> void;
}

const Landing:React.FC <landingProps>= (props) => {
    const [text, setText] = useState<Article>(Content[0]);
    const handleNext = (e:MouseEvent) => {
        text.id+1 < Content.length ? setText(prevText=> Content[prevText.id+1]) : setText(Content[0]);
    };

    const handlePrev = (e:MouseEvent) => {
        text.id-1 >= 0 ? setText(prevText => Content[prevText.id-1]) : setText(Content[Content.length-1]);
    };

    return (
        <main id="landing">
                <Info content={text} handleNext={handleNext} handlePrev={handlePrev} />
                <div>
                    <h2>Signup or Login</h2>
                    <Signup />
                    <Login handleAuth={()=>console.log('handleAuth')}/>
                </div>
        </main>
    )
};

export default Landing;