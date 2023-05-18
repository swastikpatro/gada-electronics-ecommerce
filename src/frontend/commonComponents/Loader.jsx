import React from 'react';

const Loader = ({ text, isLoadingState }) => {
  return isLoadingState ? <span className='loader-2'></span> : text;
};

export default Loader;
