import React, { MouseEvent, useRef } from 'react';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type liProps = {
    id : number;
    description: string;
    handleActive: (e:MouseEvent)=> void;
    delete: (e:MouseEvent)=> void;
    active: Outcome;
}

const OutcomeLi: React.FC <liProps> = (props) => {
    const btn = useRef<HTMLButtonElement>(null);
    
    if (btn.current && btn.current.value === props?.active?.description) {
        btn.current.className = 'activeBtn';
    } else if (btn.current && btn.current.value !== props.active.description) {
        btn.current.className= "";
    }
    return(
        <li id="outcome-li">
            <button onClick={props.handleActive} name={props.id.toString()} value={props.description} ref={btn}>{props.description}</button>
            <button className="delete-circle warning" onClick={props.delete}  name={props.active?._id}>x</button>
        </li>
    )
};

export default OutcomeLi;