import React, {FC, useCallback, useEffect} from 'react';

import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModalProps {
    isOpen: boolean,
    headerText?: string,
    toggleModal: () => void
}

const Modal: FC<IModalProps> = ({isOpen, headerText, toggleModal, children}) => {
    const root: HTMLElement | null = document.querySelector('#modals')
    const escClickHandler = useCallback((e) => {
        if(e.keyCode === 27 && isOpen){
            toggleModal()
        }
        else{
            e.preventDefault()
        }
    }, [isOpen, toggleModal])

    useEffect(() => {

        document.addEventListener('keydown', escClickHandler)

        return () => {
            document.removeEventListener('keydown', escClickHandler)
        }
    }, [escClickHandler])

    const modal = (
        <>
            <div className={`${styles.modal} ${isOpen ? styles.showModal : ''} pt-10 pr-10 pl-10`}>
                <div className={styles.modalHeader}>
                    <h1 className="text text_type_main-large">{headerText}</h1>
                    <div className={styles.modalClose} onClick={toggleModal}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                    {children}
            </div>
            <ModalOverlay toggleModal={toggleModal} isOpen={isOpen}/>
        </>
    )
    //@ts-ignore
    return ReactDOM.createPortal(modal, root)
}

export default Modal;