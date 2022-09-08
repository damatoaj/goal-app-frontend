import React, { useState } from 'react';
import OutcomeForm from './OutcomeForm';
import {Outcome} from '../../interfaces/outcomeGoals.model';
// import { useUser } from '../../App';

import PerformanceForm from './PerformanceForm';
import SelectOutcome from './SelectOutcome';

const NewOutcome: React.FC = () => {
    const [oc, setOc] = useState<Outcome | null>(null);
    const [outcomes, setOutcomes] = useState<Outcome[]>([]);
    // const user = useUser();

    // useEffect(()=> {
    //     (async ()=> {
    //         const controller : AbortController = new AbortController();
    //        const resp : any =  await axios.get(`${process.env.REACT_APP_URL}/outcomes?id=${user}`, {
    //         signal : controller.signal
    //        });
    //        const data : Outcome [] = await resp.data;
    //        setOutcomes(data);

    //        return () => controller.abort();
    //     })()
    // }, [user]);

    if (!oc) {
        return (
            <main>
                <h1>{outcomes && outcomes.length < 1 ? 'Make your first Outcome Goal': 'Make A New Outcome Goal'}</h1>
                <OutcomeForm />
                {outcomes && outcomes.length > 0 ? <SelectOutcome outcomes={outcomes} setOc={setOc} text={'Or edit a current goal'}/> : <></>}
            </main>
        )
    } else{
        return(
            <main>
                {outcomes && outcomes.length > 0 ? <SelectOutcome outcomes={outcomes} setOc={setOc} text={'Select a different goal'} /> : <></>}
                <h1>{oc.description}</h1>
                <OutcomeForm />
                {oc && oc.performanceGoals?.length > 0 ? <h2>Add more performance goals...</h2> : <h2>Add a Performance Goal</h2>}
                <PerformanceForm id={oc._id} setOc={setOc} />
            </main>
        )
    }
};

export default NewOutcome;