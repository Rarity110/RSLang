import React, { useEffect, useState } from 'react';
import { Alert, Box, Container, Snackbar } from '@mui/material';
import AudioChallengeWelcome from '../AudioChallengeWelcome/AudioChallengeWelcome';
import AudioChallengeGame from '../AudioChallengeGame/AudioChallengeGame';
import { AudioChallengeStartParam, AudioChallengeWord } from '../../../types/audioChallenge';
import {
  arrayRandomSort,
  getLocalStorageBookParams,
  getRandomPage,
  getWordsOptions
} from '../utility/utility';
import { ROUTE_PARAM_MODE_BOOK } from '../../../consts/consts';
import classes from './AudioChallenge.module.scss';
import { getPageWords } from '../../API/api';
import { WordItem } from '../../../types/api';

interface AudioChallengeProps {
  mode: string | undefined;
}

const AudioChallenge = ({ mode }: AudioChallengeProps) => {
  const [gameWords, setGameWords] = useState<AudioChallengeWord[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [bookParam, setBookParam] = useState<false | AudioChallengeStartParam>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (mode === ROUTE_PARAM_MODE_BOOK) {
      const params = getLocalStorageBookParams();
      setBookParam(params);
    }
  }, []);

  const startHandler = async (level: string) => {
    let words: WordItem[] = [];

    try {
      setError('');

      // учебник
      if (bookParam) {
        const { group, page } = bookParam;
        // сложные слова
        if (group === 6) {
          // TODO сделать - получение сложных слов
        }
        // обычные главы
        else {
          words = await getPageWords(group, page);
        }
      }
      // из меню
      else {
        const group = parseInt(level);
        const page = getRandomPage();
        words = await getPageWords(group, page);
      }

      const optionsList = getWordsOptions(words);
      const wordsExpand: AudioChallengeWord[] = words
        .map((word, i) => ({
          ...word,
          isComplete: false,
          result: false,
          options: optionsList[i]
        }))
        .sort(arrayRandomSort);

      setGameWords(wordsExpand);
      setStart(true);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message);
    }
  };

  const restartHandler = () => {
    setError('');
    setStart(false);
  };

  return (
    <Box className={classes.game}>
      <Container className={classes.gameContainer}>
        {!start && <AudioChallengeWelcome startHandler={startHandler} bookParam={bookParam} />}
        {gameWords.length > 0 && start && (
          <AudioChallengeGame words={gameWords} restartHandler={restartHandler} />
        )}
        {error !== '' && (
          <Snackbar
            open
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}>
            <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
              Error! {error}
            </Alert>
          </Snackbar>
        )}
      </Container>
    </Box>
  );
};

export default AudioChallenge;
