import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header/Header';
import StartSection from '../components/home/StartSection/StartSection';

const HomePage = () => {
  return (
    <>
      <Header />
      <Container>
        <StartSection />
        {/*<AdvantageApp />*/}
        {/*<AboutDevTeam />*/}
      </Container>
      {/*<Footer />*/}
    </>
  );
};

export default HomePage;
