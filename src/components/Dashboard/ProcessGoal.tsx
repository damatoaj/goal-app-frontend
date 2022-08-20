import axios from 'axios';
import React, { FormEvent, useState} from 'react';
import {Process} from '../../interfaces/processGoals.models';
import {Outcome} from '../../interfaces/outcomeGoals.model';

type pgProps = {
    process: Process;
    setOutcomes:(arg:Outcome[]) => void;
    setActive:(arg:Outcome) => void;
    active: Outcome;
    hidePro:Boolean;
}

const ProcessGoal: React.FC <pgProps> = (props) => {
    const [duration, setDuration] = useState<number>(props.process.duration);
    const [frequency, setFrequency] = useState<number>(props.process.frequency);
    const [repeats, setRepeats] = useState<boolean>(props.process.repeats);

    // const fieldset = useRef<HTMLFieldSetElement>(null);

    // if(fieldset.current && props.hidePro) {
    //     fieldset.current.style.display = 'block'
    // } else if (fieldset.current && !props.hidePro) {
    //     fieldset.current.style.display = 'none'
    // }
    const handleUpdate = async (e:FormEvent, id:string, act:string, setA:Function, setO:Function) => {
        e.preventDefault();
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
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (e:FormEvent, id:string, act:string, setA:Function, setO:Function) => {
        e.preventDefault();
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/processes/${id}`);
            const res : any = await axios.get(`${process.env.REACT_APP_URL}/outcomes`);
            const data : Outcome[]=  res.data;

            let a : Outcome | undefined = data.find(d => d._id === act);
            setO(data);
            if(a) setA(a);
        } catch (err) {
            console.log(err);
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
                    type="number" 
                    name="duration" 
                    value={duration} 
                    onChange={(e)=>setDuration(e.target.valueAsNumber)}
                />
                <br></br>
                <label htmlFor="frequency">
                    Frequency
                </label>
                <input 
                    type="number" 
                    name="frequency"
                    value={frequency} 
                    onChange={(e)=>setFrequency(e.target.valueAsNumber)}
                />
                <br></br>
                <label htmlFor="repeats">
                    Repeats
                </label>
                <input 
                    type="checkbox" 
                    name="repeats" 
                    checked={repeats} 
                    onChange={(e)=>setRepeats(e.target.checked)}
                />
                <br></br>
                <button 
                    className='update'
                    onClick={(e:FormEvent)=> handleUpdate(
                        e,
                        props.process._id, 
                        props.active._id, 
                        props.setActive, 
                        props.setOutcomes
                    )}
                >
                    Update
                </button>
                <button
                    className="warning"
                    onClick={(e:FormEvent)=> handleDelete(
                        e, 
                        props.process._id, 
                        props.active._id, 
                        props.setActive, 
                        props.setOutcomes
                        )}
                >
                    X
                </button>
            </form>
        </fieldset>
        )
};

export default ProcessGoal;