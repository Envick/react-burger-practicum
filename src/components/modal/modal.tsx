import React, {FC, useCallback, useEffect} from 'react';

import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModalProps {
    isOpen: boolean,
    headerText?: string,
    toggleModal: () => void,
    headerSize?: string
}
const root: HTMLElement | null = document.querySelector('#modals')

const  Modal: FC<IModalProps> = ({isOpen, headerSize = 'large',  headerText, toggleModal, children}) => {
    const escClickHandler = useCallback((e: KeyboardEvent) => {
        if(e.key === 'Escape' && isOpen){
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
            <div className={`${styles.modal} ${isOpen ? `${styles.showModal} show` : 'hide'} pt-5 pr-10 pl-10 modal`}>
                <div className={styles.modalHeader}>
                    <h1 className={`text text_type_main-${headerSize}`}>{headerText}</h1>
                    <div className={styles.modalClose} onClick={toggleModal}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                    {children}
            </div>
            <ModalOverlay toggleModal={toggleModal} isOpen={isOpen}/>
        </>
    )
    return root && ReactDOM.createPortal(modal, root)
}

export default Modal;