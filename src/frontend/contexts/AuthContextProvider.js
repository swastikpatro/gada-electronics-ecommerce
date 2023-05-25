import { createContext, useContext, useState } from 'react';
import { getFromLocalStorage } from '../utils/utils';
import { localStorageKeys } from '../constants/constants';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const userInLocalStorage = getFromLocalStorage(localStorageKeys.User);
  const [user, setUser] = useState(userInLocalStorage) ?? null;

  const updateUserAuth = (userDataObj) => setUser(userDataObj);

  return (
    <AuthContext.Provider value={{ user, updateUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
