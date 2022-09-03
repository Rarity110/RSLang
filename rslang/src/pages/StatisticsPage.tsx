import React, { useContext } from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header/Header';
// import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';
import { Context } from '../components/Textbook/Context';

const StatisticsPage = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <>
      <Header {...{ isAuthorized }} />
      <Container>
        <Box mt={4}>Статистика</Box>
      </Container>
    </>
  );
};

export default StatisticsPage;
