import { useParams, Link } from 'react-router-dom';
import Performance from '../../Dashboard/Performance'
import usePerformance from '../../../hooks/usePerformance';
import './outcome.css';

const OutcomeScreen = () => {
    const { id } = useParams();
    const {update, outcome, error, isLoading, deletePerformance} = usePerformance(id);
    console.log(id, '<-- id')


    if(isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <header style={styles.header}>
                <h1>{outcome?.description}</h1>
                <Link to={`/performances/newPerformance/${id}`}>Create Sub Goal</Link>
            </header>

                <Performance 
                    performances={outcome ? outcome.performanceGoals : []}
                    delete={deletePerformance}
                    oId={outcome ? outcome._id : ''}
                    update={update}
                    error={error}
                />

        </>
    )
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%'
    }
}

export default OutcomeScreen;