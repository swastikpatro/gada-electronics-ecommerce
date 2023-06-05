import { createContext, useContext, useEffect, useState } from 'react';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/utils';
import { LOCAL_STORAGE_KEYS } from '../constants/constants';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    getFromLocalStorage(LOCAL_STORAGE_KEYS.User)
  );
  const [token, setToken] = useState(
    getFromLocalStorage(LOCAL_STORAGE_KEYS.Token)
  );

  const updateUserAuth = ({ user, token }) => {
    setUser(user);
    setToken(token);
  };

  useEffect(() => {
    if (user) {
      setUser((prev) => ({ ...prev, cart: [], wishlist: [] }));

      setIntoLocalStorage(LOCAL_STORAGE_KEYS.User, {
        ...user,
        cart: [],
        wishlist: [],
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, updateUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
