import React, { Component } from 'react';
import { Button } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import { ReactLearnWordsAPI } from '../../../API/getWords';
import { Context } from '../../../App/Context';
import { IWordCard } from '../../../../types/props';
import { WORD_DIFFICULTY } from '../../../../consts/consts';
import { saveWordsInStorage, changeDifficulty } from '../../../changeDifficulty';
import classes from './Difficult.module.scss';

interface IDifficult {
  wordCard: IWordCard;
  allUserWords?: IWordCard[];
  funcRender: () => void;
  funcCheckLearnedPage: () => void;
}

export class Difficult extends Component<IDifficult> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  state = {
    allUserWords: [] as IWordCard[],
    wordCard: this.props.wordCard
  };

  componentDidMount() {
    this.setState({
      allUserWords: this.context.allUserWords
    });
    this.updateDifficult();
  }

  componentDidUpdate(prevProps: IDifficult) {
    if (this.props.wordCard.userWord?.difficulty !== prevProps.wordCard.userWord?.difficulty) {
      this.updateDifficult();
    }
    if (this.props.allUserWords !== prevProps.allUserWords) {
      this.setState({
        allUserWords: this.context.allUserWords
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
    const { allUserWords, wordCard } = this.state;
    changeDifficulty(difficulty, allUserWords, wordCard);
    let newDifficulty = undefined;
    if (
      difficulty === WORD_DIFFICULTY.hard ||
      difficulty === WORD_DIFFICULTY.learned ||
      wordCard.userWord?.optional
    ) {
      newDifficulty = difficulty;
    }
    this.setState({
      difficulty: newDifficulty
    });
    saveWordsInStorage(allUserWords);
  }

  togleDifficult(difficulty: string) {
    this.changeDifficultyTextbook(difficulty);
    this.props.funcRender();
    this.props.funcCheckLearnedPage();
  }

  render(): React.ReactNode {
    const isAuthorized = this.context.isAuthorized;
    const difficulty = this.state.wordCard.userWord?.difficulty;
    const DifficultyIcon = () => {
      if (difficulty === WORD_DIFFICULTY.hard) {
        return <PriorityHighIcon style={{ color: 'red' }} className={classes.difficulty_icon} />;
      } else if (difficulty === WORD_DIFFICULTY.learned) {
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
        return (
          <DifficultyButton newDifficulty={WORD_DIFFICULTY.learned} value="Добавить в изученные" />
        );
      } else {
        return (
          <DifficultyButton newDifficulty={WORD_DIFFICULTY.normal} value="Удалить из изученных" />
        );
      }
    };
    const AddToHard = () => {
      if (difficulty !== 'hard') {
        return <DifficultyButton newDifficulty={WORD_DIFFICULTY.hard} value="Добавить в сложные" />;
      } else {
        return (
          <DifficultyButton newDifficulty={WORD_DIFFICULTY.normal} value="Удалить из сложных" />
        );
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
