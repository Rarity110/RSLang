import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { AuthorizeContext } from '../../../auth-form/AuthorizeContext';
import { ReactLearnWordsAPI } from '../../../API/getWords';
import { IWordCard } from '../../consts';

export type TCallbackAsync = (id: string, allWords: IWordCard[]) => void;
interface IDifficult {
  allUsersWords: IWordCard[];
  wordCard: IWordCard;
}

export class Difficult extends Component<IDifficult> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = AuthorizeContext;
  context!: React.ContextType<typeof AuthorizeContext>;

  state = {
    allUsersWords: this.props.allUsersWords,
    wordCard: this.props.wordCard
  };

  componentDidMount() {
    const allUsersWords = this.props.allUsersWords;
    const wordCard = this.props.allUsersWords.filter(
      (wordCard) =>
        wordCard._id === this.props.wordCard.id ||
        wordCard.id === this.props.wordCard.id ||
        wordCard._id === this.props.wordCard._id ||
        wordCard.id === this.props.wordCard._id
    )[0];
    if (wordCard) {
      this.setState({
        wordCard: wordCard
      });
    }
    this.setState({
      allUsersWords: allUsersWords
    });
  }

  //   componentDidUpdate(prevProps: IDifficult) {
  //     if (this.props.isDifficult !== prevProps.isDifficult) {
  //       this.updateDifficult();
  //     }
  //   }

  // updateDifficult() {
  //   const { isDifficult } = this.props;
  //   this.setState({
  //     isDifficult: isDifficult
  //   });
  // }

  //   togleDifficult(idword: string) {
  //     this.reactLearnWordsAPI.postUserWord(idword);
  //   }

  togleDifficult() {
    const { allUsersWords, wordCard } = this.state;
    console.log(wordCard.difficulty);
    if (!wordCard.difficulty) {
      wordCard.difficulty = 'hard';
      allUsersWords.push(wordCard);
      this.reactLearnWordsAPI.postUserWord(wordCard.id);
    } else {
      const index = allUsersWords.findIndex(
        (el) =>
          el.id === wordCard.id ||
          el._id === wordCard.id ||
          el.id === wordCard._id ||
          el._id === wordCard._id
      );
      if (wordCard.difficulty === 'hard') {
        delete wordCard.difficulty;
        // todo delete from backend
        allUsersWords.splice(index, 1);
      } else if (wordCard.difficulty === 'learned') {
        wordCard.difficulty = 'hard';
        // todo put from backend
        allUsersWords[index].difficulty = 'hard';
      }
    }
  }

  render(): React.ReactNode {
    const isAuthorized = this.context.isAuthorized;
    const difficulty = this.state.wordCard.difficulty;
    // console.log(this.state.wordCard);
    if (isAuthorized) {
      if (difficulty !== 'hard' || !difficulty) {
        return (
          <Button variant="outlined" onClick={() => this.togleDifficult()}>
            Добавить в сложные
          </Button>
        );
      } else {
        return (
          <Button variant="outlined" onClick={() => this.togleDifficult()}>
            <PriorityHighIcon style={{ color: 'red' }} />;
          </Button>
        );
      }
    }
  }
}
