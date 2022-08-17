import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header/Header';

const HomePage = () => {
  return (
    <>
      <Header />
      <Container>
        <Box mt={4}>Главная страница</Box>
      </Container>
    </>
  );
};

export default HomePage;
