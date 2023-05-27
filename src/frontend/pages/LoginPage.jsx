import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FormRow,
  LoginAndSignupLayout,
  PasswordRow,
  Title,
} from '../components';
import {
  ToastType,
  localStorageKeys,
  testUser,
  userTypeForLogin,
} from '../constants/constants';
import { useState } from 'react';
import { loginUserService } from '../Services/services';
import { setIntoLocalStorage, toastHandler } from '../utils/utils';
import { Loader } from '../commonComponents';
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
  const [isFormLoading, setIsFormLoading] = useState(false);
  const locationOfLogin = useLocation();

  const handleUserInput = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  // used for both the buttons
  const handleSubmit = async (e, clickType) => {
    e.preventDefault();
    const isGuestClick = clickType === userTypeForLogin.GuestClick;
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
      toastHandler(ToastType.Error, 'User Not Found, Please Register 🙏');
    }

    setIsFormLoading(false);
  };

  //  if user is registered and trying to login through url, show this and navigate to home using useNavigateIfRegistered().
  if (!!user) {
    return <main className='full-page'></main>;
  }

  return (
    <LoginAndSignupLayout>
      <Title>Login</Title>

      <form onSubmit={(e) => handleSubmit(e, userTypeForLogin.RegisterClick)}>
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

        <button
          disabled={isFormLoading}
          className='btn btn-block'
          onClick={(e) => handleSubmit(e, userTypeForLogin.GuestClick)}
        >
          <Loader isLoadingState={isFormLoading} text='Login as a guest' />
        </button>
      </form>

      {/* this Guest Login button is out of the form  */}

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
