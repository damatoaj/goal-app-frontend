import React, { MouseEvent, useRef, ReactNode, useEffect } from 'react';

type Props = {
    title: string;
    isOpened: boolean;
    onProceed: ()=> void;
    onClose: ()=> void;
    children: ReactNode | null
}
const Modal = ({
    title,
    isOpened,
    onProceed,
    onClose,
    children
}: Props) => {
    const dialog : any = useRef(null);

    useEffect(()=> {
        if (isOpened) {
            dialog.current?.showModal();

        } else {
            dialog.current?.close()
        }
    }, [isOpened])

    return (
        <dialog ref={dialog}>
            <h1>{title}</h1>
            {children}
            <button className='go' onClick={onProceed}>Yes</button>
            <button className='warning' onClick={onClose}>No</button>
        </dialog>
    )
};

export default Modal;