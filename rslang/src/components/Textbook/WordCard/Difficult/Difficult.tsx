import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { ReactLearnWordsAPI } from '../../../API/getWords';
import { Context } from '../../Context';
import CheckIcon from '@mui/icons-material/Check';
import { IWordCard } from '../../consts';

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
    this.setState({
      allUsersWords: this.context.allUserWords
    });
    this.updateDifficult();
  }

  componentDidUpdate(prevProps: IDifficult) {
    if (this.props.wordCard.userWord?.difficulty !== prevProps.wordCard.userWord?.difficulty) {
      this.updateDifficult();
    }
  }

  updateDifficult() {
    const wordCard = this.context.allUserWords.filter(
      (card) => card.id === this.props.wordCard.id
    )[0];
    if (wordCard) {
      this.setState({
        wordCard: wordCard,
        difficulty: wordCard.userWord?.difficulty
      });
    }
  }

  addDifficulte(difficulty: string) {
    const { allUsersWords, wordCard } = this.state;
    if (!wordCard.userWord?.difficulty) {
      wordCard.userWord = { difficulty: difficulty };
      allUsersWords.push(wordCard);
      this.reactLearnWordsAPI.postUserWord(wordCard.id, difficulty);
      this.setState({
        difficulty: difficulty
      });
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
    if (difficulty === 'hard' || difficulty === 'learned') this.addDifficulte(difficulty);
    if (difficulty === 'noHard' || difficulty === 'noLearned') this.removeDifficulty();
  }

  render(): React.ReactNode {
    console.log(this.context);
    const isAuthorized = this.context.isAuthorized;
    const difficulty = this.state.wordCard.userWord?.difficulty;
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
