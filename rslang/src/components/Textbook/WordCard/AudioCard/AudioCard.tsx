import React, { Component } from 'react';
import VolumeDownSharpIcon from '@mui/icons-material/VolumeDownSharp';

interface IAudio {
  audio: string;
  audioMeaning: string;
  audioExample: string;
  isPlaying: boolean;
}

export class AudioCard extends Component<IAudio> {
  state = {
    play: false,
    isPlaying: false
  };

  componentDidMount() {
    this.setState({
      isPlaying: this.props.isPlaying
    });
  }

  componentDidUpdate(prevProps: IAudio) {
    if (this.props.isPlaying !== prevProps.isPlaying) {
      this.updateIsPlaying();
    }
  }

  updateIsPlaying() {
    const isPlaying = this.state.isPlaying;
    this.setState({
      isPlaying: !isPlaying
    });
  }

  render() {
    const { audio, audioMeaning, audioExample } = this.props;
    const audioList = [new Audio(audio), new Audio(audioMeaning), new Audio(audioExample)];
    let play = false;
    const toggleAudio = () => {
      if (!play) {
        play = true;
        this.updateIsPlaying();
        audioList[0].play();
        audioList[0].addEventListener('ended', () => audioList[1].play());
        audioList[1].addEventListener('ended', () => audioList[2].play());
        audioList[2].addEventListener('ended', () => this.updateIsPlaying());
      } else {
        play = false;
        audioList.forEach((audio) => {
          audio.pause();
          this.updateIsPlaying();
        });
      }
    };
    return (
      <>
        <VolumeDownSharpIcon onClick={toggleAudio} />
      </>
    );
  }
}
