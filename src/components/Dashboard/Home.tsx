import React, { useState, useRef, MouseEvent} from 'react';
import { Outcome } from '../../interfaces/outcomeGoals.model';
import { Link } from 'react-router-dom';


import OutcomeLi from './OutcomeLi';
import Display from './Display';

import useOutcome from '../../hooks/useOutcome';

const Dashboard: React.FC  = () => {
    // const [outcomes, setOutcomes] = useState<Outcome[]>([]);
    const { outcomes, error, isLoading, select, active, deleteOutcome } = useOutcome();
    // const [active, setActive] = useState<Outcome | null>(null);
    const [hidden, setHidden] = useState<Boolean>(false);
    const perfList = useRef<HTMLLIElement>(null);

    const handleHidden = (e: MouseEvent, h:Boolean) => {
        setHidden(!hidden);
        if (hidden && perfList.current) {
            perfList.current.style.display = 'block'
        } else if (!hidden && perfList.current) {
            perfList.current.style.display = 'none'
        }
    };

    const handleActive = (e: any) => {
        select(e.target.id)
    };




    

    return (
        <main id="dashboard">
            <div id="dash-col-1">
            <h3>Outcome Goals</h3>
            {outcomes.length > 0 ? (
                 <ul>
                 {outcomes.map((outcome: Outcome, idx:number) => {
                     return (
                         <OutcomeLi 
                             key={idx} 
                             id={outcome._id}
                             description={outcome.description} 
                             handleActive={handleActive} 
                             deleteOutcome={deleteOutcome} 
                             active={active}
                         />
                     )
                 })}
             </ul>
            ) : (
                <Link to='/outcomes/newOutcome'>Create your first Outcome Goal</Link>
            )}
           
            </div>
            <div id="dash-col-2">
                
                {active ? <Display active={active} /> : <></> }
                {active ?
                    <li className="perf-list" ref={perfList}> 
                        {/* <Perf 
                            performances={active.performanceGoals} 
                            setOutcomes={setOutcomes} 
                            delete={deletePerformance} 
                            ogID={active._id}
                            setActive={setActive}
                            active={active}
                        />  */}
                        <button onClick={(e)=> handleHidden(e, hidden)}>Hide Performance Goals</button>
                    </li>
                    :
                    <></>
                }
            </div>
        </main>
    )
};

export default Dashboard;