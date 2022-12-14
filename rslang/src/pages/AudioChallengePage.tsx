import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import AudioChallenge from '../components/audioChallenge/AudioChallenge/AudioChallenge';
import { Context } from '../components/App/Context';

const AudioChallengePage = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <>
      <Header {...{ isAuthorized }} />
      <AudioChallenge />
    </>
  );
};

export default AudioChallengePage;
