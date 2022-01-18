import React, { FormEvent} from 'react';
import PerfList from './PerfList';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Outcome} from '../../interfaces/outcomeGoals.model';

import "react-datepicker/dist/react-datepicker.css";

type perfProps = {
    performances: Performance [];
    setOutcomes: (arg: Outcome[]) => void;
    delete: (e: FormEvent, id:string, setO:Function, setA:Function, aid:string) => void;
    ogID : String;
    setActive: (arg:Outcome)=> void;
    active: Outcome;
}

const Perf: React.FC <perfProps> = (props) => {
    console.log(props, 'performance')
    let list = props.performances.map((performance:Performance,key:number) => {
        return (
            <PerfList
                key={key}
                performance={performance} 
                delete={props.delete} 
                setOutcomes={props.setOutcomes} 
                ogID={props.ogID}
                setActive={props.setActive}
                active={props.active}
            />
        )
    })
    return (
        <>
            {list.length >= 0 ? list : <></>}
        </>
    )
};

export default Perf;