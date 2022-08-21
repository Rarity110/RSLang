import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import StartSection from '../components/home/StartSection/StartSection';
import AboutApp from '../components/home/AboutApp/AboutApp';
import AboutDevTeam from '../components/home/AboutDevTeam/AboutDevTeam';
import Footer from '../components/Footer/Footer';
import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';

const HomePage = () => {
  const { isAuthorized } = useContext(AuthorizeContext);
  return (
    <>
      <Header {...{ isAuthorized }} withoutShadow withoutLogo />

      <StartSection />
      <AboutApp />
      <AboutDevTeam />

      <Footer />
    </>
  );
};

export default HomePage;
