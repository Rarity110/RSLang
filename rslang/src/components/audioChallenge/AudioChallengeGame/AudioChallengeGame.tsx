import React, { useContext, useEffect, useState } from 'react';
import { AudioChallengeWord, AudioChallengeWordResult } from '../../../types/audioChallenge';
import AudioChallengeStep from '../AudioChallengeStep/AudioChallengeStep';
import AudioChallengeResult from '../AudioChallengeResult/AudioChallengeResult';
import { updateWordAfterGame } from '../../../utility/games';
import { Context } from '../../App/Context';

interface AudioChallengeGameProps {
  words: AudioChallengeWord[];
  restartHandler: () => void;
}

const AudioChallengeGame = ({ words, restartHandler }: AudioChallengeGameProps) => {
  const endIndex = words.length;
  const { allUserWords } = useContext(Context);
  const [currentIndex, setCurrenIndex] = useState(0);
  const [resultWords, setResultWords] = useState<AudioChallengeWord[]>([]);
  const [sendResult, setSendResult] = useState<boolean>(false);

  useEffect(() => {
    const setResult = async () => {
      const resultTotal: { learnedCount: number; newCount: number } = {
        learnedCount: 0,
        newCount: 0
      };

      const resultArrayPromise = resultWords.map(async (word) => {
        const gameWord: AudioChallengeWordResult = { ...word };
        delete gameWord.options;
        delete gameWord.isComplete;
        delete gameWord.result;

        return updateWordAfterGame(allUserWords, gameWord, word.result);
      });

      const resultsArray = await Promise.all(resultArrayPromise);
      resultsArray.map((item) => {
        resultTotal.learnedCount += item.isLearned ? 1 : 0;
        resultTotal.newCount += item.isNew ? 1 : 0;
      });

      // console.log(resultTotal);
      // TODO запись результатов в статистику
    };

    if (currentIndex === endIndex && !sendResult) {
      setSendResult(true);
      setResult().catch(console.error);
    }
  }, [currentIndex, resultWords]);

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
