import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react';
import { Outcome } from '../../interfaces/outcomeGoals.model';
import { useUser } from '../../App';
import { validateDate } from '../../utils/validateDate';
import { minimumStringLength } from '../../utils/minimumStringLength';

type formProps = {
    setOc : (arg:Outcome)=> void;
    oc: Outcome | null;
};


const OutcomeForm : React.FC <formProps> = (props) => {
    const descInputRef = useRef<HTMLInputElement>(null);
    const dateDueInputRef = useRef<HTMLInputElement>(null);
    const rewardInputRef = useRef<HTMLInputElement>(null);
    const punishmentInputRef = useRef<HTMLInputElement>(null);
    const user = useUser();
    const [error, setError] = useState<String | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
     
    
    const handleForm = async (e:FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if(!validateDate(new Date(dateDueInputRef.current!.value))) throw new Error("Goals must be set in the future");
            if(!minimumStringLength(descInputRef.current!.value)) throw new Error('The description should have more detail');
            if(!minimumStringLength(rewardInputRef.current!.value)) throw new Error('The reward should have more detail')
            if(!minimumStringLength(punishmentInputRef.current!.value)) throw new Error('The punishment should have more detail')

            const res: any = await axios.post(
                `${process.env.REACT_APP_URL}/outcomes`,
                {
                description: descInputRef.current!.value.trim(),
                dateDue: dateDueInputRef.current!.value,
                reward: rewardInputRef.current!.value.trim(),
                punishment: punishmentInputRef.current!.value.trim(),
                complete: false,
                performanceGoals: [],
                userId:user
            })
            const newOutcome: Outcome = await res.data;
            if(newOutcome) props.setOc(newOutcome);
            setIsLoading(false);
            setError(null);
        } catch (err : any) {
            setError(err.message);
            setIsLoading(false);
        }
    };


    if(isLoading) {
        <h1>Loading...</h1>
    }
    
    return (
        <form onSubmit={handleForm}>
            <fieldset>
            <label>
                What's the Goal?
            </label>
            <br></br>
            <input 
                type="text" 
                name="description" 
                ref={descInputRef} 
                placeholder={props.oc?.description}
            />
            <br></br>
            <br></br>
            <label>
                {props.oc ? `Currently due on ${props.oc.dateDue.toString().slice(0,10)}`:'When\'s it Due?'}
            </label>
            <br></br>
            <input 
                type="date" 
                name="dueDate" 
                ref={dateDueInputRef} 
            />
            <br></br>
            <br></br>
            <label>
                How will you reward yourself?
            </label>
            <br></br>
            <input 
                type="text" 
                name="reward" 
                ref={rewardInputRef} 
                placeholder={props.oc?.reward}
            />
            <br></br>
            <br></br>
            <label>
                How will you hold yourself accountable?
            </label>
            <br></br>
            <input 
                type="text" 
                name="punishment" 
                ref={punishmentInputRef} 
                placeholder={props.oc?.punishment}
            />
            <br></br>
            <br></br>
            <button type="submit" className="landing-btn">Submit</button>
            {error && <p>{error}</p>}
            </fieldset>
        </form>
    )
};

export default OutcomeForm;