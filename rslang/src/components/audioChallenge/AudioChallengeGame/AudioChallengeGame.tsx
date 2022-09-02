import React, { useEffect, useState } from 'react';
import { AudioChallengeWord } from '../../../types/audioChallenge';
import AudioChallengeStep from '../AudioChallengeStep/AudioChallengeStep';
import AudioChallengeResult from '../AudioChallengeResult/AudioChallengeResult';

interface AudioChallengeGameProps {
  words: AudioChallengeWord[];
  restartHandler: () => void;
}

const AudioChallengeGame = ({ words, restartHandler }: AudioChallengeGameProps) => {
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

      {currentIndex >= endIndex && (
        <AudioChallengeResult words={resultWords} restartHandler={restartHandler} />
      )}
    </>
  );
};

export default AudioChallengeGame;
