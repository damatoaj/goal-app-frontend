import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Performance } from '../../../interfaces/performanceGoals.model'
import { useParams, Link } from 'react-router-dom';
import ProcessList from '../../Dashboard/ProcessList';

const PerformanceDetails = () => {
    const { oid, id } = useParams();
    const [performance, setPerformance] = useState<Performance | null>(null);
    console.log(oid, id)
    useEffect(()=> {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_URL}/outcomes/${oid}/performances/${id}`)
                console.log(data, '<--- data')
                setPerformance(data.data);
            } catch(err: any) {
                console.error(err)
            }
        }

        fetchData();

        return () => controller.abort();
    }, [oid, id]);


    return (
        <>
            <span>
                <h1>{performance?.description ? performance.description : 'Loading...'}</h1>
                <Link to={`/outcomes/${oid}`}>Back</Link>
            </span>
            {performance  && (
                <ProcessList 
                    performance={performance}
                />
            )}
        </>

    )
};

export default PerformanceDetails;