import React, { Component } from 'react';
import { Grid } from '@mui/material';
import { ReactLearnWordsAPI } from '../../API/getWords';
import { WordCard } from '../WordCard/WordCard';
import { IWordCard, IState } from '../consts';

export class WordCards extends Component<IState> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  state = {
    group: 0,
    page: 0,
    cards: [] as IWordCard[]
  };

  componentDidMount() {
    this.updateCards();
    this.toggleAudio = this.toggleAudio.bind(this);
    if (this.props.group === 6)
      this.setState({
        allUserWordsLength: this.props.allUsersWordsLength
      });
  }

  componentDidUpdate(prevProps: IState) {
    if (
      this.props.page !== prevProps.page ||
      this.props.group !== prevProps.group ||
      this.props.allUserWords !== prevProps.allUserWords
    ) {
      this.updateCards();
    }
    if (this.props.group === 6) {
      console.log(this.props.allUserWords.length);
      console.log(prevProps.allUserWords.length);
      if (this.props.allUsersWordsLength !== prevProps.allUsersWordsLength) {
        this.setState({
          allUserWordsLength: this.props.allUserWords.length
        });
      }
    }
  }

  updateCards() {
    const { page, group } = this.props;
    this.setState({
      page: page,
      group: group
    });
    if (group === 6) {
      this.setState({
        cards: this.props.allUserWords
      });
    } else {
      this.reactLearnWordsAPI.getWords(group, page).then((words) => {
        this.setState({
          cards: words
        });
      });
    }
  }

  audioList = [] as HTMLAudioElement[];

  createAudio(audioList: HTMLAudioElement[]) {
    this.audioList = audioList;
    this.audioList[0].play();
    this.audioList[0].addEventListener('ended', () => this.audioList[1].play());
    this.audioList[1].addEventListener('ended', () => this.audioList[2].play());
    this.audioList[2].addEventListener('ended', () => (this.audioList = []));
  }

  toggleAudio(audioList: HTMLAudioElement[]) {
    const oldList = [...this.audioList];
    if (this.audioList.length === 0) {
      this.createAudio(audioList);
    } else {
      this.audioList.forEach((audio) => {
        audio.load();
      });
      this.audioList = [];
      if (oldList[0].src !== audioList[0].src) {
        this.createAudio(audioList);
      }
    }
  }

  render() {
    console.log(this.props.allUserWords.length);
    const cards = this.state.cards;
    if (!cards.length) {
      return;
    }
    const elements = cards.map((item: IWordCard) => {
      return (
        <Grid item xs={12} sm={6} lg={4} key={item.image}>
          <WordCard id={item.id} func={this.toggleAudio} color={this.props.color} />
        </Grid>
      );
    });
    return (
      <Grid container rowSpacing={4} columnSpacing={{ xs: 0, sm: 4, md: 6 }} mt={1}>
        {elements}
      </Grid>
    );
  }
}
