import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react';
import { Outcome } from '../../interfaces/outcomeGoals.model';
import { useAuthContext }from '../../hooks/useAuthContext';
import useOutcome from '../../hooks/useOutcome';


const OutcomeForm : React.FC  = () => {
    const { create, error, isLoading } = useOutcome();
    const descInputRef = useRef<HTMLInputElement>(null);
    const dateDueInputRef = useRef<HTMLInputElement>(null);
    const rewardInputRef = useRef<HTMLInputElement>(null);
    const punishmentInputRef = useRef<HTMLInputElement>(null);
    const { user } = useAuthContext();


    const date = new Date();
    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
    const stringDate = `${year}-${month}-${day}`;
     
    
    const handleForm = async (e:FormEvent) => {
        e.preventDefault();
        create({
                description: descInputRef.current!.value.trim(),
                dateDue: new Date(dateDueInputRef.current!.value),
                reward: rewardInputRef.current!.value.trim(),
                punishment: punishmentInputRef.current!.value.trim(),
                complete: false,
                performanceGoals: [],
                userId:user._id
        })     
    };

    
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
                min='10'
                // placeholder={props.oc?.description}
                required
            />
            <br></br>
            <br></br>
            <label>
                {/* {props.oc ? `Currently due on ${props.oc.dateDue.toString().slice(0,10)}`:'When\'s it Due?'} */}
            </label>
            <br></br>
            <input 
                type="date" 
                name="dueDate" 
                min={stringDate}
                ref={dateDueInputRef}
                required
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
                min='10'
                // placeholder={props.oc?.reward}
                required
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
                min='10'
                // placeholder={props.oc?.punishment}
                required
            />
            <br></br>
            <br></br>
            <button type="submit" className="go">Submit</button>
            <button type='reset' className='warning'>Clear</button>
            {error && <p className='error'>{error}</p>}
            {isLoading && <p>Loading...</p>}
            </fieldset>
        </form>
    )
};

export default OutcomeForm;