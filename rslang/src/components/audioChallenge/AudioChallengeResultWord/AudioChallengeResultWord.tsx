import React, { useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import classes from './AudioChallengeResultWord.module.scss';
import { BASEURL_API } from '../../../consts/consts';
import { AudioChallengeWord } from '../../../types/audioChallenge';

interface AudioChallengeResultWordProps {
  word: AudioChallengeWord;
}

const AudioChallengeResultWord = ({
  word: { word, wordTranslate, audio, result }
}: AudioChallengeResultWordProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioClickHandler = () => {
    audioRef.current?.play();
  };

  return (
    <Box className={classes.word}>
      <audio src={`${BASEURL_API}/${audio}`} ref={audioRef} />
      <IconButton
        aria-label="Play audio"
        onClick={audioClickHandler}
        className={classes.wordAudioBtn}>
        <VolumeUpIcon fontSize="inherit" />
      </IconButton>
      <Typography component="span" color={result ? 'success.main' : 'error.main'} fontWeight="bold">
        {word}
      </Typography>
      <Typography component="span" color="text.secondary">
        — {wordTranslate}
      </Typography>
    </Box>
  );
};

export default AudioChallengeResultWord;
