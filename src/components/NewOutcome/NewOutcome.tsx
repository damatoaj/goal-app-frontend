import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OutcomeForm from './OutcomeForm';
import {Outcome} from '../../interfaces/outcomeGoals.model';

import PerformanceForm from './PerformanceForm';
import SelectOutcome from './SelectOutcome';

const NewOutcome: React.FC = () => {
    const [oc, setOc] = useState<Outcome | null>(null);
    const [outcomes, setOutcomes] = useState<Outcome[]>([]);

    useEffect(()=> {
        (async ()=> {
           const resp : any =  await axios.get('http://localhost:3000/outcomes');
           const data : Outcome [] = await resp.data;
           setOutcomes(data);
        })()
    }, []);

    if (!oc) {
        return (
            <main>
                <h1>{outcomes.length < 1 ? 'Make your first Outcome Goal': 'Make A New Outcome Goal'}</h1>
                <OutcomeForm setOc={setOc}  oc={oc} />
                {outcomes.length > 0 ? <SelectOutcome outcomes={outcomes} setOc={setOc} text={'Or edit a current goal'}/> : <></>}
            </main>
        )
    } else{
        return(
            <main>
                <SelectOutcome outcomes={outcomes} setOc={setOc} text={'Select a different goal'} />
                <h1>{oc.description}</h1>
                <OutcomeForm setOc={setOc}  oc={oc}/>
                {oc.performanceGoals.length > 0 ? <h2>Add more performance goals...</h2> : <h2>Add a Performance Goal</h2>}
                <PerformanceForm id={oc._id} setOc={setOc} />
            </main>
        )
    }
};

export default NewOutcome;