import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAuthContext }from '../../hooks/useAuthContext';
import useOutcome from '../../hooks/useOutcome';



const OutcomeForm : React.FC  = () => {
    const { create, error, isLoading } = useOutcome();
    const { user } = useAuthContext();
    const [form, setForm] = useState({
        dateDue: '',
        punishment: '',
        reward: '',
        description: '',
        complete: false,
        performanceGoals: [],
        userId: user._id
    });

    const date = new Date();
    let [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];

    const stringDate = () => {
        month = month + 1
        if (month > 9 && day > 9) {
            return `${year}-${month}-${day}`
        }
        if (month > 9) {
            return `${year}-${month}-0${day}`
        }
        if(day > 9) {
            return `${year}-0${month}-${day}`
        }

        return `${year}-0${month}-0${day}`
    };

    const string = stringDate();
    
    const handleForm = async (e:FormEvent) => {
        e.preventDefault();
        let temp : object = {...form, dateDue : new Date(form.dateDue), performanceGoals: []}
        await create(temp);
        if(!error && !isLoading) {
            setForm({
                dateDue: '',
                punishment: '',
                reward: '',
                description: '',
                complete: false,
                performanceGoals: [],
                userId: user._id
            })
            alert('Goal created')
        }
    };

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((prev)=> {
            return {
                ...prev,
                [name]: value 
            }
        })
    };

    const reset = () => {
        setForm({
            dateDue: '',
            punishment: '',
            reward: '',
            description: '',
            complete: false,
            performanceGoals: [],
            userId: user._id
        })
    };

    return (
        <form onSubmit={handleForm}>
            <fieldset>
            <label>
                What's the Goal?
            </label>
            <br></br>
            <input 
                type="text" 
                name="description" 
                onChange={handleChange}
                minLength={10}
                value={form.description}
                placeholder={' '}
                required
            />
            <br></br>
            <br></br>
            <label>
                {'When\'s it Due?'}
            </label>
            <br></br>
            <input 
                type="date" 
                name="dateDue" 
                min={string}
                value={form.dateDue}
                placeholder={' '}
                onChange={handleChange}
                required
            />
            <br></br>
            <br></br>
            <label>
                How will you reward yourself?
            </label>
            <br></br>
            <input 
                type="text" 
                name="reward" 
                onChange={handleChange}
                minLength={10}
                value={form.reward}
                placeholder={' '}
                required
            />
            <br></br>
            <br></br>
            <label>
                How will you hold yourself accountable?
            </label>
            <br></br>
            <input 
                type="text" 
                name="punishment" 
                value={form.punishment}
                onChange={handleChange}
                minLength={10}
                placeholder={' '}
                required
            />
            <br></br>
            <br></br>
            <button type="submit" className="go">Submit</button>
            <button type='reset' className='warning' onClick={reset}>Clear</button>
            {error && <p className='error'>{error}</p>}
            {isLoading && <p className="loading">Loading...</p>}
            </fieldset>
        </form>
    )
};

export default OutcomeForm;