// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  CartPage,
  ErrorPage,
  Home,
  LoginPage,
  ProductListingPage,
  Profile,
  SharedLayout,
  SingleProductPage,
  WishListPage,
} from './frontend/pages';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />} />

            <Route path='products' element={<ProductListingPage />} />

            <Route path='products/:productId' element={<SingleProductPage />} />

            <Route path='products' element={<ProductListingPage />} />

            <Route path='cart' element={<CartPage />} />
            <Route path='wishlist' element={<WishListPage />} />
            <Route path='profile' element={<Profile />} />
          </Route>

          {/* requires auth */}
          <Route path='login' element={<LoginPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
