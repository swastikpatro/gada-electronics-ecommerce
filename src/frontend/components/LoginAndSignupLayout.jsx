import Navbar from './Navbar/Navbar';

const LoginAndSignupLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='page-without-navHeight grid-center'>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
          {children}
        </form>
      </main>
    </>
  );
};

export default LoginAndSignupLayout;
