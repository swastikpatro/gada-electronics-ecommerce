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
  const {
    status,
    data: { product },
  } = await axios.get(`/api/products/${productID}`);

  // if user types - 'localhost/products/xyz', using useParams, I am getting productID and passing it to 'this service'.
  // then this proudctID is used to 'get' the data from backend.
  // but in the backend, no product with such '_id' (i.e. xyz) exists.
  // so backend returns null.
  /*
  {
    status: 200,
    data: {
      product: null;
    }
  }
  */

  // to handle that thrown a error, which will give control to catch block and error state becomes true and will show error on screen.

  if (!product) {
    throw new Error('Error: Product not found!');
  }

  if (status === 200 || status === 201) {
    return product;
  }
};
