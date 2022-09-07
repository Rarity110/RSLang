import React, { useContext } from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header/Header';
import { SprintGame } from '../components/SprintGame/SprintGame';
import { Context } from '../components/App/Context';

const SprintGamePage = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <>
      <Header {...{ isAuthorized }} />
      <Container>
        <Box mt={4}>
          <SprintGame />
        </Box>
      </Container>
    </>
  );
};

export default SprintGamePage;
