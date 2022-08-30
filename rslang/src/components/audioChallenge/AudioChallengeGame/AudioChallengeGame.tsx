import React, { useEffect, useState } from 'react';
import { AudioChallengeWord } from '../../../types/audioChallenge';
import AudioChallengeStep from '../AudioChallengeStep/AudioChallengeStep';

interface AudioChallengeGameProps {
  words: AudioChallengeWord[];
}

const AudioChallengeGame = ({ words }: AudioChallengeGameProps) => {
  const endIndex = words.length;
  const [currentIndex, setCurrenIndex] = useState(0);
  const [resultWords, setResultWords] = useState<AudioChallengeWord[]>([]);

  useEffect(() => {
    if (currentIndex === endIndex) {
      // TODO тут должна быть запись результатов
    }
  }, [currentIndex]);

  const setStepResult = (wordResult: AudioChallengeWord) => {
    const wordComplete = { ...wordResult, isComplete: true };
    setResultWords((prev) => [...prev, wordComplete]);
    setCurrenIndex((prev) => prev + 1);
  };

  return (
    <>
      {currentIndex < endIndex && (
        <AudioChallengeStep
          word={words[currentIndex]}
          resultHandler={setStepResult}
          progress={{ current: currentIndex + 1, total: endIndex }}
        />
      )}

      {/*{currentIndex >= endIndex && (*/}
      {/*  <AudioChallengeStepResult word={resultWords} />*/}
      {/*)}*/}
    </>
  );
};

export default AudioChallengeGame;
