import axios from 'axios';
import React, { useEffect, useState, FormEvent, useRef, MouseEvent} from 'react';
import { Outcome } from '../../interfaces/outcomeGoals.model';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../App';


import OutcomeLi from './OutcomeLi';
import Perf from './Performance';
import Display from './Display';



const Dashboard: React.FC  = () => {
    const [outcomes, setOutcomes] = useState<Outcome[]>([]);
    const [active, setActive] = useState<Outcome>(outcomes[0]);
    const [hidden, setHidden] = useState<Boolean>(false);
    const [redirect, setRedirect] = useState<Boolean>(false);
    const user = useUser();
    const perfList = useRef<HTMLLIElement>(null);

    useEffect(()=> {
        (async ()=> {
           const controller : AbortController = new AbortController();
           const res : any =  await axios.get(`${process.env.REACT_APP_URL}/outcomes?id=${user}`, {
            signal : controller.signal
           });
           const data : Outcome [] = await res.data;
           if (data.length > 0) {
                setOutcomes(data);
                setActive(data[0]);
           } else {
            setRedirect(true);
           };
           return () => controller.abort();
        })()
    }, [user]);

    const handleHidden = (e: MouseEvent, h:Boolean) => {
        setHidden(!hidden);
        if (hidden && perfList.current) {
            perfList.current.style.display = 'block'
        } else if (!hidden && perfList.current) {
            perfList.current.style.display = 'none'
        }
    };

    const handleActive = (e: any) => {
        setActive(outcomes[e.target.name])
    };

    const deleteOutcome = async (e:any) => {
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/outcomes/${e.target.name}`);
            const res : any = await axios.get(`${process.env.REACT_APP_URL}/outcomes`);
            const data : Outcome [] = res.data;
            if(data) {
                setOutcomes(data)
                setActive(data[0])
            };
        } catch(err) {
            console.log(err)
        }
    };

    const deletePerformance = async (e:FormEvent, id:string, setO:Function, setA:Function, aid:string) => {
        e.preventDefault();
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/performances/${id}`);
            const res = await axios.get(`${process.env.REACT_APP_URL}/outcomes`);
            const data : Outcome[] = await res.data;
            if(data) {
                let a : Outcome | undefined= data.find(d => d._id === aid)
                setO(data);
                if (a) setA(a)
            }
        } catch (err) {
            console.log(err)
        }
    };

    

    return (
        <main id="dashboard">
            {redirect && <Navigate to='/newOutcome' replace={true}/>}
            <div id="dash-col-1">
            <h3>Outcome Goals</h3>
            <ul>
                {outcomes.map((outcome: Outcome, id:number) => {
                    return (
                        <OutcomeLi 
                            key={id} 
                            id={id}
                            description={outcome.description} 
                            handleActive={handleActive} 
                            delete={deleteOutcome} 
                            active={active}
                        />
                    )
                })}
            </ul>
            </div>
            <div id="dash-col-2">
                
                {active ? <Display handleHidden={handleHidden} active={active} hidden={hidden}/> : <></> }
                {active ?
                    <li className="perf-list" ref={perfList}> 
                        <Perf 
                            performances={active.performanceGoals} 
                            setOutcomes={setOutcomes} 
                            delete={deletePerformance} 
                            ogID={active._id}
                            setActive={setActive}
                            active={active}
                        /> 
                        <button onClick={(e)=> handleHidden(e, hidden)}>Hide Performance Goals</button>
                    </li>
                    :
                    <></>
                }
            </div>
        </main>
    )
};

export default Dashboard;