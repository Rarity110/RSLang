import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { ReactLearnWordsAPI } from '../../../API/getWords';
import { Context } from '../../Context';
import CheckIcon from '@mui/icons-material/Check';
import { IWordCard, TCallbackRender } from '../../consts';
import { saveWordsInStorage } from '../../saveWordsInStorage';
import classes from './Difficult.module.scss';

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

  addDifficulty(difficulty: string) {
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
    if (difficulty === 'hard' || difficulty === 'learned') this.addDifficulty(difficulty);
    if (difficulty === 'noHard' || difficulty === 'noLearned') this.removeDifficulty();
    saveWordsInStorage(this.context.allUserWords);
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
        return (
          <DifficultyButton newDifficulty="learned" value="Добавить в изученные" />
          // <Button variant="outlined" onClick={() => this.togleDifficult('learned')}>
          //   Добавить в изученные
          // </Button>
        );
      } else {
        return (
          <DifficultyButton newDifficulty="noLearned" value="Удалить из изученных" />
          // <Button variant="outlined" onClick={() => this.togleDifficult('noLearned')}>
          //   Удалить из изученных
          // </Button>
        );
      }
    };
    const AddToHard = () => {
      if (difficulty !== 'hard') {
        return (
          <DifficultyButton newDifficulty="hard" value="Добавить в сложные" />
          // <Button variant="outlined" onClick={() => this.togleDifficult('hard')}>
          //   Добавить в сложные
          // </Button>
        );
      } else {
        return (
          <DifficultyButton newDifficulty="noHard" value="Удалить из сложных" />
          // <Button variant="outlined" onClick={() => this.togleDifficult('noHard')}>
          //   Удалить из сложных
          // </Button>
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
      // if (difficulty === 'hard') {
      //   return (
      //     <>
      //       <Button variant="outlined" onClick={() => this.togleDifficult('noHard')}>
      //         <PriorityHighIcon style={{ color: 'red' }} />;
      //       </Button>
      //       <AddToLearned />
      //       <DifficultyIcon />
      //     </>
      //   );
      // } else if (difficulty === 'learned') {
      //   return (
      //     <>
      //       <AddToHard />
      //       <Button variant="outlined" onClick={() => this.togleDifficult('noLearned')}>
      //         <CheckIcon style={{ color: 'green' }} />;
      //       </Button>
      //       <DifficultyIcon />
      //     </>
      //   );
      // } else {
      //   return (
      //     <>
      //       <AddToHard />
      //       <AddToLearned />
      //       <DifficultyIcon />
      //     </>
      //   );
      // }
    }
  }
}
