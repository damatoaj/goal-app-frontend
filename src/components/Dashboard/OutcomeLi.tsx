import React, { MouseEvent, useRef, useState } from 'react';
import {Outcome} from '../../interfaces/outcomeGoals.model';

import './li.css'

import Modal from '../Modal/Modal'
type liProps = {
    id : string;
    description: string;
    handleActive: (e:MouseEvent)=> void;
    deleteOutcome: (id:string)=> void;
    active: Outcome | null;
}

const OutcomeLi: React.FC <liProps> = (props) => {
    const [show, setShow] = useState<boolean>(false);


    const handleDelete = () => {
        setShow(false);
        props.deleteOutcome(props.id)
    };

    const handleShow = () => {
        setShow(!show)
    }
    return(
        <>
            <li className="sidebar-li">
                <h3 onClick={props.handleActive} id={props.id}>{props.description}</h3>
                <button 
                    className="error" 
                    onClick={handleShow}  
                    name={props.active?._id}
                    title='Delete Outcome Goal'
                >
                    x
                </button>
            </li>
            {show && (
                <Modal 
                    title="Are you sure?"
                    isOpened={show}
                    onProceed={handleDelete}
                    onClose={handleShow}
                    children={<h1>hello</h1>}
                />
            )}
        </>
    )
};

export default OutcomeLi;