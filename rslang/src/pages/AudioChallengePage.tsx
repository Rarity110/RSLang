import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import AudioChallenge from '../components/audioChallenge/AudioChallenge/AudioChallenge';
import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';

const AudioChallengePage = () => {
  const { isAuthorized } = useContext(AuthorizeContext);
  const { mode } = useParams();

  return (
    <>
      <Header {...{ isAuthorized }} />
      <AudioChallenge mode={mode} />
    </>
  );
};

export default AudioChallengePage;
