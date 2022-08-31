import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { AuthorizeContext } from '../../../auth-form/AuthorizeContext';
import { ReactLearnWordsAPI } from '../../../API/getWords';
import { IWordCard, IDifficult } from '../../consts';

export type TCallbackAsync = (id: string, allWords: IWordCard[]) => void;

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
    if (this.props.wordCard.userWord?.difficulty !== prevProps.wordCard.userWord?.difficulty) {
      this.updateDifficult();
    }
  }

  updateDifficult() {
    const allUsersWords = this.props.allUsersWords;
    const wordCard = this.props.allUsersWords.filter(
      (wordCard) => wordCard.id === this.props.wordCard.id
    )[0];
    // console.log(wordCard);
    if (wordCard) {
      this.setState({
        wordCard: wordCard,
        difficulty: wordCard.userWord?.difficulty
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
    const id = wordCard.id;
    // console.log(wordCard.userWord?.difficulty);
    if (!wordCard.userWord?.difficulty) {
      wordCard.userWord = { difficulty: 'hard' };
      allUsersWords.push(wordCard);
      this.reactLearnWordsAPI.postUserWord(id, 'hard');
      this.setState({
        difficulty: 'hard'
      });
    } else {
      const index = allUsersWords.findIndex((el) => el.id === id);
      if (wordCard.userWord.difficulty === 'hard') {
        delete wordCard.userWord.difficulty;
        this.reactLearnWordsAPI.deleteUserWord(id);
        allUsersWords.splice(index, 1);
        this.setState({
          difficulty: undefined
        });
      } else if (wordCard.userWord.difficulty === 'learned') {
        wordCard.userWord.difficulty = 'hard';
        this.reactLearnWordsAPI.putUserWord(id, 'hard');
        allUsersWords[index].userWord = { difficulty: 'hard' };
        this.setState({
          difficulty: 'hard'
        });
      }
    }
    // console.log(allUsersWords);
  }

  render(): React.ReactNode {
    const isAuthorized = this.context.isAuthorized;
    const difficulty = this.state.wordCard.userWord?.difficulty;
    // console.log(this.state.wordCard);
    if (isAuthorized) {
      if (difficulty === 'hard') {
        return (
          <Button variant="outlined" onClick={() => this.togleDifficult()}>
            <PriorityHighIcon style={{ color: 'red' }} />;
          </Button>
        );
      } else {
        return (
          <Button variant="outlined" onClick={() => this.togleDifficult()}>
            Добавить в сложные
          </Button>
        );
      }
    }
  }
}
