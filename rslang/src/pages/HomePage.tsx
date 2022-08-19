import React from 'react';
import Header from '../components/Header/Header';
import StartSection from '../components/home/StartSection/StartSection';
import AboutApp from '../components/home/AboutApp/AboutApp';
import AboutDevTeam from '../components/home/AboutDevTeam/AboutDevTeam';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Header />

      <StartSection />
      <AboutApp />
      <AboutDevTeam />

      <Footer />
    </>
  );
};

export default HomePage;
