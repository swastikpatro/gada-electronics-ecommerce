import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FormRow,
  LoginAndSignupLayout,
  PasswordRow,
  Title,
} from '../components';
import { useFormInput, useNavigateIfRegistered } from '../hooks';
import { setIntoLocalStorage, toastHandler } from '../utils/utils';
import { ToastType, LOCAL_STORAGE_KEYS } from '../constants/constants';
import { useState } from 'react';
import { signupService } from '../Services/services';
import { useAuthContext } from '../contexts/AuthContextProvider';

const SignupPage = () => {
  const signupPageLocation = useLocation();
  const { updateUserAuth, user } = useAuthContext();

  const navigate = useNavigate();
  useNavigateIfRegistered(user);

  const { userInputs, handleInputChange } = useFormInput({
    firstName: '',
    lastName: '',
    email: '',
    passwordMain: '',
    passwordConfirm: '',
  });

  const [isSignupFormLoading, setIsSignupFormLoading] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (userInputs.passwordMain !== userInputs.passwordConfirm) {
      toastHandler(
        ToastType.Error,
        'Password and Confirm Password inputs did not match!'
      );
      return;
    }

    const { email, firstName, lastName, passwordMain: password } = userInputs;

    setIsSignupFormLoading(true);

    try {
      const { user, token } = await signupService({
        email,
        password,
        firstName,
        lastName,
      });

      // update AuthContext with data
      updateUserAuth({ user, token });

      // store this data in localStorage
      setIntoLocalStorage(LOCAL_STORAGE_KEYS.User, user);
      setIntoLocalStorage(LOCAL_STORAGE_KEYS.Token, token);

      // show success toast
      toastHandler(ToastType.Success, `Sign up successful`);

      // if user directly comes to '/signup' from url, so state will be null, after successful registration, user should be directed to home page
      navigate(signupPageLocation?.state?.from ?? '/');
    } catch (error) {
      toastHandler(ToastType.Error, error.response.data.errors[0]);

      console.error(error.response);
    }

    setIsSignupFormLoading(false);
  };

  //  if user is registered and trying to Signup '/signup' through url, show this and navigate to home using useNavigateIfRegistered().
  if (!!user) {
    return <main className='full-page'></main>;
  }

  return (
    <LoginAndSignupLayout>
      <Title>Signup</Title>

      <form onSubmit={handleCreateAccount}>
        <FormRow
          text='First Name'
          type='text'
          name='firstName'
          id='firstName'
          placeholder='Jethalal'
          value={userInputs.firstName}
          handleChange={handleInputChange}
          disabled={isSignupFormLoading}
        />
        <FormRow
          text='Last Name'
          type='text'
          name='lastName'
          id='lastName'
          placeholder='Gada'
          value={userInputs.lastName}
          handleChange={handleInputChange}
          disabled={isSignupFormLoading}
        />

        <FormRow
          text='Email Address'
          type='email'
          name='email'
          id='email'
          placeholder='jethalal@gada.com'
          value={userInputs.email}
          handleChange={handleInputChange}
          disabled={isSignupFormLoading}
        />

        <PasswordRow
          text='Enter Password'
          name='passwordMain'
          id='passwordMain'
          placeholder='babitaji1234'
          value={userInputs.passwordMain}
          handleChange={handleInputChange}
          disabled={isSignupFormLoading}
        />
        <PasswordRow
          text='Confirm Password'
          name='passwordConfirm'
          id='passwordConfirm'
          placeholder=''
          value={userInputs.passwordConfirm}
          handleChange={handleInputChange}
          disabled={isSignupFormLoading}
        />

        <button className='btn btn-block' type='submit'>
          {isSignupFormLoading ? (
            <span className='loader-2'></span>
          ) : (
            'Create New Account'
          )}
        </button>
      </form>

      <div>
        <span>
          Already Registered ? <Link to='/login'>login</Link>
        </span>
      </div>
    </LoginAndSignupLayout>
  );
};

export default SignupPage;
