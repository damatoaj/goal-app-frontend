import axios from 'axios';
import React, { FormEvent, useState} from 'react';
import {Process} from '../../interfaces/processGoals.models';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type pgProps = {
    process: Process;

}

const ProcessGoal: React.FC <pgProps> = (props) => {
    const [duration, setDuration] = useState<number>(props.process.duration);
    const [frequency, setFrequency] = useState<number>(props.process.frequency);
    const [repeats, setRepeats] = useState<boolean>(props.process.repeats);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [form, setForm] = useState<any>({
        ...props.process
    });

    // const fieldset = useRef<HTMLFieldSetElement>(null);

    // if(fieldset.current && props.hidePro) {
    //     fieldset.current.style.display = 'block'
    // } else if (fieldset.current && !props.hidePro) {
    //     fieldset.current.style.display = 'none'
    // }
    const handleUpdate = async (e:FormEvent, id:string, act:string, setA:Function, setO:Function) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await axios.put(`${process.env.REACT_APP_URL}/processes/${id}`, {
                duration: duration,
                frequency: frequency,
                repeats:repeats
            })
            const res :any = await axios.get(`${process.env.REACT_APP_URL}/outcomes`);
            const data : Outcome [] = await res.data;
            if(data) {
                let a : Outcome | undefined = data.find(d => d._id === act);
                setO(data);
                if(a) setA(a);
            }
            setIsLoading(false);
            setError(null);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleDelete = async (e:FormEvent, id:string, act:string, setA:Function, setO:Function) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/processes/${id}`);
            const res : any = await axios.get(`${process.env.REACT_APP_URL}/outcomes`);
            const data : Outcome[]=  res.data;

            let a : Outcome | undefined = data.find(d => d._id === act);
            setO(data);
            if(a) setA(a);
            setIsLoading(false);
            setError(null);
        } catch (err: any) {
            console.error(err);
            setIsLoading(false);
            setError(err.message);
        }
    };

    return( 
        <fieldset>
            <legend>{props.process.action}</legend>
            <form>
                <label htmlFor="duration">
                    Duration
                </label>
                <input 
                    type="text" 
                    name="duration" 
                    value={form.duration.number} 
                    onChange={(e)=>setDuration(e.target.valueAsNumber)}
                    required
                />
                <br></br>
                <label htmlFor="frequency">
                    Frequency
                </label>
                <input 
                    type="number" 
                    name="frequency"
                    value={form.frequency.number} 
                    onChange={(e)=>setFrequency(e.target.valueAsNumber)}
                    required
                />
                <br></br>
                <label htmlFor="repeats">
                    Repeats
                </label>
                <input 
                    type="checkbox" 
                    name="repeats" 
                    checked={form.repeats} 
                    onChange={(e)=>setRepeats(e.target.checked)}
                />
                <br></br>
                <button 
                    className='update'
                    type='button'
                >
                    Update
                </button>
                <button
                    className="warning"
                    type='button'
                >
                    X
                </button>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </form>
        </fieldset>
        )
};

export default ProcessGoal;