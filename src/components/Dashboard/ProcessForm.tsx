import axios from 'axios';
import React, {FormEvent, useState} from 'react'
import { Outcome } from '../../interfaces/outcomeGoals.model';
import {Performance} from '../../interfaces/performanceGoals.model';

type pfProps = {
    performance: Performance;
    setToggle: (arg:Boolean) => void;
    toggle: Boolean;
    ogID:String;
    setOutcomes:(arg:Outcome[]) => void;
    setActive: (arg:Outcome)=> void;
    active: Outcome;
}

const ProcessForm: React.FC <pfProps> = (props) => {
    const [action, setAction] = useState <string>('');
    const [duration, setDuration] = useState<number>(0);
    const [frequency, setFrequency] = useState<number>(0);
    const [repeats, setRepeats] = useState<Boolean>(false);
    const [fUnit, setFUnit] = useState<String>('DAILEY');
    const [dUnit, setDUnit] = useState<String>('MIN');

    const handleSubmit= async(e:FormEvent, oid:String, pid:string, aid:string, setO:Function, setA:Function, setT:Function) => {
        e.preventDefault();
        try{
            await axios.post(`${process.env.REACT_APP_URL}/outcomes/${oid}/performances/${pid}/processes`, {
                action:action,
                duration: {
                    number: duration,
                    time: dUnit
                },
                frequency: {
                    number:frequency,
                    time:fUnit
                },
                repeats:repeats,
            });
            const res : any = await axios.get(`${process.env.REACT_APP_URL}/outcomes/`)
            const data : Outcome [] = res.data;
            if (data) {
                let a = data.find(d => d._id === aid);
                setO(data);
                if(a) setA(a);
                console.log(props.active, a, '<----check a and active')
                setT(false);
            }
        } catch(err) {
            alert('No fields can be blank');
            console.log(err)
        }
    };

    return (
        <fieldset id="pgForm">
            <h3>New Process Goal</h3>
            <form>
                <label htmlFor="action">
                    Action
                </label>
                <br></br>
                <input 
                    type="string" 
                    name="action" 
                    onChange={(e)=>setAction(e.target.value)}
                />
                <br></br>
                <br></br>
                <label htmlFor="duration">
                    Duration
                </label>
                <br></br>
                <input 
                    type="number" 
                    name="duration" 
                    onChange={(e)=>setDuration(e.target.valueAsNumber)}
                />
                <select onChange={(e)=>setDUnit(e.target.value)}>
                    <option value="MIN">Mins</option>
                    <option value="HRS">Hrs</option>
                </select>
                <br></br>
                <br></br>
                <label htmlFor="frequency">
                    Frequency
                </label>
                <br></br>
                <input 
                    type="number" 
                    name="frequency" 
                    onChange={(e)=>setFrequency(e.target.valueAsNumber)}
                />
                <select name="freqUnit" onChange={(e)=>setFUnit(e.target.value)}>
                    <option value="DAILEY">Per Day</option>
                    <option value="WEEKLY">Per Week</option>
                    <option value="MONTHLY">Per Month</option>
                    <option value="YEARLY">Per Year</option>
                </select>
                <br></br>
                <br></br>
                <label htmlFor="repeats">
                    Repeats
                </label>
                <br></br>
                <input 
                    type="checkbox" 
                    name="repeats" 
                    onChange={(e)=>setRepeats(e.target.checked)}
                />
                <br></br>
                <br></br>
                <button 
                    onClick={(e)=> handleSubmit(
                            e, 
                            props.ogID, 
                            props.performance._id, 
                            props.active._id,
                            props.setOutcomes, 
                            props.setActive,
                            props.setToggle
                        )}
                >
                    Submit
                </button>
                <button onClick={()=> props.setToggle(false)}>
                    X
                </button>
            </form>
        </fieldset>
    )
};

export default ProcessForm;