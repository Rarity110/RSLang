import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { AudioChallengeWord } from '../../../types/audioChallenge';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import classes from './AudioChallengeResult.module.scss';
import AudioChallengeResultWord from '../AudioChallengeResultWord/AudioChallengeResultWord';

interface AudioChallengeREsultProps {
  words: AudioChallengeWord[];
}

const AudioChallengeResult = ({ words }: AudioChallengeREsultProps) => {
  const correctWords = words.filter((word) => word.result);
  const incorrectWords = words.filter((word) => !word.result);

  return (
    <Box className={classes.result}>
      <Typography variant="h4" color="primary">
        Верных ответов
      </Typography>

      <Typography variant="h2" color="primary" gutterBottom>
        {(correctWords.length * 100) / words.length}%
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper className={classes.resultPanel}>
            <Box className={classes.resultPanelHeader}>
              <Typography>Верно</Typography>
              <Typography>
                {correctWords.length} из {words.length}
              </Typography>
            </Box>
            {correctWords.length > 0 &&
              correctWords.map((word, i) => (
                <AudioChallengeResultWord key={`${word.id}${i}`} word={word} />
              ))}

            {correctWords.length === 0 && (
              <Box className={classes.resultEmpty}>
                <SentimentVeryDissatisfiedIcon className={classes.resultEmptyIcon} />
                <Typography>Тут пусто</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.resultPanel}>
            <Box className={classes.resultPanelHeader}>
              <Typography>Ошибки</Typography>
              <Typography>
                {incorrectWords.length} из {words.length}
              </Typography>
            </Box>
            {incorrectWords.length > 0 &&
              incorrectWords.map((word, i) => (
                <AudioChallengeResultWord key={`${word.id}${i}`} word={word} />
              ))}

            {incorrectWords.length === 0 && (
              <Box className={classes.resultEmpty}>
                <SentimentSatisfiedAltIcon className={classes.resultEmptyIcon} />
                <Typography>Тут пусто</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AudioChallengeResult;
