import React, { Component } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ReactLearnWordsAPI } from '../../API/getWords';
import { BASEURL_API } from '../../../consts/consts';
import classes from './WordCard.module.scss';
import { IWordCard } from '../../../types/props';
import { AudioCard } from './AudioCard/AudioCard';
import { Difficult } from './Difficult/Difficult';
import { Context } from '../../App/Context';

export interface IID {
  id: string;
  funcAudio: (audioList: HTMLAudioElement[]) => void;
  funcRender: () => void;
  color: string;
  allUserWords?: IWordCard[];
  funcCheckLearnedPage: () => void;
}

export class WordCard extends Component<IID> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  reactLearnWordsAPI = new ReactLearnWordsAPI();

  state = {
    wordCard: {} as IWordCard,
    allUserWords: [] as IWordCard[]
  };

  componentDidMount() {
    const id = this.props.id;
    this.setState({
      allUserWords: this.context.allUserWords
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
    const audioSrc = `${BASEURL_API}/${audio}`;
    const audioMeaningSrc = `${BASEURL_API}/${audioMeaning}`;
    const audioExampleSrc = `${BASEURL_API}/${audioExample}`;
    return (
      <Card
        className={classes.wordCard}
        key={id}
        style={{ border: `2px solid ${this.props.color}` }}>
        <CardMedia
          component="img"
          alt={word}
          height="140"
          src={`${BASEURL_API}/${image}`}
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
            allUserWords={this.context.allUserWords}
            funcRender={this.props.funcRender}
            funcCheckLearnedPage={this.props.funcCheckLearnedPage}
          />
        </CardContent>
      </Card>
    );
  }
}
