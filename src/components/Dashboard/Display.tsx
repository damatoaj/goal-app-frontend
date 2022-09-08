import React from 'react';
import {Link} from 'react-router-dom';
import {Outcome} from '../../interfaces/outcomeGoals.model';

import './display.css';

type displayProps = {
    active: Outcome;
}

const Display: React.FC <displayProps> = (props) => {
    let date : Date = new Date(props.active.dateDue);

    return (
        <article id="dash-header">
            <Link to={`/outcomes/${props.active._id}`}>
                <h2 title="Click to see subgoals">{props.active.description}</h2>
            </Link>
            <h3>Is it complete?</h3>
            <p>{props.active.complete ? 'Yes': 'No'}</p>
            <h3>Due on </h3>
            <p><time>{date.toLocaleString()}</time></p>
            <h3>How will you hold yourself accountable if you don't complete this by the due date?</h3>
            <p>{props.active.punishment}</p>
            <h3>How will you reward yourself when you accomplish this goal?</h3>
            <p>{props.active.reward}</p>
        </article>
    )
};

export default Display