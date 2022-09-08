import { useState, useEffect } from 'react';
import axios from 'axios';
const usePerformance = (oId:string | undefined) => {
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [performances, setPerformances] = useState<Performance[]>([])
    const create = async (form: any) => {
        if (!oId) return
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/outcomes/${oId}/performances`, form);

            if (!isCanceled) {
                setIsLoading(false);
                setError('');
                setPerformances(prev => [...prev, response.data]);
            }
        } catch (err: any) {
            if (!isCanceled) {
                setError(err);
                setIsLoading(false);
            }
        };
    };

    const deletePerformance = async (id:string) => {
        setIsLoading(true);
        setError('');
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/outcomes/${oId}/${id}`);

            if (!isCanceled) {
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


    return { deletePerformance, performances, create, error, isLoading}
};

export default usePerformance;