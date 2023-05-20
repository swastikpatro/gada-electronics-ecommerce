import { Outlet, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';
import specsSvg from '../assets/specs.svg';
import { useEffect } from 'react';

const SharedLayout = () => {
  const { isDataLoading } = useAllProductsContext();
  // const navigate = useNavigate();

  // this didnot work, so commented out,

  // if (isDataError) {
  //   // console.log({ isDataError });
  //   navigate('*');
  //   return;
  // }

  // Link: used to resolve (https://stackoverflow.com/questions/72160276/warning-cannot-update-a-component-browserrouter-while-rendering-a-different)

  // DOUBT
  // useEffect(() => {
  //   if (isDataError) {
  //     navigate('*');
  //     return;
  //   }
  //   // eslint-disable-next-line
  // }, [isDataError]);

  if (isDataLoading) {
    return (
      <div className='full-page grid-center'>
        <div>
          <img src={specsSvg} className='specs-loader' alt='specs' />
          <p className='text-center font-size-2 primary-color-text'>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default SharedLayout;
