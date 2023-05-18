import Navbar from './Navbar/Navbar';

const LoginAndSignupLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='page-without-navHeight grid-center'>
        <div className='form'>{children}</div>
      </main>
    </>
  );
};

export default LoginAndSignupLayout;
