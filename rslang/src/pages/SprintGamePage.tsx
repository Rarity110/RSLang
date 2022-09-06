import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header/Header';
import { SprintGame } from '../components/SprintGame/SprintGame';

const SprintGamePage = () => {
  return (
    <>
      <Header />
      <Container>
        <Box mt={4}>
          <SprintGame />
        </Box>
      </Container>
    </>
  );
};

export default SprintGamePage;
