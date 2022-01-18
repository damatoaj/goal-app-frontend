import axios from 'axios';
import { request } from 'http';
import React, {FormEvent, useRef} from 'react'
import {Outcome} from '../../interfaces/outcomeGoals.model';

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
    console.log(selectRef.current?.value, 'select ref')
    
    const addPerf = async (e:FormEvent, id:string) => {
        e.preventDefault();

        try {
            const req = await axios.post(`http://localhost:3000/outcomes/${id}/performances`, {
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
            const res : any = await axios.get(`http://localhost:3000/outcomes/${id}`);
            const data : Outcome = await res.data;
            if (data) props.setOc(data);

            console.log(req, 'the request')

            descInputRef.current!.value = '';
            dateDueInputRef.current!.value = '';
            rewardInputRef.current!.value = '';
            punishmentInputRef.current!.value = '';
            percentInputRef.current!.value = '';
        } catch (err) {
            console.log(err);
            alert('No fields can be blank');
        }
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
            </fieldset>
        </form>
    )
};

export default PerformanceForm;