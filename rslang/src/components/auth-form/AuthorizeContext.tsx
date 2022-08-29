import React, { createContext, useState } from 'react';

interface IFormContext {
  isAuthorized: boolean;
  authorize: () => void;
  logout: () => void;
}

export interface IAuthorize {
  isAuthorized: boolean;
}
const emptyObj = {} as IAuthorize;

export const AuthorizeContext = createContext<IFormContext>({
  isAuthorized: localStorage.getItem('loginRSLang') ? true : false,
  authorize: () => emptyObj,
  logout: () => emptyObj
});

export const AuthorizeState = ({ children }: { children: React.ReactNode }) => {
  const check = localStorage.getItem('loginRSLang') ? true : false;
  const [isAuthorized, setAuthorize] = useState(check);

  const authorize = () => setAuthorize(true);
  const logout = () => setAuthorize(false);

  return (
    <AuthorizeContext.Provider value={{ isAuthorized, authorize, logout }}>
      {children}
    </AuthorizeContext.Provider>
  );
};
