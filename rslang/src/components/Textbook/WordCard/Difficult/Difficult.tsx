import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { ReactLearnWordsAPI } from '../../../API/getWords';
import { Context } from '../../Context';
import CheckIcon from '@mui/icons-material/Check';
import { IWordCard } from '../../consts';
import { saveWordsInStorage } from '../../saveWordsInStorage';

interface IDifficult {
  wordCard: IWordCard;
  allUsersWords?: IWordCard[];
}

export class Difficult extends Component<IDifficult> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  state = {
    allUsersWords: [] as IWordCard[],
    wordCard: this.props.wordCard
  };

  componentDidMount() {
    console.log(this.context);
    this.setState({
      allUsersWords: this.context.allUserWords
    });
    this.updateDifficult();
  }

  componentDidUpdate(prevProps: IDifficult) {
    if (this.props.wordCard.userWord?.difficulty !== prevProps.wordCard.userWord?.difficulty) {
      this.updateDifficult();
    }
    if (this.props.allUsersWords !== prevProps.allUsersWords) {
      this.setState({
        allUsersWords: this.context.allUserWords
      });
      this.updateDifficult();
    }
  }

  updateDifficult() {
    const wordCard = this.context.allUserWords.filter(
      (card) => card.id === this.props.wordCard.id
    )[0];
    console.log(this.context);
    if (wordCard) {
      console.log(wordCard.userWord?.difficulty, wordCard.word);
      this.setState({
        wordCard: wordCard,
        difficulty: wordCard.userWord?.difficulty
      });
    }
  }

  addDifficulty(difficulty: string) {
    const { allUsersWords, wordCard } = this.state;
    if (!wordCard.userWord?.difficulty) {
      wordCard.userWord = { difficulty: difficulty };
      allUsersWords.push(wordCard);
      this.reactLearnWordsAPI.postUserWord(wordCard.id, difficulty);
      this.setState({
        difficulty: difficulty
      });
      console.log(this.context);
    } else {
      const index = allUsersWords.findIndex((el) => el.id === wordCard.id);
      if (wordCard.userWord.difficulty === difficulty) {
        delete wordCard.userWord.difficulty;
        this.reactLearnWordsAPI.deleteUserWord(wordCard.id);
        allUsersWords.splice(index, 1);
        this.setState({
          difficulty: undefined
        });
      } else {
        wordCard.userWord.difficulty = difficulty;
        this.reactLearnWordsAPI.putUserWord(wordCard.id, difficulty);
        allUsersWords[index].userWord = { difficulty: difficulty };
        this.setState({
          difficulty: difficulty
        });
      }
    }
  }

  removeDifficulty() {
    const { allUsersWords, wordCard } = this.state;
    const index = allUsersWords.findIndex((el) => el.id === wordCard.id);
    delete wordCard.userWord?.difficulty;
    this.reactLearnWordsAPI.deleteUserWord(wordCard.id);
    allUsersWords.splice(index, 1);
    this.setState({
      difficulty: undefined
    });
  }

  togleDifficult(difficulty: string) {
    if (difficulty === 'hard' || difficulty === 'learned') this.addDifficulty(difficulty);
    if (difficulty === 'noHard' || difficulty === 'noLearned') this.removeDifficulty();
    saveWordsInStorage(this.context.allUserWords);
  }

  render(): React.ReactNode {
    const isAuthorized = this.context.isAuthorized;
    const difficulty = this.state.wordCard.userWord?.difficulty;
    console.log(this.state.wordCard.word, difficulty);
    const AddToLearned = () => {
      return (
        <Button variant="outlined" onClick={() => this.togleDifficult('learned')}>
          Добавить в изученные
        </Button>
      );
    };
    const AddToHard = () => {
      return (
        <Button variant="outlined" onClick={() => this.togleDifficult('hard')}>
          Добавить в сложные
        </Button>
      );
    };
    if (isAuthorized) {
      if (difficulty === 'hard') {
        return (
          <>
            <Button variant="outlined" onClick={() => this.togleDifficult('noHard')}>
              <PriorityHighIcon style={{ color: 'red' }} />;
            </Button>
            <AddToLearned />
          </>
        );
      } else if (difficulty === 'learned') {
        return (
          <>
            <AddToHard />
            <Button variant="outlined" onClick={() => this.togleDifficult('noLearned')}>
              <CheckIcon style={{ color: 'green' }} />;
            </Button>
          </>
        );
      } else {
        return (
          <>
            <AddToHard />
            <AddToLearned />
          </>
        );
      }
    }
  }
}
