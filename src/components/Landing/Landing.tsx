import React, {useState, MouseEvent} from 'react';
import { Article } from '../../interfaces/article.model';
import Content from './article.json';

import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Info from './Info';

//styles
import './landing.css'


const Landing:React.FC = () => {
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
                    <Login />
                </div>
        </main>
    )
};

export default Landing;