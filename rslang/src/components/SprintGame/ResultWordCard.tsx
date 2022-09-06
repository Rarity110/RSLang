import React from 'react';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import classes from './SprintGame.module.scss';
import { Button } from '@mui/material';
import { BASEURL_API } from '../../consts/consts';

interface IResWordProps {
  audio: string | undefined;
  word: string | undefined;
  wordTranslate: string | undefined;
}

export const ResWordCard: React.FC<IResWordProps> = (props) => {
  const audio = new Audio(BASEURL_API + '/' + props.audio);

  const start = () => {
    audio.play();
  };

  return (
    <div className={classes.resultWordCard}>
      <Button
        variant="outlined"
        component="span"
        startIcon={<SpatialAudioOffIcon />}
        onClick={start}></Button>
      <div className={classes.resultWordSubCard}>
        <p className={classes.resWord}>{props.word}</p>
      </div>

      <div className={classes.resultWordSubCard}>
        <p className={classes.resWord}>{props.wordTranslate}</p>
      </div>
    </div>
  );
};
