import axios from 'axios';

export const loginUserService = async (userData) => {
  const response = await axios.post('/api/auth/login', {
    // email, password
    ...userData,
  });

  if (response.status === 200 || response.status === 201) {
    const { encodedToken, foundUser } = response.data;

    return {
      user: foundUser,
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
    const { encodedToken, createdUser } = response.data;

    return {
      user: createdUser,
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

export const getProductsOnSearch = async ({ query }) => {
  const res = await axios.get(`/api/products/search?query=${query}`);

  return res.data.products.models;
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

export const postAddToCartService = async (productToAdd, token) => {
  const response = await axios.post(
    '/api/user/cart',
    { product: productToAdd },
    { headers: { authorization: token } }
  );

  const { cart } = response.data;
  const { status } = response;
  if (status === 200 || status === 201) {
    return cart;
  }
};

export const deleteFromCartService = async (productId, token) => {
  const response = await axios.delete(`/api/user/cart/${productId}`, {
    headers: { authorization: token },
  });

  const { cart } = response.data;
  const { status } = response;
  if (status === 200 || status === 201) {
    return cart;
  }
};

export const incDecItemInCartService = async ({
  productId,
  token,
  type,
  colorBody,
}) => {
  const response = await axios.post(
    `/api/user/cart/${productId}`,
    {
      action: { type, colorBody },
    },
    { headers: { authorization: token } }
  );

  const { cart } = response.data;
  const { status } = response;
  if (status === 200 || status === 201) {
    return cart;
  }
};

export const postAddToWishlistService = async (productToAdd, token) => {
  const response = await axios.post(
    '/api/user/wishlist',
    { product: productToAdd },
    { headers: { authorization: token } }
  );
  const { wishlist } = response.data;
  const { status } = response;
  if (status === 200 || status === 201) {
    return wishlist;
  }
};

export const deleteFromWishlistService = async (productId, token) => {
  const response = await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: { authorization: token },
  });

  const { wishlist } = response.data;
  const { status } = response;
  if (status === 200 || status === 201) {
    return wishlist;
  }
};

export const deleteCartDataService = async (token) => {
  const response = await axios.delete('/api/user/cart', {
    headers: { authorization: token },
  });

  const { cart } = response.data;
  const { status } = response;
  if (status === 200 || status === 201) {
    return cart;
  }
};

export const deleteWishlistDataService = async (token) => {
  const response = await axios.delete('/api/user/wishlist', {
    headers: { authorization: token },
  });

  const { wishlist } = response.data;
  const { status } = response;
  if (status === 200 || status === 201) {
    return wishlist;
  }
};
