import { Link } from 'react-router-dom';
import {
  FormRow,
  LoginAndSignupLayout,
  PasswordRow,
  Title,
} from '../components';
import { useState } from 'react';

// text, type, handleChange, placeholder

const LoginPage = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    console.log(userInput);
  };

  console.log(userInput.email);

  return (
    <LoginAndSignupLayout>
      <Title>Login</Title>

      <FormRow
        text='Email Address'
        type='email'
        name='email'
        id='email'
        placeholder='jethalal@gada.com'
        value={userInput.email}
        handleChange={handleInputChange}
      />
      <PasswordRow
        text='Enter Password'
        name='password'
        id='password'
        placeholder='babitaji1234'
        value={userInput.password}
        handleChange={handleInputChange}
      />

      {/* <div className='form-row'>
        <label className='form-label' htmlFor='password'>
          Password
        </label>
        <input
          className='form-input'
          type='password'
          name='password'
          id='password'
          placeholder='babitaji1234'
        />
      </div> */}

      <button className='btn btn-block' onClick={handleLogin}>
        Login
      </button>
      <button className='btn btn-block'>Login as a guest</button>

      <div>
        <span>
          Don't have an account? <Link to='/signup'>sign up</Link>
        </span>
      </div>
    </LoginAndSignupLayout>
  );
};

export default LoginPage;
