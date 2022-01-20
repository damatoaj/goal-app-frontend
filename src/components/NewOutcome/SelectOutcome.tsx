import React from 'react';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type outcomesProps = {
    outcomes: Outcome [];
    setOc: (arg:Outcome | null) => void;
    text:string;
};

const SelectOutcome: React.FC <outcomesProps> = (props) => {
    let options = props.outcomes.map((outcome: Outcome, id:number)=> {
        return (
            <option key={id} value={outcome.description}>{outcome.description}</option>
        )
    });

    const handleSelect = (idx:number, outcomes:Outcome[], setO:Function) => {
        let arr = outcomes.filter(outcome => outcomes.indexOf(outcome) +1 === idx);
        setO(arr[0]);
    };

    return (
        <span>
            <h2>{props.text}</h2>
            <select defaultValue='' onChange={(e)=> handleSelect(e.target.options.selectedIndex, props.outcomes, props.setOc)} name='oc'>
                <option value='' disabled hidden>Select</option>
                {options}
            </select>
            { props.text !== 'Or edit a current goal' ?
                <button onClick={()=>props.setOc(null)} className="landing-btn">New Goal</button>
                :
                <></>
            }
        </span>
    )
};

export default SelectOutcome;