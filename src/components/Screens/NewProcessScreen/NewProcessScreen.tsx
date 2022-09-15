import ProcessForm from '../../Dashboard/ProcessForm';
import { Link, useParams } from 'react-router-dom';
const NewProcessScreen = () => {
    const { oid } = useParams();
    return (
        <>
            <span>
                <h1>Process Screen</h1>
                <Link to={`/outcomes/${oid}`}>
                   Back
                </Link>
            </span>
            <ProcessForm />
        </>
    )
}

export default NewProcessScreen;