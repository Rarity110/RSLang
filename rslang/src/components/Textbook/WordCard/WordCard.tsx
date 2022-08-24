import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { ReactLearnWordsAPI } from '../../API/getWords';
import classes from './WordCard.module.scss';
import { IID } from '../consts';

export class WordCard extends Component<IID> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();

  state = {
    id: this.props.id,
    word: '',
    image: '',
    audio: null,
    audioMeaning: null,
    audioExample: null,
    textMeaning: '',
    textExample: '',
    transcription: '',
    textExampleTranslate: '',
    textMeaningTranslate: '',
    wordTranslate: ''
  };

  componentDidMount() {
    this.updateCard();
  }

  updateCard() {
    const id = this.state.id;
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
      // audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      transcription,
      textExampleTranslate,
      textMeaningTranslate,
      wordTranslate
    } = this.state;

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
            {word}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {transcription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {wordTranslate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Значение
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {textMeaning}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {textMeaningTranslate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Пример
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {textExample}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {textExampleTranslate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Audio</Button>
          <Button size="small">{audioMeaning}</Button>
          <Button size="small">{audioExample}</Button>
        </CardActions>
      </Card>
    );
  }
}
