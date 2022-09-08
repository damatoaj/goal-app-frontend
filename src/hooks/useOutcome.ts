import {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import { Outcome } from '../interfaces/outcomeGoals.model';
import { validateDate } from '../utils/validateDate';
import { minimumStringLength } from '../utils/minimumStringLength';
import { useAuthContext } from './useAuthContext';

const useOutcome = () => {
    const { user } = useAuthContext();
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [outcomes, setOutcomes] = useState<Outcome[]>([]);
    const [id, setId] = useState<string>('');
    const active : Outcome | null = useMemo(() => {
        if (outcomes.length > 0 && id) {
            return outcomes.filter((outcome : Outcome) => outcome._id === id)[0]

        } else {
            return null
        }
    }, [id, outcomes])

    const select = ( id:string ) => {
        setId(id)
    };

    const deleteOutcome = async ( id: string ) => {
        setIsLoading(true);
        setError('');
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/outcomes/${id}`);

            if(!isCanceled) {
                setIsLoading(false);
                setError('')
                setOutcomes(prev => prev.filter((outcome: Outcome) => outcome._id !== id));
            }
        } catch(err: any) {
            if (!isCanceled) {
                console.error(err, err.response)
                setError (err.response.data);
                setIsLoading(false);
            }
        }
    };

    const create = async ( form: any) => {
        setIsLoading(true);
        setError('');

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
                const response = await axios.get(`${process.env.REACT_APP_URL}/outcomes?id=${user._id}`);

                if (!isCanceled) {
                    setOutcomes(response.data);
                    if (response.data.length > 0) setId(response.data[0]._id)
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

    }, [isCanceled, user._id])

    useEffect(()=> {
        return () => setIsCanceled(true)
    }, [])

    return { outcomes, create, error, isLoading, select, active, deleteOutcome }
}

export default useOutcome;