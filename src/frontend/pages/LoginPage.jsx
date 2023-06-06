import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FormRow,
  LoginAndSignupLayout,
  PasswordRow,
  Title,
} from '../components';
import {
  TEST_USER,
  ToastType,
  LOCAL_STORAGE_KEYS,
  LOGIN_CLICK_TYPE,
} from '../constants/constants';
import { useState } from 'react';
import { loginUserService } from '../Services/services';
import { setIntoLocalStorage, toastHandler } from '../utils/utils';

import { useAuthContext } from '../contexts/AuthContextProvider';
import { useNavigateIfRegistered } from '../hooks';

const LoginPage = () => {
  const { updateUserAuth, user } = useAuthContext();
  const navigate = useNavigate();

  useNavigateIfRegistered(user);

  const initialLoginState = {
    email: '',
    password: '',
  };
  const [userInputs, setUserInputs] = useState(initialLoginState);
  const [activeBtnLoader, setActiveBtnLoader] = useState('');
  const locationOfLogin = useLocation();

  const handleUserInput = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  // used for both the buttons
  const handleSubmit = async (e, clickType) => {
    e.preventDefault();

    const isGuestClick = clickType === LOGIN_CLICK_TYPE.GuestClick;
    const userInfo = isGuestClick ? TEST_USER : userInputs;

    setActiveBtnLoader(clickType);

    if (isGuestClick) {
      setUserInputs(TEST_USER);
    }

    try {
      const { user, token } = await loginUserService(userInfo);

      // update AuthContext with data
      updateUserAuth({ user, token });

      // store this data in localStorage
      setIntoLocalStorage(LOCAL_STORAGE_KEYS.User, user);
      setIntoLocalStorage(LOCAL_STORAGE_KEYS.Token, token);

      // show success toast
      toastHandler(
        ToastType.Success,
        `Welcome ${user.firstName} ${user.lastName} 😎`
      );
      // if non-registered user comes from typing '/login' at the url, after success redirect it to '/'
      navigate(locationOfLogin?.state?.from ?? '/');
    } catch ({ response }) {
      const errorText = response?.data?.errors[0].split('.')[0];
      toastHandler(ToastType.Error, errorText);
    }

    setActiveBtnLoader('');
  };

  //  if user is registered and trying to login through url, show this and navigate to home using useNavigateIfRegistered().
  if (!!user) {
    return <main className='full-page'></main>;
  }

  return (
    <LoginAndSignupLayout>
      <Title>Login</Title>

      <form onSubmit={(e) => handleSubmit(e, LOGIN_CLICK_TYPE.RegisterClick)}>
        <FormRow
          text='Email Address'
          type='email'
          name='email'
          id='email'
          placeholder='jethalal.gada@gmail.com'
          value={userInputs.email}
          handleChange={handleUserInput}
          disabled={!!activeBtnLoader}
        />
        <PasswordRow
          text='Enter Password'
          name='password'
          id='password'
          placeholder='babitaji1234'
          value={userInputs.password}
          handleChange={handleUserInput}
          disabled={!!activeBtnLoader}
        />

        <button
          disabled={!!activeBtnLoader}
          className='btn btn-block'
          type='submit'
        >
          {activeBtnLoader === LOGIN_CLICK_TYPE.RegisterClick ? (
            <span className='loader-2'></span>
          ) : (
            'Login'
          )}
        </button>

        {/* this Guest Login button is out of the form  */}
        <button
          disabled={!!activeBtnLoader}
          className='btn btn-block'
          onClick={(e) => handleSubmit(e, LOGIN_CLICK_TYPE.GuestClick)}
        >
          {activeBtnLoader === LOGIN_CLICK_TYPE.GuestClick ? (
            <span className='loader-2'></span>
          ) : (
            'Login as a guest'
          )}
        </button>
      </form>

      {/*
        * user journey
        * '/wishlist' (protectedRoute) -->  
        * '/login' (comes to login page, but thinks to sign up)
        * clicks Link to sign up
        * '/signup' after successful signup -->
        * '/wishlist'

        // if the non-registered user comes from wishlist and then user decides to signup, clicks the link of signup, then pass that '/wishlist' state from loginPage's state to the signup page state, so the signup page can access it and after successful signup, and user goes to wishlist..

        // (locationOfLogin?.state?.from) 
        // i.e. passing loginPage State to SignupPage State
      */}

      <div>
        <span>
          Don't have an account?{' '}
          <Link
            to='/signup'
            state={{ from: locationOfLogin?.state?.from ?? '/' }}
          >
            sign up
          </Link>
        </span>
      </div>
    </LoginAndSignupLayout>
  );
};

export default LoginPage;
