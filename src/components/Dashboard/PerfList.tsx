import React, {useState, MouseEvent, ChangeEvent} from 'react';
import {Performance} from '../../interfaces/performanceGoals.model';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';

type listProp = {
    performance: Performance;
    delete: (id: string) => void;
    oId: string;
    update: (id:string, form: object) => void;
    error: string;
}

const PerfList: React.FC <listProp> = (props) => {
    const  [form, setForm] = useState({
        ...props.performance,
        dateDue: props.performance.dateDue.toString().substring(0, 10)
    });
    const [show, setShow] = useState<boolean>(false);

    let date : Date = new Date(props.performance.dateDue);

    const handleDelete = async () => {
        await props.delete(form._id)
        if (!props.error) {
            alert('Deleted Performance Goal')
        } else {
            alert('Could Not Delete')
        }
    };

    const handleUpdate = async () => {
        await props.update(form._id, form)
        if (!props.error) {
            alert('Successfully Updated Goal')
        } else {
            alert('Could not update')
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        if (name === 'completed') {
            setForm(prev=> {
                return { ...prev, [name]:checked }
            })
        } else if (name === 'number') {
            setForm(prev => {
                return { ...prev, improveBy: {...prev.improveBy, [name]: parseInt(value)}}
            })
        } else {
            setForm(prev=> {
                return { ...prev, [name]:value }
            });
        }
    };

    return (
            <>
            <form>
                <fieldset>
                    <legend>{props.performance.description}</legend>
                        <label htmlFor="completed" >
                            {props.performance.completed === true ? 'You finished it, way to go' : 'Not Done Yet'}
                        </label>
                        <input 
                            type="checkbox" 
                            name="completed" 
                            checked={form.completed}
                            onChange={handleChange}
                        />
                    <br></br>
                    <br></br>
                    <label htmlFor="dueDate">
                        Currently due on <time>{date.toLocaleDateString()}</time>
                    </label>
                    <input 
                        type='date'
                        value={form.dateDue}
                        name="dateDue" 
                        onChange={handleChange} 
                        required
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="reward">
                        How will you reward yourself?
                    </label>
                    <input 
                        type="text" 
                        name="reward" 
                        value={form.reward}

                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="punishment">
                        How will you hold yourself accountable?
                    </label>
                    <input 
                        type="text" 
                        name="punishment" 
                        value={form.punishment} 
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="percentImproved">
                        What percentage will you improve by?
                    </label>
                    <input 
                        type="number" 
                        name="number"  
                        value={form.improveBy.number}          
                        onChange={handleChange}
                        required
                    />
                    <br></br>
                    <br></br>
                    <Link to={`/processes/newProcess/${props.oId}/${props.performance._id}`}>
                        <button>
                            Add Process Goal
                        </button>
                    </Link>
                    <br></br>
                    <br></br>
                    <button 
                        type="button"
                        className='update'
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    
                    <button 
                        type='button'
                        className="warning"
                        onClick={()=> setShow(!show)}
                    >
                        Delete
                    </button>
                {props.performance.processGoals.length > 0 && (
                    <Link to={`/performances/${form._id}/${props.oId}`}>
                        Show Process Goals
                    </Link>
                )}
                </fieldset>
                {!form._id && <p>Loading...</p>}
                {props.error && <p className='error'>{props.error}</p>}
                {show && (
                    <Modal 
                        title={`Delete ${form.description}?`} 
                        onClose={()=> setShow(!show)} 
                        onProceed={handleDelete} 
                        isOpened={show}
                        children={<h1>hello</h1>}
                    />
                )}
            </form>
        </>
    )
};

export default PerfList