import React, { Component } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ReactLearnWordsAPI } from '../../API/getWords';
import classes from './WordCard.module.scss';
import { IID, IStateCard } from '../consts';
import { AudioCard } from './AudioCard/AudioCard';

export class WordCard extends Component<IID> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();

  state = {} as IStateCard;

  componentDidMount() {
    const id = this.props.id;
    this.reactLearnWordsAPI.getWord(id).then((card) => {
      this.setState({
        id: card.id,
        word: card.word,
        image: card.image as string,
        audio: card.audio,
        audioMeaning: card.audioMeaning,
        audioExample: card.audioExample,
        textMeaning: card.textMeaning,
        textExample: card.textExample,
        transcription: card.transcription,
        textExampleTranslate: card.textExampleTranslate,
        textMeaningTranslate: card.textMeaningTranslate,
        wordTranslate: card.wordTranslate,
        isPlaying: false
      });
    });
    // await this.updateCard();
    // this.setState({
    //   isPlaying: false
    // });
  }

  async updateCard() {
    const id = this.props.id;
    this.reactLearnWordsAPI.getWord(id).then((card) => {
      this.setState({
        id: card.id,
        word: card.word,
        image: card.image as string,
        audio: card.audio,
        audioMeaning: card.audioMeaning,
        audioExample: card.audioExample,
        textMeaning: card.textMeaning,
        textExample: card.textExample,
        transcription: card.transcription,
        textExampleTranslate: card.textExampleTranslate,
        textMeaningTranslate: card.textMeaningTranslate,
        wordTranslate: card.wordTranslate
      });
    });
  }

  render() {
    const {
      id,
      word,
      image,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      transcription,
      textExampleTranslate,
      textMeaningTranslate,
      wordTranslate,
      isPlaying
    } = this.state;
    if (!id) {
      return <div>Loaded...</div>;
    }
    const wordAndTranscriptionAndTranslate = `${word} - ${transcription} - ${wordTranslate}`;
    const audioSrc = `http://localhost:8081/${audio}`;
    const audioMeaningSrc = `http://localhost:8081/${audioMeaning}`;
    const audioExampleSrc = `http://localhost:8081/${audioExample}`;
    // console.log(audioSrc, audioMeaningSrc, audioExampleSrc);
    return (
      <Card className={classes.wordCard} key={id}>
        <CardMedia
          component="img"
          alt={word}
          height="140"
          src={`http://localhost:8081/${image}`}
          className={classes.wordCardCardImg}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {wordAndTranscriptionAndTranslate}
            <AudioCard
              audio={audioSrc}
              audioMeaning={audioMeaningSrc}
              audioExample={audioExampleSrc}
              isPlaying={isPlaying}
            />
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: textMeaning }} />
          <Typography variant="body2" color="text.secondary">
            {textMeaningTranslate}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: textExample }} />
          <Typography variant="body2" color="text.secondary">
            {textExampleTranslate}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Audio</Button>
          <Button size="small">{audioMeaning}</Button>
          <Button size="small">{audioExample}</Button>
        </CardActions> */}
      </Card>
    );
  }
}
