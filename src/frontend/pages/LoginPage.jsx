import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FormRow,
  LoginAndSignupLayout,
  PasswordRow,
  Title,
} from '../components';
import { ToastType, localStorageKeys, testUser } from '../constants/constants';
import { useState } from 'react';
import { loginUserService } from '../Services/services';
import { setIntoLocalStorage, toastHandler } from '../utils/utils';
import { Loader } from '../commonComponents';
import { useAuthContext } from '../contexts/AuthContextProvider';

const userType = {
  GuestClick: 'guest',
  RegisterClick: 'registered',
};

const LoginPage = () => {
  const { updateUserAuth } = useAuthContext();
  const navigate = useNavigate();
  const initialLoginState = {
    email: '',
    password: '',
  };
  const [userInputs, setUserInputs] = useState(initialLoginState);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const locationOfLogin = useLocation();

  const handleUserInput = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  // previous code commented 👇

  // const handleLogin = async () => {
  //   setIsFormLoading(true);
  //   try {
  //     const data = await loginUserService(userInputs);
  //     // update AuthContext with userData
  //     updateUserAuth(data);
  //     // show success toast
  //     toastHandler(ToastType.Success, `Welcome ${data.username} 😎`);
  //     // if user comes from typing '/login' at the url, redirect it to '/'
  //     navigate(locationOfLogin?.state?.from ?? '/');
  //   } catch (error) {
  //     // console.log(error.response.status);
  //     // not registered !!
  //     toastHandler(
  //       ToastType.Error,
  //       error.response.data.errors[0].split('.')[0]
  //     );

  //     // not registered, redirect it to signup !!
  //     navigate('/signup');
  //   }
  // };

  // const handleGuestLogin = async () => {
  //   setUserInputs(testUser);
  //   setIsFormLoading(true);
  //   try {
  //     const data = await loginUserService(testUser);

  //     // update AuthContext with testUser data
  //     updateUserAuth(data);
  //     // show success toast
  //     toastHandler(ToastType.Success, `Welcome ${data.username} 😎`);
  //     // if user comes from typing '/login' at the url, redirect it to '/'
  //     navigate(locationOfLogin?.state?.from ?? '/');
  //     return;
  //   } catch (error) {
  //     // console.log(error.response.status);
  //     toastHandler(
  //       ToastType.Error,
  //       error.response.data.errors[0].split('.')[0]
  //     );
  //   }
  // };

  const handleSubmit = async (e, clickType) => {
    e.preventDefault();
    const isGuestClick = clickType === userType.GuestClick;
    if (isGuestClick) {
      setUserInputs(testUser);
    }
    setIsFormLoading(true);
    const userInfo = isGuestClick ? testUser : userInputs;

    try {
      const data = await loginUserService(userInfo);

      // update AuthContext with data
      updateUserAuth(data);

      // store this data in localStorage
      setIntoLocalStorage(localStorageKeys.User, data);

      // show success toast
      toastHandler(ToastType.Success, `Welcome ${data.username} 😎`);
      // if non-registered user comes from typing '/login' at the url, after success redirect it to '/'
      navigate(locationOfLogin?.state?.from ?? '/');
    } catch (error) {
      // console.log(error.response.status);
      toastHandler(ToastType.Error, error.response.data.errors[0]);

      if (!isGuestClick) {
        // not registered, redirect it to signup !!

        // user journey
        // '/wishlist' (protectedRoute) -->
        // '/login' (login fails, so user should sign up) -->
        // '/signup' after successful signup -->
        // '/wishlist'

        // if the non-registered user comes from wishlist and if his login fails, then pass that '/wishlist' state from loginPage's state to the signup page state, so the signup page can access it and after successful signup, and user goes to wishlist..
        navigate('/signup', {
          state: { from: locationOfLogin?.state?.from ?? '/' },
        });
      }
    }
  };

  return (
    <LoginAndSignupLayout>
      <Title>Login</Title>

      <form onSubmit={(e) => handleSubmit(e, userType.RegisterClick)}>
        <FormRow
          text='Email Address'
          type='email'
          name='email'
          id='email'
          placeholder='jethalal@gada.com'
          value={userInputs.email}
          handleChange={handleUserInput}
          disabled={isFormLoading}
        />
        <PasswordRow
          text='Enter Password'
          name='password'
          id='password'
          placeholder='babitaji1234'
          value={userInputs.password}
          handleChange={handleUserInput}
          disabled={isFormLoading}
        />

        <button
          disabled={isFormLoading}
          className='btn btn-block'
          type='submit'
          // onClick={handleLogin}
        >
          <Loader isLoadingState={isFormLoading} text='Login' />
        </button>
      </form>

      {/* this Guest Login button is out of the form  */}
      <button
        disabled={isFormLoading}
        className='btn btn-block'
        onClick={(e) => handleSubmit(e, userType.GuestClick)}
      >
        <Loader isLoadingState={isFormLoading} text='Login as a guest' />
      </button>

      <div>
        <span>
          Don't have an account? <Link to='/signup'>sign up</Link>
        </span>
      </div>
    </LoginAndSignupLayout>
  );
};

export default LoginPage;
