import React, {useRef} from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Process} from '../../interfaces/processGoals.models';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import ProcessGoal from './ProcessGoal';

type proProps = {
    performance: Performance;
    setOutcomes: (arg:Outcome[])=>void;
    setActive: (arg:Outcome) => void;
    active: Outcome;
    hidePro: Boolean;
    setHidePro: (arg:Boolean) => void ;
}

const ProcessList:React.FC <proProps> = (props) => {
    const btn = useRef<HTMLButtonElement>(null);
    const li = useRef<HTMLLIElement>(null);

    if (li.current && btn.current && props.hidePro) {
        btn.current.style.display="block";
        li.current.style.display="block";
    };
    if (li.current && btn.current && !props.hidePro) {
        btn.current.style.display="none";
        li.current.style.display="none";
    }
    let list = props.performance.processGoals.map((process: Process, i: number) => {
        return (
            <ProcessGoal 
                key={i}
                process={process} 
                setOutcomes={props.setOutcomes}
                setActive={props.setActive}
                active={props.active}
                hidePro={props.hidePro}
            />
        )
    });

    return(
        <li className="process-list" ref={li}>
            {list}
            <button id="hide-process-btn" ref={btn} onClick={()=> props.setHidePro(!props.hidePro)}>Hide Process Goals</button>
        </li>
    )
};

export default ProcessList;