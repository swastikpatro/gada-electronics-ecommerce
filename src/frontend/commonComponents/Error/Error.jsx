import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Error.module.css';
import errorImg from '../../assets/jethalal-error.png';

const Error = ({ errorText }) => {
  return (
    <div className={`half-page container ${styles.error}`}>
      <h3>{errorText}</h3>

      <div className={styles.imgContainer}>
        <img src={errorImg} alt='error' />
      </div>

      <Link to='/' className='btn btn-padding-desktop'>
        Go back to Home
      </Link>
    </div>
  );
};

export default Error;
