// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  CartPage,
  Checkout,
  ErrorPage,
  Home,
  LoginPage,
  ProductListingPage,
  Profile,
  SharedLayout,
  SignupPage,
  SingleProductPage,
  WishListPage,
} from './frontend/pages';

import Mockman from 'mockman-js';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './frontend/components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <ToastContainer
          position='top-left'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />

        <Routes>
          <Route path='*' element={<ErrorPage />} />

          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />} />

            <Route path='products' element={<ProductListingPage />} />

            <Route path='products/:productId' element={<SingleProductPage />} />

            <Route path='products' element={<ProductListingPage />} />

            <Route path='checkout' element={<Checkout />} />

            <Route
              path='cart'
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
            <Route
              path='wishlist'
              element={
                <PrivateRoute>
                  <WishListPage />
                </PrivateRoute>
              }
            />
            <Route
              path='profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            {/* requires auth */}
          </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/mockman' element={<Mockman />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
