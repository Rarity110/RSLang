import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import AudioChallenge from '../components/audioChallenge/AudioChallenge/AudioChallenge';
import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';

const AudioChallengePage = () => {
  const { isAuthorized } = useContext(AuthorizeContext);

  return (
    <>
      <Header {...{ isAuthorized }} />
      <AudioChallenge />
    </>
  );
};

export default AudioChallengePage;
