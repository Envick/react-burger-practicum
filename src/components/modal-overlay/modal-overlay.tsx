import React, {FC} from 'react';
import styles from './modal-overlay.module.css'

interface IModalOverlayProps {
    isOpen: boolean,
    toggleModal: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = ({isOpen, toggleModal}) => {
    return (
        <div onClick={toggleModal} className={`${styles.modalOverlay} ${isOpen && styles.showOverlay}`}/>
    );
}

export default ModalOverlay;