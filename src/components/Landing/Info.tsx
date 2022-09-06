import React, { MouseEvent } from 'react';
import { Article } from '../../interfaces/article.model';

type infoProp = {
    content: Article;
    handlePrev: (e:MouseEvent)=> void;
    handleNext: (e:MouseEvent)=> void;
}

const Info:React.FC <infoProp> = (props) => {
    return (
        <section className="infoContainer">
            <article key={props.content.id}>
                <h2 className={props.content.title.includes('Golz') ? 'banner' : ''}>{props.content.title}</h2>
                <p>
                    {props.content.p1}
                    {props.content.p2}
                    {props.content.p3}
                </p>
            </article>
            <span>
                <button onClick={props.handlePrev}>Previous</button>
                <button onClick={props.handleNext}>Next</button>
            </span>
        </section>
    )
}

export default Info;