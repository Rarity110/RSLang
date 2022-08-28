import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import { App } from '../components/Textbook/App/App';
import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';

export const TextbookPage = (): JSX.Element => {
  const { isAuthorized } = useContext(AuthorizeContext);
  return (
    <>
      <Header {...{ isAuthorized }} withoutShadow withoutLogo />
      <App />
    </>
  );
};
