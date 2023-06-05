import React, { useState } from 'react';
import styles from './PasswordRow.module.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const PasswordRow = ({
  text,
  handleChange,
  value,
  name,
  placeholder,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`form-row ${styles.passwordRow}`}>
      <label className='form-label' htmlFor={name}>
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
        required={true}
        disabled={disabled}
      />
      {/* toggling this does not submit the form (that wraps this PasswordRow Component), bcoz of type='button' */}
      <button type='button' onClick={handleToggle}>
        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </button>
    </div>
  );
};

export default PasswordRow;
