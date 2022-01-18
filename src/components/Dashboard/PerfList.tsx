import React, {useState, FormEvent, MouseEvent} from 'react';
import axios from 'axios';
import {Performance} from '../../interfaces/performanceGoals.model';
import {Outcome} from '../../interfaces/outcomeGoals.model';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import ProcessForm from './ProcessForm';
import ProcessList from './ProcessList';

type listProp = {
    performance: Performance;
    setOutcomes: (arg: Outcome[]) => void;
    delete: (e: FormEvent, id:string, setO:Function, setA:Function, aid:string) => void;
    ogID: String;
    setActive:(arg:Outcome)=> void;
    active: Outcome;
}

const PerfList: React.FC <listProp> = (props) => {
    const [toggle, setToggle] = useState<Boolean>(false);
    const [dateDue, setDateDue] = useState<Date>(new Date());
    const [completed, setCompleted] = useState<Boolean>(false);
    const [reward, setReward] = useState<String>('');
    const [punishment, setPunishment] = useState<String>('');
    const [percentImproved, setPercentImproved] = useState<Number>(0);
    const [hidePro, setHidePro] = useState<Boolean>(false);

console.log(props, 'perf list')

    let date : Date = new Date(props.performance.dueDate);

    const updatePerformance = async (e:FormEvent, id:string, setO:Function, setA:Function) => {
        e.preventDefault();
        try {
                await axios.put(`${process.env.REACT_APP_URL}/performances/${id}`, {
                dateDue: new Date(dateDue),
                completed: completed,
                reward: reward,
                punishment: punishment,
                percentImproved: percentImproved
            });
            const res : any = await axios.get(`${process.env.REACT_APP_URL}/outcomes`);
            const data : Outcome[] = await res.data;
            if (data) {
                let a : Outcome | undefined = data.find(d => d._id === props.active._id);
                setO(data);
                if(a) setA(a);
            }
        } catch(err) {
            console.log(err)
        }
    };

    const showForm = (e:MouseEvent) => {
        e.preventDefault();
        setToggle(true);
    }

    const showProcess = (e:MouseEvent) => {
        e.preventDefault();
        setHidePro(!hidePro);
    }

    return (
        <>
            {!toggle? 
            <>
            <form>
                <fieldset>
                    <legend>{props.performance.description}</legend>
                    {props.performance.completed === true ?
                        <>
                        <label htmlFor="completed" >
                            You finished it, way to go
                        </label>
                        <input 
                            type="checkbox" 
                            name="completed" 
                            checked onChange={(e)=>setCompleted(e.target.checked)}
                        />
                        </>
                        :
                        <>
                        <label htmlFor="completed">
                            Not done yet
                        </label>
                        <input 
                            type="checkbox" 
                            name="completed" 
                            onChange={(e)=>setCompleted(e.target.checked)} 
                        />
                        </>
                    }
                    <br></br>
                    <label htmlFor="dueDate">
                        Currently due on <time>{date.toLocaleDateString()}</time>
                    </label>
                    <DatePicker selected={dateDue} name="dateDue" onChange={(date: Date)=> setDateDue(date)} />
                    <br></br>
                    <label htmlFor="reward">
                        How will you reward yourself?
                    </label>
                    <input 
                        type="text" 
                        name="reward"  
                        placeholder={props.performance.reward} 
                        onChange={(e)=> setReward(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="punishment">
                        How will you hold yourself accountable?
                    </label>
                    <input 
                        type="text" 
                        name="punishment" 
                        placeholder={props.performance.punishment} 
                        onChange={(e)=>setPunishment(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="percentImproved">
                        What percentage will you improve by?
                    </label>
                    <input 
                        type="number" 
                        name="percentImproved"  
                        placeholder={props.performance.improveBy.number.toString()} 
                        onChange={(e)=>setPercentImproved(e.target.valueAsNumber)}
                    />
                    <br></br>
                    <button onClick={(e)=> showForm(e)}>
                        Add Process Goal
                    </button>
                    <br></br>
                    <button 
                        className='update'
                        onClick={(e)=> updatePerformance(
                        e, 
                        props.performance._id, 
                        props.setOutcomes, 
                        props.setActive
                    )}>
                        Update
                    </button>
                    <br></br>
                    <button 
                        className="warning"
                        onClick={(e)=> props.delete(
                        e,
                        props.performance._id, 
                        props.setOutcomes, 
                        props.setActive, 
                        props.active._id
                    )}>
                        Delete
                    </button>
                    <br></br>
                    {props.performance.processGoals.length > 0 ? <button onClick={showProcess}>{hidePro ? 'Hide Process Goals': 'Show Process Goals'}</button> : <></>}
                </fieldset>
            </form>
            <ProcessList 
                performance={props.performance} 
                setOutcomes={props.setOutcomes}
                setActive={props.setActive}
                active={props.active}
                hidePro={hidePro}
                setHidePro={setHidePro}
            />
            </>
            :
            <ProcessForm 
                performance={props.performance} 
                setToggle={setToggle} 
                toggle={toggle} 
                ogID={props.ogID} 
                setOutcomes={props.setOutcomes}
                setActive={props.setActive}
                active={props.active}
            />
        }
        </>
    )
};

export default PerfList