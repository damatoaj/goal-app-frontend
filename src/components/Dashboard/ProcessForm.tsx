import axios from 'axios';
import React, {ChangeEvent, FormEvent, useState} from 'react'
import { useParams } from 'react-router-dom';

const ProcessForm: React.FC  = () => {
    const { oid, pid } = useParams();
    const [form, setForm] = useState({
        action: '',
        duration:  0,
        dUnit: 'MIN',
        frequency: 0,
        fUnit: 'DAILEY',
        repeats: false,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit= async(e:FormEvent) => {
        e.preventDefault();
        if (form.action.length < 10) return 
        setIsLoading(true);
        setError('');
        
        try{
            await axios.post(`${process.env.REACT_APP_URL}/outcomes/${oid}/performances/${pid}/processes`, {
                action: form.action,
                duration: {
                    number: form.duration,
                    time: form.dUnit
                },
                frequency: {
                    number: form.frequency,
                    time: form.fUnit
                },
                repeats: form.repeats,
            });
           
            setIsLoading(false);
            setError('');
            reset();
        } catch(err : any) {
            console.error(err);
            setIsLoading(false);
            setError(err.message);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        if (name === 'repeats') {
            setForm(prev => {
                return {...prev, [name]:checked}
            })
        } else {
            setForm(prev => {
                return {...prev, [name]: value}
            })
        }
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => {
            return {...prev, [name]:value}
        })
    };

    const reset = () => {
        setForm({
            action: '',
            duration:  0,
            dUnit: 'MIN',
            frequency: 0,
            fUnit: 'DAILEY',
            repeats: false,
        })
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <fieldset>
                <legend>New Process Goal</legend>
                    <label htmlFor="action">
                        Action
                    </label>
                    <br></br>
                    <input 
                        type="text" 
                        name="action"
                        minLength={10}
                        value={form.action}
                        onChange={handleChange}
                        required
                        placeholder=' '
                        defaultValue=''
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="duration">
                        Duration
                    </label>
                    <br></br>
                    <input 
                        type="number" 
                        name="duration"
                        min='0'
                        value={form.duration}
                        onChange={handleChange}
                        required
                        placeholder=' '
                    />
                    <select name='dUnit' onChange={handleSelect}>
                        <option value="MIN">Mins</option>
                        <option value="HRS">Hrs</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label htmlFor="frequency">
                        Frequency
                    </label>
                    <br></br>
                    <input 
                        type="number" 
                        name="frequency" 
                        min='0'
                        value={form.frequency}
                        onChange={handleChange}
                        required
                        placeholder=' '
                    />
                    <select name="fUnit" onChange={handleSelect}>
                        <option value="DAILEY">Per Day</option>
                        <option value="WEEKLY">Per Week</option>
                        <option value="MONTHLY">Per Month</option>
                        <option value="YEARLY">Per Year</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label htmlFor="repeats">
                        Repeats
                    </label>
                    <br></br>
                    <input 
                        type="checkbox" 
                        name="repeats"
                        checked={form.repeats}
                        onChange={handleChange}
                    />
                    <br></br>
                    <br></br>
                    <button 
                        type='submit'
                        className='go'
                    >
                        Submit
                    </button>
                    <button
                        type='button'
                        onClick={reset}
                        className='warning'
                    >
                        Clear
                    </button>
                    {isLoading && <p>Loading...</p>}
                    {error && <p className='error'>{error}</p>}
                </fieldset>
            </form>
    )
};

export default ProcessForm;