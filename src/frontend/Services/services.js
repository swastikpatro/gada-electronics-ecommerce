import axios from 'axios';

export const loginUserService = async (userData) => {
  const response = await axios.post('/api/auth/login', {
    // email, password
    ...userData,
  });

  if (response.status === 200 || response.status === 201) {
    const { firstName, lastName, email } = response.data.foundUser;
    const { encodedToken } = response.data;

    // console.log({ userData });
    // console.log(response);

    return {
      username: `${firstName} ${lastName}`,
      email,
      token: encodedToken,
    };
  }
};

export const signupService = async (userData) => {
  const response = await axios.post('/api/auth/signup', {
    // email, password, firstName, lastName
    ...userData,
  });

  if (response.status === 200 || response.status === 201) {
    const { firstName, lastName, email } = response.data.createdUser;
    const { encodedToken } = response.data;

    return {
      username: `${firstName} ${lastName}`,
      email,
      token: encodedToken,
    };
  }
};
