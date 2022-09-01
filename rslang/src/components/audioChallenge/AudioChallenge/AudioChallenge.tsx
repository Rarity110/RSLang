import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import AudioChallengeWelcome from '../AudioChallengeWelcome/AudioChallengeWelcome';
import AudioChallengeGame from '../AudioChallengeGame/AudioChallengeGame';
import { AudioChallengeStartParam, AudioChallengeWord } from '../../../types/audioChallenge';
import { getLocalStorageBookParams, getWordsOptions } from '../utility/utility';
import { ROUTE_PARAM_MODE_BOOK } from '../../../consts/consts';
import classes from './AudioChallenge.module.scss';
import { words } from './temp-words';

interface AudioChallengeProps {
  mode: string | undefined;
}

const AudioChallenge = ({ mode }: AudioChallengeProps) => {
  const [gameWords, setGameWords] = useState<AudioChallengeWord[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [startParam, setStartParam] = useState<false | AudioChallengeStartParam>(false);

  useEffect(() => {
    if (mode === ROUTE_PARAM_MODE_BOOK) {
      const bookParam = getLocalStorageBookParams();
      setStartParam(bookParam);
    }
  }, []);

  const startHandler = (level: string) => {
    console.log(level);
    // TODO: тут получаем список слов words через API в зависимости от параметров и выбранного уровня
    const optionsList = getWordsOptions(words);
    const wordsExpand: AudioChallengeWord[] = words.map((word, i) => ({
      ...word,
      isComplete: false,
      result: false,
      options: optionsList[i]
    }));

    setGameWords(wordsExpand);

    // если все ок, то начинаем игру, если нет, то выводим ошибку
    setStart(true);
  };

  return (
    <Box className={classes.game}>
      <Container className={classes.gameContainer}>
        {!start && <AudioChallengeWelcome startHandler={startHandler} startParam={startParam} />}
        {gameWords.length > 0 && start && <AudioChallengeGame words={gameWords} />}
      </Container>
    </Box>
  );
};

export default AudioChallenge;
