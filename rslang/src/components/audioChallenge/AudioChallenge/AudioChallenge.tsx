import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import AudioChallengeGame from '../AudioChallengeGame/AudioChallengeGame';
import { AudioChallengeWord } from '../../../types/audioChallenge';
import { getWordsOptions } from '../utility/utility';
import classes from './AudioChallenge.module.scss';
import { words } from './temp-words';

const AudioChallenge = () => {
  const [gameWords, setGameWords] = useState<AudioChallengeWord[]>([]);

  useEffect(() => {
    // TODO: тут получаем список слов words через API
    const optionsList = getWordsOptions(words);
    const wordsExpand: AudioChallengeWord[] = words.map((word, i) => ({
      ...word,
      isComplete: false,
      result: false,
      options: optionsList[i]
    }));

    setGameWords(wordsExpand);
  }, []);

  return (
    <Box className={classes.game}>
      <Container className={classes.gameContainer}>
        {gameWords.length > 0 && <AudioChallengeGame words={gameWords} />}
      </Container>
    </Box>
  );
};

export default AudioChallenge;
