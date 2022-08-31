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
  // difficulty: string;
}

export class Difficult extends Component<IDifficult> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = AuthorizeContext;
  context!: React.ContextType<typeof AuthorizeContext>;

  state = {
    allUsersWords: this.props.allUsersWords,
    wordCard: this.props.wordCard
    // difficulty: this.props.wordCard.difficulty | undefined
  };

  componentDidMount() {
    this.updateDifficult();
  }

  componentDidUpdate(prevProps: IDifficult) {
    if (this.props.wordCard !== prevProps.wordCard) {
      this.updateDifficult();
    }
  }

  updateDifficult() {
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
        wordCard: wordCard,
        difficulty: wordCard.difficulty
      });
    }
    this.setState({
      allUsersWords: allUsersWords
    });
  }

  //   togleDifficult(idword: string) {
  //     this.reactLearnWordsAPI.postUserWord(idword);
  //   }

  togleDifficult() {
    const { allUsersWords, wordCard } = this.state;
    let id = '';
    if (wordCard._id) {
      id = wordCard._id;
    } else {
      id = wordCard.id;
    }
    console.log(wordCard.difficulty);
    if (!wordCard.difficulty) {
      wordCard.difficulty = 'hard';
      allUsersWords.push(wordCard);
      this.reactLearnWordsAPI.postUserWord(id, 'hard');
      this.setState({
        difficulty: 'hard'
      });
    } else {
      const index = allUsersWords.findIndex((el) => el.id === id || el._id === id);
      if (wordCard.difficulty === 'hard') {
        delete wordCard.difficulty;
        this.reactLearnWordsAPI.deleteUserWord(id);
        allUsersWords.splice(index, 1);
        this.setState({
          difficulty: undefined
        });
      } else if (wordCard.difficulty === 'learned') {
        wordCard.difficulty = 'hard';
        this.reactLearnWordsAPI.putUserWord(id, 'hard');
        allUsersWords[index].difficulty = 'hard';
        this.setState({
          difficulty: 'hard'
        });
      }
    }
    console.log(allUsersWords);
  }

  render(): React.ReactNode {
    console.log(this.state.wordCard.difficulty);
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
