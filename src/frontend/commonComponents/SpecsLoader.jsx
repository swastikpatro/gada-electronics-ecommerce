import React from 'react';
import specsSvg from '../assets/specs.svg';

const SpecsLoader = ({ text }) => {
  return (
    <div>
      <img src={specsSvg} className='specs-loader' alt='specs' />
      <p className='text-center font-size-2 primary-color-text'>{text}</p>
    </div>
  );
};

export default SpecsLoader;
