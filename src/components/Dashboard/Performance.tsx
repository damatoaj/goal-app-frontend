import React from 'react';
import PerfList from './PerfList';
import {Performance} from '../../interfaces/performanceGoals.model';

type perfProps = {
    performances: Performance [];
    delete: (id: string) => void;
    oId : string;
    update: (id: string, form : object) => void;
    error: string;
}

const Perf: React.FC <perfProps> = (props) => {
    let list = props.performances.map((performance:Performance,key:number) => {
        return (
            <PerfList
                key={key}
                performance={performance} 
                delete={props.delete} 
                oId={props.oId}
                update={props.update}
                error={props.error}
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