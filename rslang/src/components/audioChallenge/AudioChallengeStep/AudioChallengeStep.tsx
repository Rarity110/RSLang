import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AudioChallengeProgress, AudioChallengeWord } from '../../../types/audioChallenge';
import { getResultText } from '../utility/utility';
import { BASEURL_API } from '../../../consts/consts';
import classes from './AudioChallengeStep.module.scss';

interface AudioChallengeStepProps {
  word: AudioChallengeWord;
  resultHandler: (obj: AudioChallengeWord) => void;
  progress: AudioChallengeProgress;
}

const AudioChallengeStep = ({
  resultHandler,
  progress,
  word: wordObj,
  word: { audio, options, image, word, transcription }
}: AudioChallengeStepProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [complete, setComplete] = useState<boolean>(false);

  useEffect(() => {
    setResult(null);
    setComplete(false);
    audioClickHandler();
  }, [wordObj]);

  const classNameStepResult = () => {
    if (result) return classes.stepResultCorrect;
    if (result === false) return classes.stepResultIncorrect;
    return '';
  };

  const audioClickHandler = () => {
    audioRef.current?.play();
  };

  const optionClickHandler = (result: boolean) => {
    setResult(result);
    setComplete(true);
  };

  const nextClickHandler = () => {
    if (result !== null) {
      resultHandler({ ...wordObj, result });
    }
  };

  return (
    <Box className={`${classes.step} ${classNameStepResult()}`}>
      <Box className={classes.stepAudio}>
        <audio src={`${BASEURL_API}/${audio}`} ref={audioRef} />

        <Typography align="center" variant="body2" color="text.disabled" gutterBottom>
          {progress.current} из {progress.total}
        </Typography>

        {!complete && (
          <IconButton
            aria-label="Play audio"
            color="primary"
            className={classes.stepAudioBtn}
            onClick={audioClickHandler}>
            <VolumeUpIcon fontSize="inherit" />
          </IconButton>
        )}

        {complete && (
          <>
            <img src={`${BASEURL_API}/${image}`} alt="" className={classes.stepAudioImg} />
            <Typography variant="h4" color={result ? 'success.main' : 'error.main'}>
              {word}
            </Typography>
            <Box className={classes.stepAudioWordAdditional}>
              <Typography variant="subtitle1" color="text.secondary">
                {transcription}
              </Typography>
              <IconButton
                aria-label="Play audio"
                onClick={audioClickHandler}
                className={classes.stepAudioSmallBtn}>
                <VolumeUpIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </>
        )}
      </Box>

      <Box className={classes.stepOptions}>
        {options.map((option, i) => {
          const classNameResult = option.result ? 'stepOptionCorrect' : 'stepOptionIncorrect';
          const classNameOption = complete
            ? `${classes.stepOption} ${classes[classNameResult]}`
            : classes.stepOption;

          return (
            <Button
              key={option.key}
              variant="outlined"
              className={classNameOption}
              disabled={complete}
              onClick={() => {
                optionClickHandler(option.result);
              }}>
              <Typography className={classes.stepOptionPrefix} color="text.secondary">
                {i + 1}
              </Typography>
              {option.wordTranslate}
            </Button>
          );
        })}
      </Box>

      <Box className={classes.stepResultText}>
        {complete && (
          <>
            {result === false && <CancelIcon color="error" />}
            {result === true && <CheckCircleIcon color="success" />}
            <Typography color={result ? 'success.main' : 'error.main'}>
              {getResultText(result as boolean)}
            </Typography>
          </>
        )}
      </Box>

      <Box className={classes.stepSkip}>
        {!complete && (
          <Button
            className={classes.stepSkipBtn}
            onClick={() => {
              optionClickHandler(false);
            }}
            fullWidth>
            Не знаю
          </Button>
        )}
        {complete && (
          <Button
            variant="contained"
            className={classes.stepSkipBtn}
            onClick={nextClickHandler}
            endIcon={<ArrowRightAltIcon />}
            fullWidth>
            Далее
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AudioChallengeStep;
