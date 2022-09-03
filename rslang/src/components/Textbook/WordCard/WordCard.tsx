import React, { Component } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ReactLearnWordsAPI, URLBASE } from '../../API/getWords';
import classes from './WordCard.module.scss';
import { IID, IWordCard } from '../consts';
import { AudioCard } from './AudioCard/AudioCard';
import { Difficult } from './Difficult/Difficult';
import { Context } from '../Context';

export class WordCard extends Component<IID> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  reactLearnWordsAPI = new ReactLearnWordsAPI();

  state = {
    wordCard: {} as IWordCard,
    allUsersWords: [] as IWordCard[]
  };

  componentDidMount() {
    const id = this.props.id;
    this.setState({
      allUsersWords: this.context.allUserWords
    });
    this.reactLearnWordsAPI.getWord(id).then((card) => {
      this.setState({
        wordCard: card
      });
    });
    this.updateCard();
  }

  updateCard() {
    const wordCard = this.context.allUserWords.filter(
      (card) => card.id === this.state.wordCard.id
    )[0];
    if (wordCard) {
      this.setState({
        wordCard: wordCard
      });
    } else {
      this.reactLearnWordsAPI.getWord(this.props.id).then((card) => {
        this.setState({
          wordCard: card
        });
      });
    }
  }

  render() {
    // console.log(this.context);
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
    } = this.state.wordCard;
    if (!id) {
      return <div></div>;
    }
    const wordAndTranscriptionAndTranslate = `${word} - ${transcription} - ${wordTranslate}`;
    const audioSrc = `${URLBASE}/${audio}`;
    const audioMeaningSrc = `${URLBASE}/${audioMeaning}`;
    const audioExampleSrc = `${URLBASE}/${audioExample}`;
    return (
      <Card
        className={classes.wordCard}
        key={id}
        style={{ border: `2px solid ${this.props.color}` }}>
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
            funcAudio={this.props.funcAudio}
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
          <Difficult
            wordCard={this.state.wordCard}
            allUsersWords={this.context.allUserWords}
            funcRender={this.props.funcRender}
          />
        </CardContent>
      </Card>
    );
  }
}
