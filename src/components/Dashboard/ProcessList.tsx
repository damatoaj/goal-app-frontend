import React, {useRef} from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Process} from '../../interfaces/processGoals.models';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import ProcessGoal from './ProcessGoal';

type proProps = {
    performance: Performance;
}

const ProcessList:React.FC <proProps> = (props) => {
    const btn = useRef<HTMLButtonElement>(null);
    const li = useRef<HTMLLIElement>(null);

    // if (li.current && btn.current && props.hidePro) {
    //     btn.current.style.display="block";
    //     li.current.style.display="block";
    // };
    // if (li.current && btn.current && !props.hidePro) {
    //     btn.current.style.display="none";
    //     li.current.style.display="none";
    // }
    let list = props.performance.processGoals.map((process: Process) => {
        return (
            <ProcessGoal 
                key={process._id}
                process={process} 
                // setOutcomes={props.setOutcomes}
                // setActive={props.setActive}
                // active={props.active}
                // hidePro={props.hidePro}
            />
        )
    });

    return(
        <li ref={li}>
            {list}
            <button id="hide-process-btn" ref={btn} onClick={()=>console.log('click')}>Hide Process Goals</button>
        </li>
    )
};

export default ProcessList;