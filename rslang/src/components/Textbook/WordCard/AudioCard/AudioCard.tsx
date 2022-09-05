import React, { Component } from 'react';
import VolumeDownSharpIcon from '@mui/icons-material/VolumeDownSharp';
import classes from './AudioCard.module.scss';

interface IAudio {
  id: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  funcAudio: (audioList: HTMLAudioElement[]) => void;
}

export class AudioCard extends Component<IAudio> {
  audioList = [
    new Audio(this.props.audio),
    new Audio(this.props.audioMeaning),
    new Audio(this.props.audioExample)
  ];

  render() {
    return (
      <div className={classes.sound}>
        <VolumeDownSharpIcon onClick={() => this.props.funcAudio(this.audioList)} />
      </div>
    );
  }
}
