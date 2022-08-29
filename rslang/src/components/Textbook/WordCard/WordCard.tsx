import React, { Component } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ReactLearnWordsAPI, URLBASE } from '../../API/getWords';
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
        wordTranslate: card.wordTranslate
      });
    });
  }

  updateCard() {
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
      wordTranslate
    } = this.state;
    if (!id) {
      return <div>Loaded...</div>;
    }
    const wordAndTranscriptionAndTranslate = `${word} - ${transcription} - ${wordTranslate}`;
    const audioSrc = `${URLBASE}/${audio}`;
    const audioMeaningSrc = `${URLBASE}/${audioMeaning}`;
    const audioExampleSrc = `${URLBASE}/${audioExample}`;
    return (
      <Card className={classes.wordCard} key={id}>
        <CardMedia
          component="img"
          alt={word}
          height="140"
          src={`${URLBASE}/${image}`}
          className={classes.wordCardCardImg}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" height={'70px'}>
            {wordAndTranscriptionAndTranslate}
          </Typography>
          <AudioCard
            id={id}
            audio={audioSrc}
            audioMeaning={audioMeaningSrc}
            audioExample={audioExampleSrc}
            func={this.props.func}
          />
          <div className={classes.text}>
            <div dangerouslySetInnerHTML={{ __html: textMeaning }} />
            <Typography variant="body2" color="text.secondary" height={'60px'}>
              {textMeaningTranslate}
            </Typography>
          </div>
          <div className={classes.text}>
            <div dangerouslySetInnerHTML={{ __html: textExample }} />
            <Typography variant="body2" color="text.secondary" height={'50px'}>
              {textExampleTranslate}
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}