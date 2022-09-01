import React, { useState } from 'react';
import { Box, Button, FormControl, MenuItem, Typography, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SchoolIcon from '@mui/icons-material/School';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { AudioChallengeStartParam } from '../../../types/audioChallenge';
import { BookGroupName, BookGroupNameShort } from '../../../types/api';
import classes from './AudioChallengeWelcome.module.scss';

interface AudioChallengeWelcomeProps {
  startParam: false | AudioChallengeStartParam;
  startHandler: (level: string) => void;
}

const levelList = [0, 1, 2, 3, 4, 5];

const AudioChallengeWelcome = ({ startParam, startHandler }: AudioChallengeWelcomeProps) => {
  const [level, setLevel] = useState<string>('');

  const levelChangeHandler = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const goClickHandler = () => {
    startHandler(level);
  };

  return (
    <Box className={classes.welcome}>
      <Typography variant="h4" color="primary">
        Игра «Аудиовызов»
      </Typography>

      <Box className={classes.welcomeSkills}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <SchoolIcon color="warning" />
          <Typography color="text.secondary">Позволяет запоминать новые слова</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <RecordVoiceOverIcon color="warning" />
          <Typography color="text.secondary">Улучшает восприятие английского на слух</Typography>
        </Box>

        <Box className={classes.welcomeRules}>
          <Typography className={classes.welcomeRule}>
            Во время игры ты услышишь слово на английском языке. Тебе нужно будет выбрать правильный
            перевод для этого слова среди предложенных вариантов (при помощи мыши или клавиатуры).
          </Typography>
          <Typography className={classes.welcomeRule}>
            После ответа помимо возможности прослушивания слова, ты увидишь его написание,
            транскрипцию и правильный перевод
          </Typography>
        </Box>
      </Box>

      <Box className={classes.welcomeGame}>
        {startParam === false && (
          <Box className={classes.welcomeLevel}>
            <Typography color="text.secondary" gutterBottom>
              Выбери уровень сложности
            </Typography>
            <FormControl size="medium" fullWidth>
              <Select value={level} onChange={levelChangeHandler}>
                {levelList.map((item) => (
                  <MenuItem value={`${item}`} key={item}>
                    {BookGroupName[item]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {startParam !== false && (
          <Box className={classes.welcomeBookLevel}>
            <Typography color="text.secondary">Электронный учебник</Typography>
            <Typography color="text.secondary">
              глава {BookGroupNameShort[startParam.group]} страница {startParam.page + 1}
            </Typography>
          </Box>
        )}

        <Box className={classes.welcomeGo}>
          <Button
            variant="contained"
            size="large"
            className={classes.welcomeGoBtn}
            disabled={startParam === false ? !level : false}
            onClick={goClickHandler}
            endIcon={<ArrowRightAltIcon />}
            fullWidth>
            Начать игру
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

AudioChallengeWelcome.defaultProps = {
  startParam: false
};

export default AudioChallengeWelcome;
