import React, {useCallback, useEffect} from 'react';

import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";



//@ts-ignore
function Modal(props) {
    const root = document.querySelector('#modals')
//@ts-ignore
    const escClickHandler = useCallback((e) => {
        if(e.keyCode === 27 && props.isOpen){
            props.toggleModal()
        }
        else{
            e.preventDefault()
        }
    }, [props])

    useEffect(() => {

        document.addEventListener('keydown', escClickHandler)

        return () => {
            document.removeEventListener('keydown', escClickHandler)
        }
    }, [escClickHandler])

    const modal = (
        <>
            <div className={`${styles.modal} ${props.isOpen ? styles.showModal : ''} pt-10 pr-10 pl-10`}>
                <div className={styles.modalHeader}>
                    <h1 className="text text_type_main-large">{props.headerText}</h1>
                    <div className={styles.modalClose} onClick={props.toggleModal}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                    {props.children}
            </div>
            <ModalOverlay toggleModal={props.toggleModal} isOpen={props.isOpen}/>
        </>
    )
    //@ts-ignore
    return ReactDOM.createPortal(modal, root)
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    headerText: PropTypes.string,
    children: PropTypes.object
}


export default Modal;