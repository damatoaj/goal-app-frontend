import React, { ChangeEvent, FormEvent, FormEventHandler, useRef, useState } from 'react'

import usePerformance  from '../../hooks/usePerformance';
import { useParams, useNavigate } from 'react-router-dom';

const PerformanceForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { create, error, isLoading} = usePerformance(id);
  
    const [form, setForm] = useState({
        description: '',
        reward: '',
        punishment: '',
        dateDue: '',
        complete: false,
        processGoals: [],
        improveBy: {
            number: '',
            unit: 'units'
        }
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

    const yyyyMMDD : string = stringDate();
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setForm(prev => {
            if (name === 'number') {
                return {
                    ...prev,
                    improveBy : {
                        ...prev.improveBy,
                        number:value,
                    }
                }
            } else {
                return {
                    ...prev,
                    [name]:value
                }
            }
        })
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => {
            return {
                ...prev, improveBy: { ...prev.improveBy, [name]:value}
            }
        })
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        await create(form)
        if (!error && !isLoading) {
            alert('Successfully Made Performance Goal');
            navigate(`/outcomes/${id}`)
        }
    }

    const reset = () => {
        setForm(prev => {
        return {
            ...prev,
            description: '',
            reward: '',
            dateDue: '',
            punishment: '',
            improveBy: {
                number: '',
                unit: 'units'
            }
        }
    })};

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="description">
                    What's the goal?
                </label>
                <br></br>
                <input 
                    type="text" 
                    name="description"
                    value={form.description} 
                    placeholder=' '
                    onChange={handleChange}
                    required
                />
                <br></br>
                <br></br>
                <label htmlFor="dueDate">
                    When's it due?
                </label>
                <br></br>
                <input 
                    type="date" 
                    name="dateDue"
                    min={yyyyMMDD}
                    value={form.dateDue}
                    placeholder={'mm/dd/yyyy'}
                    onChange={handleChange}
                    required
                />
                <br></br>
                <br></br>
                <label htmlFor="improveBy">
                    How much will you improve by?
                </label>
                <br></br>
                <input 
                    min='0'
                    type="number" 
                    name="number" 
                    value={form.improveBy.number}
                    onChange={handleChange}
                    placeholder=' '
                    required
                />
                <select 
                    defaultValue="units" 
                    name="unit"
                    value={form.improveBy.unit}
                    onChange={handleSelect}
                >
                    <option value="units">Units</option>
                    <option value="percent">Percent</option>
                    <option value="kg">KG</option>
                    <option value="l">L</option>
                </select>
                <br></br>
                <br></br>
                <label htmlFor="reward">
                    How will you reward yourself?
                </label>
                <br></br>
                <input 
                    type="text" 
                    name="reward" 
                    value={form.reward}
                    onChange={handleChange}
                    placeholder=' '
                    required
                />
                <br></br>
                <label htmlFor="punishment">
                    How will you hold yourself accountable?
                </label>
                <br></br>
                <input 
                    type="text" 
                    name="punishment" 
                    value={form.punishment}
                    onChange={handleChange}
                    placeholder=' '
                    required
                />
                <br></br>
                <br></br>
                <button type="submit" className="go">Add</button>
                <button className='warning' onClick={reset}>Clear</button>
                {error && <p className='error'>{error}</p>}
                {isLoading && <p>Loading...</p>}
            </fieldset>
        </form>
    )
};

export default PerformanceForm;