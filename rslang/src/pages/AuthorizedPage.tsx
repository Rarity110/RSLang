import React, { useContext } from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header/Header';
import { AuthForm } from '../components/auth-form';
import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';

const AuthorizedPage = () => {
  const { isAuthorized } = useContext(AuthorizeContext);
  return (
    <>
      <Header {...{ isAuthorized }} />
      <Container>
        <Box mt={4}>
          <AuthForm />
        </Box>
      </Container>
    </>
  );
};

export default AuthorizedPage;
