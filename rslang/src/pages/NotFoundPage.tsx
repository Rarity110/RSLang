import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import NotFound from '../components/NotFound/NotFound';
import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';

const NotFoundPage = () => {
  const { isAuthorized } = useContext(AuthorizeContext);

  return (
    <Box display="flex" flexDirection="column" style={{ minHeight: '100vh' }}>
      <Header {...{ isAuthorized }} withoutShadow />
      <NotFound />
      <Footer />
    </Box>
  );
};

export default NotFoundPage;
