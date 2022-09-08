import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Outcome } from '../../../interfaces/outcomeGoals.model';
import PerfList from '../../Dashboard/PerfList';
import Performance from '../../Dashboard/Performance'
import PerformanceForm from '../../NewOutcome/PerformanceForm';

import './outcome.css';

const OutcomeScreen = () => {
    const [outcome, setOutcome] = useState<Outcome | null>(null);
    const { id } = useParams();

    console.log(id, '<-- id')
    useEffect(()=> {
        let controller = new AbortController();
        
        const getOne = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/outcomes/${id}`)
                setOutcome(response.data)
            } catch (err: any) {
                console.error(err)
            }

        }
        getOne();

        return controller.abort();
    }, [id])

    if (outcome) {
        return (
            <>
                <h1>Outcome screen {outcome?._id}</h1>
                <Performance 
                    performances={outcome ? outcome.performanceGoals : []}
                    delete={()=> console.log('click')}
                    ogID={outcome ? outcome._id : ''}
                    setActive={()=> console.log('cl')}
                    setOutcomes={()=> console.log('cl')}
                />
                <PerformanceForm id={outcome?._id} setOc={()=> console.log('setOC')} />
            </>
        )
    } else {
        return (
            <h1>Loading ...</h1>
        )
    }

}

export default OutcomeScreen;