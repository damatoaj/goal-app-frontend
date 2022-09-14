import React from 'react';
import ProcessForm from '../../Dashboard/ProcessForm';
import { useParams } from 'react-router-dom';
const NewProcessScreen = () => {
    const { oid, pid } = useParams();
    return (
        <>
            <h1>Process Screen</h1>
            <ProcessForm />
        </>
    )
}

export default NewProcessScreen;