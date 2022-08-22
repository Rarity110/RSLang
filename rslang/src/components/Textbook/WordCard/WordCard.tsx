import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactLearnWordsAPI } from '../../API/getWords';
// import { IWordCard } from '../wordCards/consts';
// import { WordTypography } from './WordTypography';

interface IID {
  id: string;
}

export class WordCard extends Component<IID> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();

  state = {
    id: this.props.id,
    word: '',
    image: '',
    audio: null,
    audioMeaning: null,
    audioExample: null,
    textMeaning: null,
    textExample: null,
    transcription: null,
    textExampleTranslate: null,
    textMeaningTranslate: null,
    wordTranslate: null
  };

  componentDidMount() {
    this.updateCard();
  }

  updateCard() {
    const id = this.state.id;
    console.log(id);
    this.reactLearnWordsAPI.getWord(id).then((card) => {
      console.log(card);
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
      wordTranslate
    } = this.state;

    // const CardPart = function (value: string) {
    //   return (
    //     <Typography gutterBottom variant="h5" component="div">
    //       {value}
    //     </Typography>
    //   );
    // };

    return (
      <Card sx={{ maxWidth: 345 }} key={id}>
        <CardMedia
          component="img"
          alt={word}
          height="140"
          src={`http://localhost:8081/${image}`}
          // src={`https://rarity-rslang.herokuapp.com/${image}`}
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
