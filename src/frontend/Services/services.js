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

export const getAllProductsCategoriesService = async () => {
  const productsPromise = axios.get('/api/products');
  const categoriesPromise = axios.get('/api/categories');

  const [productsResponse, categoriesResponse] = await Promise.all([
    productsPromise,
    categoriesPromise,
  ]);
  // as this is Promise.all, any one the two promise fails, throws error, and control goes to catch!!
  const { products } = productsResponse.data;
  const { categories } = categoriesResponse.data;

  return { products, categories };
};

export const getSingleProductService = async (productID) => {
  // console.log({ productsResponse, categoriesResponse });
  const {
    status,
    data: { product },
  } = await axios.get(`/api/products/${productID}`);

  if (status === 200 || status === 201) {
    return product;
  }
};
