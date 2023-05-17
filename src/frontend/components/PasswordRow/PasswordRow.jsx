import React, { useState } from 'react';
import styles from './PasswordRow.module.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const PasswordRow = ({ text, handleChange, value, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  return (
    <div className={`form-row ${styles.passwordRow}`}>
      <label className='form-label' htmlFor='password'>
        {text}
      </label>
      <input
        className='form-input'
        type={showPassword ? 'text' : 'password'}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <button onClick={handleToggle}>
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </div>
  );
};

export default PasswordRow;
