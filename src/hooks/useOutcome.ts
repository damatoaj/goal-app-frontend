import {useState, useEffect} from 'react';
import axios from 'axios';
import { Outcome } from '../interfaces/outcomeGoals.model';
import { validateDate } from '../utils/validateDate';
import { minimumStringLength } from '../utils/minimumStringLength';

interface OutcomeForm {
    description: string;
    dateDue: Date;
    reward: string;
    punishment: string;
    complete: boolean;
    performanceGoals: [];
    userId: string
}

const useOutcome = () => {
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [outcomes, setOutcomes] = useState<any | null>(null);

    const create = async ( form: OutcomeForm) => {
        setIsLoading(true);
        setError('');

        const { dateDue, reward, punishment, description} = form;

        if(!validateDate(dateDue)) throw new Error("Goals must be set in the future");
        if(!minimumStringLength(description)) throw new Error('The description should have more detail');
        if(!minimumStringLength(reward)) throw new Error('The reward should have more detail')
        if(!minimumStringLength(punishment)) throw new Error('The punishment should have more detail')
        try {
            const response : any = await axios.post(`${process.env.REACT_APP_URL}/outcomes`, form)
            
            if (!response) throw new Error('Something went wrong');
            const newOutcome : Outcome = response.data;
            if(!isCanceled) {
                setIsLoading(false);
                setError('');
                setOutcomes((prev:any) => {
                    return [...prev, newOutcome]
                })
            }
        } catch (err:any) {
            if (!isCanceled) {
                setError(err.response.data);
                setIsLoading(false);
            }
        }
    }

    useEffect(()=> {
        const get = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/outcomes`);

                if (!isCanceled) {
                    setOutcomes(response.data);
                    setIsLoading(false);
                    setError('');
                }
            } catch (err:any) {
                if (!isCanceled) {
                    setIsLoading(false);
                    setError(err.response);
                }
            }
        };
        get();
        return ()=> setIsCanceled(true);
    }, [isCanceled])

    return { outcomes, create, error, isLoading}
}

export default useOutcome;