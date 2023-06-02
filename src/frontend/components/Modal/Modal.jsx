import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ children, closeModal }) => {
  return createPortal(
    <div onClick={closeModal} className={styles.modal}>
      {children}
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
