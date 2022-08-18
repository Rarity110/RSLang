import React from 'react';
import Header from '../components/Header/Header';
import StartSection from '../components/home/StartSection/StartSection';
import AboutApp from '../components/home/AboutApp/AboutApp';

const HomePage = () => {
  return (
    <>
      <Header />

      <StartSection />
      <AboutApp />

      {/*<AboutDevTeam />*/}
      {/*<Footer />*/}
    </>
  );
};

export default HomePage;
