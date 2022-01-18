import React, { MouseEvent } from 'react';
import {Link} from 'react-router-dom';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type displayProps = {
    active: Outcome;
    hidden: Boolean;
    handleHidden:(e:MouseEvent, h:Boolean) => void;
}

const Display: React.FC <displayProps> = (props) => {

    let date : Date = new Date(props.active.dateDue);
    return (
        <article id="dash-header">
            <h2>{props.active.description}</h2>
            <h3>Is it complete?</h3>
            <p>{props.active.complete ? 'Yes': 'No'}</p>
            <h3>Due on </h3>
            <p><time>{date.toLocaleString()}</time></p>
            <h3>How will you hold yourself accountable if you don't complete this by the due date?</h3>
            <p>{props.active.punishment}</p>
            <h3>How will you reward yourself when you accomplish this goal?</h3>
            <p>{props.active.reward}</p>
            { props.active.performanceGoals.length < 1 ?
                <Link to='/newOutcome'>Make Some Performance Goals</Link> :
                <button onClick={(e) => props.handleHidden(e, props.hidden)}>Show Performance Goals</button>
            }
        </article>
    )
};

export default Display