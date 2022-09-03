import React, { Component } from 'react';
import { Grid } from '@mui/material';
import { ReactLearnWordsAPI } from '../../API/getWords';
import { WordCard } from '../WordCard/WordCard';
import { IWordCard } from '../../../types/props';
import { Context } from '../Context';
import { WORD_DIFFICULTY, WORDS_PER_PAGE } from '../../../consts/consts';

interface IState {
  group: number;
  page: number;
  color: string;
  funcLearned: () => void;
  allUserWords?: IWordCard[];
  cards?: IWordCard[];
}

export class WordCards extends Component<IState> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  state = {
    group: 0,
    page: 0,
    cards: [] as IWordCard[]
  };

  componentDidMount() {
    this.updateCards();
    this.toggleAudio = this.toggleAudio.bind(this);
    this.changeCards = this.changeCards.bind(this);
  }

  componentDidUpdate(prevProps: IState) {
    if (
      this.props.page !== prevProps.page ||
      this.props.group !== prevProps.group ||
      this.props.cards !== prevProps.cards
    ) {
      this.updateCards();
    }
  }

  updateCards() {
    const { page, group } = this.props;
    this.setState({
      page: page,
      group: group
    });
    if (group === 6) {
      const storageUserWords: string | null = localStorage.getItem('userWords');
      if (storageUserWords) {
        const hardWords = JSON.parse(storageUserWords).filter(
          (wordCard: IWordCard) => wordCard.userWord?.difficulty === WORD_DIFFICULTY.hard
        );
        this.setState({
          cards: hardWords
        });
      } else {
        const hardWords = this.context.allUserWords.filter(
          (wordCard: IWordCard) => wordCard.userWord?.difficulty === WORD_DIFFICULTY.hard
        );
        this.setState({
          cards: hardWords
        });
      }
    } else {
      this.reactLearnWordsAPI
        .getWords(group, page)
        .then((words) => {
          this.setState({
            cards: words
          });
        })
        .then(() => {
          const usersCardsId = this.context.allUserWords.map((el) => {
            if (
              el.userWord?.difficulty === WORD_DIFFICULTY.hard ||
              el.userWord?.difficulty === WORD_DIFFICULTY.learned
            ) {
              return el.id;
            }
          });
          let countLearnedCards = 0;
          this.state.cards.forEach((el) => {
            if (usersCardsId.includes(el.id)) {
              console.log(el.word);
              countLearnedCards += 1;
            }
          });
          console.log(countLearnedCards);
          if (countLearnedCards === WORDS_PER_PAGE) {
            this.props.funcLearned();
          }
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

  changeCards() {
    if (this.state.group === 6) {
      this.updateCards();
    }
  }

  render() {
    const cards = this.state.cards;
    if (!cards.length) {
      return;
    }
    const elements = cards.map((item: IWordCard) => {
      return (
        <Grid item xs={12} sm={6} lg={4} key={item.image}>
          <WordCard
            id={item.id}
            funcAudio={this.toggleAudio}
            funcRender={this.changeCards}
            color={this.props.color}
          />
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
