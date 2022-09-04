import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Box, Container, Snackbar } from '@mui/material';
import AudioChallengeWelcome from '../AudioChallengeWelcome/AudioChallengeWelcome';
import AudioChallengeGame from '../AudioChallengeGame/AudioChallengeGame';
import {
  arrayRandomSort,
  getRandomArrayUniqueIndexes,
  getRandomPage,
  getWordsOptions
} from '../utility/utility';
import { getPageWords } from '../../API/api';
import { WordItem } from '../../../types/api';
import { GameRouteParam } from '../../../types/props';
import { AudioChallengeWord } from '../../../types/audioChallenge';
import { Context } from '../../Textbook/Context';
import classes from './AudioChallenge.module.scss';

const MAX_GAME_WORDS = 20;

const AudioChallenge = () => {
  const location = useLocation();
  const { allUserWords } = useContext(Context);
  const [gameWords, setGameWords] = useState<AudioChallengeWord[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [bookParam, setBookParam] = useState<false | GameRouteParam>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (location.state) {
      const params = location.state as GameRouteParam;
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
          const hardWords = allUserWords.filter((word) => word.userWord?.difficulty === 'hard');

          if (hardWords.length === 0) {
            setError('Нет не изученных сложных слов');
            return;
          }

          if (hardWords.length > MAX_GAME_WORDS) {
            const hardIndexes = getRandomArrayUniqueIndexes(hardWords.length, MAX_GAME_WORDS);
            words = hardIndexes.map((index) => hardWords[index]);
          } else {
            words = hardWords;
          }
        }
        // обычные главы
        else {
          const pageWords = await getPageWords(group, page);
          const learnWordIds = allUserWords
            .filter((word) => word.userWord?.difficulty === 'learned')
            .map((word) => word.id);
          const pageWordsWithoutLearned = pageWords.filter(
            (word) => !learnWordIds.includes(word.id)
          );

          if (pageWordsWithoutLearned.length === 0) {
            setError('На этой странице нет не изученных слов');
            return;
          }
          words = pageWordsWithoutLearned;
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
    setBookParam(false);
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
