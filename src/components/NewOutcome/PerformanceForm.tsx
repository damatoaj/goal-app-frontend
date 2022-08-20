import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react'
import { Outcome } from '../../interfaces/outcomeGoals.model';

type formProps = {
    id: string;
    setOc:(arg: Outcome)=> void;
};

const PerformanceForm: React.FC <formProps> = (props) => {
    const descInputRef = useRef<HTMLInputElement>(null);
    const dateDueInputRef = useRef<HTMLInputElement>(null);
    const rewardInputRef = useRef<HTMLInputElement>(null);
    const punishmentInputRef = useRef<HTMLInputElement>(null);
    const percentInputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const [error, setError] = useState<String | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    
    const addPerf = async (e:FormEvent, id:string) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await axios.post(`${process.env.REACT_APP_URL}/outcomes/${id}/performances`, {
                description: descInputRef.current!.value.trim(),
                dueDate: dateDueInputRef.current!.value,
                reward: rewardInputRef.current!.value.trim(),
                punishment: punishmentInputRef.current!.value.trim(),
                improveBy: {
                    unit: selectRef.current!.value,
                    number: percentInputRef.current!.value,
                },
                complete: false,
                processGoals: []
            });
            const res : any = await axios.get(`${process.env.REACT_APP_URL}/outcomes/${id}`);
            const data : Outcome = await res.data;
           
            if (data) props.setOc(data);

            descInputRef.current!.value = '';
            dateDueInputRef.current!.value = '';
            rewardInputRef.current!.value = '';
            punishmentInputRef.current!.value = '';
            percentInputRef.current!.value = '';
            setError(null);
            setIsLoading(false);
        } catch (err: any) {
            console.log(err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        <h1>Loading...</h1>
    }

    return (
        <form onSubmit={(e)=> addPerf(e, props.id)}>
            <fieldset>
                <label htmlFor="description">
                    What's the goal?
                </label>
                <br></br>
                <input 
                    type="text" 
                    name="description" 
                    ref={descInputRef} 
                />
                <br></br>
                <br></br>
                <label htmlFor="dueDate">
                    When's it due?
                </label>
                <br></br>
                <input 
                    type="date" 
                    name="dueDate" 
                    ref={dateDueInputRef}
                />
                <br></br>
                <br></br>
                <label htmlFor="improveBy">
                    How much will you improve by?
                </label>
                <br></br>
                <input 
                    type="number" 
                    name="improveNum" 
                    ref={percentInputRef} 
                />
                <select defaultValue="units" name="improveUnit" ref={selectRef}>
                    <option value="units">Units</option>
                    <option value="percent">Percent</option>
                    <option value="kg">KG</option>
                    <option value="l">L</option>
                </select>
                <br></br>
                <br></br>
                <label htmlFor="reward">
                    How will you reward yourself?
                </label>
                <br></br>
                <input 
                    type="text" 
                    name="reward" 
                    ref={rewardInputRef} 
                />
                <br></br>
                <label htmlFor="punishment">
                    How will you hold yourself accountable?
                </label>
                <br></br>
                <input 
                    type="text" 
                    name="punishment" 
                    ref={punishmentInputRef} 
                />
                <br></br>
                <br></br>
                <button type="submit" className="landing-btn">Add</button>
                {error && <p>{error}</p>}
            </fieldset>
        </form>
    )
};

export default PerformanceForm;