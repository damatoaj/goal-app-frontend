import { useState, useEffect } from 'react';
import axios from 'axios';
import { Performance } from '../interfaces/performanceGoals.model';
import { Outcome } from '../interfaces/outcomeGoals.model';

const usePerformance = (oId:string | undefined) => {
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [outcome, setOutcome] = useState<Outcome>({
        _id: '',
        description: '',
        reward: '',
        punishment: '',
        performanceGoals: [],
        dateDue: new Date(),
        userId: '',
        complete: false
    });
    
    const create = async (form: any) => {
        if (!oId) return
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/outcomes/${oId}/performances`, form);

            if (!isCanceled) {
                setIsLoading(false);
                setError('');
                setOutcome(prev => {
                    return {
                        ...prev,
                        performanceGoals: [...prev?.performanceGoals, response.data]
                    }
                })
            }
        } catch (err: any) {
            if (!isCanceled) {
                setError(err);
                setIsLoading(false);
            }
        };
    };

    const update = async (id:string, form: object) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.put(`${process.env.REACT_APP_URL}/performances/${id}`, form);
           
            if (!isCanceled) {
                setError('');
                setIsLoading(false);
                console.log(response.data, '<--- response ')
                setOutcome(response.data)
            }
        } catch (err: any) {
            if (!isCanceled) {
                console.log(err, err.response)
                setError(err.response.data);
                setIsLoading(false);
            };
        };
    };

    const deletePerformance = async (id:string) => {
        setIsLoading(true);
        setError('');
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/performances/${id}`);

            if (!isCanceled) {
                setOutcome(prev => {
                    console.log(prev.performanceGoals.filter((performance : Performance) => performance._id !== id), id, '<--- comparision')
                    let temp = prev.performanceGoals.filter((performance : Performance) => performance._id !== id)
                    console.log(temp)
                    return {
                        ...prev, 
                        performanceGoals: temp
                    }
                })
                setIsLoading(false);
                setError('')
            }
        } catch (err:any) {
            if(!isCanceled) {
                setError(err.response.data);
                setIsLoading(false)
            }
        }
    }

    useEffect(()=> {
        let controller = new AbortController();
        
        const getOne = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/outcomes/${oId}`)
                setOutcome(response.data)
            } catch (err: any) {
                console.error(err)
            }

        }
        getOne();

        return controller.abort();
    }, [oId])

    useEffect(()=> {
        return ()=> setIsCanceled(true);
    }, []);


    return { update, outcome, deletePerformance, create, error, isLoading}
};

export default usePerformance;