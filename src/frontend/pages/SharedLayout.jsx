import { Outlet, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';
import specsSvg from '../assets/specs.svg';

const SharedLayout = () => {
  const { isDataLoading, isDataError } = useAllProductsContext();
  const navigate = useNavigate();

  if (isDataError) {
    navigate('*');
  }

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
