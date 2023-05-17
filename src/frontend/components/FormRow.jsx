import React from 'react';

const FormRow = ({ text, type, handleChange, value, placeholder, name }) => {
  return (
    <div className='form-row'>
      <label className='form-label' htmlFor={name}>
        {text}
      </label>
      <input
        className='form-input'
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
