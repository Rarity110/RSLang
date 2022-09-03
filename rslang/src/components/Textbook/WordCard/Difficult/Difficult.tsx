import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { ReactLearnWordsAPI } from '../../../API/getWords';
import { Context } from '../../Context';
import CheckIcon from '@mui/icons-material/Check';
import { IWordCard, TCallbackRender } from '../../consts';
import { saveWordsInStorage } from '../../saveWordsInStorage';
import classes from './Difficult.module.scss';
import { changeDifficulty } from '../../../changeDifficulty';

interface IDifficult {
  wordCard: IWordCard;
  allUsersWords?: IWordCard[];
  funcRender: TCallbackRender;
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
    if (wordCard) {
      this.setState({
        wordCard: wordCard,
        difficulty: wordCard.userWord?.difficulty
      });
    }
  }

  changeDifficultyTextbook(difficulty: string) {
    const { allUsersWords, wordCard } = this.state;
    changeDifficulty(difficulty, allUsersWords, wordCard);
    let newDifficulty = undefined;
    if (difficulty === 'hard' || difficulty === 'learned' || wordCard.userWord?.optional) {
      newDifficulty = difficulty;
    }
    this.setState({
      difficulty: newDifficulty
    });
    saveWordsInStorage(allUsersWords);
  }

  togleDifficult(difficulty: string) {
    this.changeDifficultyTextbook(difficulty);
    this.props.funcRender();
  }

  render(): React.ReactNode {
    const isAuthorized = this.context.isAuthorized;
    const difficulty = this.state.wordCard.userWord?.difficulty;
    const DifficultyIcon = () => {
      if (difficulty === 'hard') {
        return <PriorityHighIcon style={{ color: 'red' }} className={classes.difficulty_icon} />;
      } else if (difficulty === 'learned') {
        return <CheckIcon style={{ color: 'green' }} className={classes.difficulty_icon} />;
      } else {
        return <div></div>;
      }
    };
    const DifficultyButton = (props: { newDifficulty: string; value: string }) => {
      return (
        <Button
          variant="outlined"
          className={classes.difficulty_buttons_button}
          onClick={() => this.togleDifficult(props.newDifficulty)}>
          {props.value}
        </Button>
      );
    };
    const AddToLearned = () => {
      if (difficulty !== 'learned') {
        return <DifficultyButton newDifficulty="learned" value="Добавить в изученные" />;
      } else {
        return <DifficultyButton newDifficulty="normal" value="Удалить из изученных" />;
      }
    };
    const AddToHard = () => {
      if (difficulty !== 'hard') {
        return <DifficultyButton newDifficulty="hard" value="Добавить в сложные" />;
      } else {
        return <DifficultyButton newDifficulty="normal" value="Удалить из сложных" />;
      }
    };
    if (isAuthorized) {
      return (
        <div className={classes.difficulty}>
          <div className={classes.difficulty_buttons}>
            <AddToHard />
            <AddToLearned />
          </div>
          <DifficultyIcon />
        </div>
      );
    }
  }
}
