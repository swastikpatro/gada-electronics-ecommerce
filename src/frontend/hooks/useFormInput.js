import { useState } from 'react';

const useFormInput = (initialState) => {
  const [userInputs, setUserInputs] = useState(initialState);

  const handleInputChange = (e) =>
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });

  return {
    userInputs,
    handleInputChange,
  };
};

export default useFormInput;
