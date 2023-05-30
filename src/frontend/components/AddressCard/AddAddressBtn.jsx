import React from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';
import styles from './AddressCard.module.css';

const AddAddressBtn = ({ openForm }) => {
  return (
    <button onClick={openForm} className={styles.addAddressBtn}>
      <AiFillPlusSquare />

      <span>Add new address</span>
    </button>
  );
};

export default AddAddressBtn;
