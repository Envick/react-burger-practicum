import React from 'react';

import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

//@ts-ignore
function ModalOverlay({isOpen, toggleModal}) {
    return (
        <div onClick={toggleModal} className={`${styles.modalOverlay} ${isOpen && styles.showOverlay}`}></div>
    );
}

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func
}

export default ModalOverlay;