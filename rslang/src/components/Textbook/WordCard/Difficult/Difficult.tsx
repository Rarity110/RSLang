import React, { Component } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';
import { ReactLearnWordsAPI } from '../../../API/getWords';
import { IWordCard, IDifficult } from '../../consts';
import { Context } from '../../Context';
import CheckIcon from '@mui/icons-material/Check';

export class Difficult extends Component<IDifficult> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  state = {
    allUsersWords: this.props.allUsersWords,
    wordCard: this.props.wordCard
    // difficulty: this.props.wordCard.difficulty | undefined
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
    const allUsersWords = this.context.allUserWords;
    // console.log(this.context.allUserWords);
    // console.log('this.props.wordCard.id', this.props.wordCard.id);
    // this.context.allUserWords.forEach((el) =>
    //   // console.log('el.id', el.id, el.id === this.props.wordCard.id)
    // );
    const wordCard = this.context.allUserWords.filter(
      (card) => card.id === this.props.wordCard.id
    )[0];
    // console.log(wordCard);
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

  togleDifficult(difficulty: string) {
    const { allUsersWords, wordCard } = this.state;
    const id = wordCard.id;
    if (difficulty === 'hard') {
      // console.log(wordCard.userWord);
      if (!wordCard.userWord?.difficulty) {
        // console.log('here');
        wordCard.userWord = { difficulty: 'hard' };
        allUsersWords.push(wordCard);
        console.log(allUsersWords);
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
    }
    if (difficulty === 'learned') {
      if (!wordCard.userWord?.difficulty) {
        wordCard.userWord = { difficulty: 'learned' };
        allUsersWords.push(wordCard);
        this.reactLearnWordsAPI.postUserWord(id, 'learned');
        this.setState({
          difficulty: 'learned'
        });
      } else {
        const index = allUsersWords.findIndex((el) => el.id === id);
        if (wordCard.userWord.difficulty === 'learned') {
          delete wordCard.userWord.difficulty;
          this.reactLearnWordsAPI.deleteUserWord(id);
          allUsersWords.splice(index, 1);
          this.setState({
            difficulty: undefined
          });
        } else if (wordCard.userWord.difficulty === 'hard') {
          wordCard.userWord.difficulty = 'learned';
          this.reactLearnWordsAPI.putUserWord(id, 'learned');
          allUsersWords[index].userWord = { difficulty: 'learned' };
          this.setState({
            difficulty: 'learned'
          });
        }
      }
    }
    if (difficulty === 'noHard') {
      const index = allUsersWords.findIndex((el) => el.id === id);
      delete wordCard.userWord?.difficulty;
      this.reactLearnWordsAPI.deleteUserWord(id);
      allUsersWords.splice(index, 1);
      this.setState({
        difficulty: undefined
      });
    }
    if (difficulty === 'noLearned') {
      const index = allUsersWords.findIndex((el) => el.id === id);
      delete wordCard.userWord?.difficulty;
      this.reactLearnWordsAPI.deleteUserWord(id);
      allUsersWords.splice(index, 1);
      this.setState({
        difficulty: undefined
      });
    }
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
    // console.log(this.state.wordCard);
    // console.log(this.state.allUsersWords);
    // console.log(this.state.wordCard);
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

// export class Difficult extends Component<IDifficult> {
//   reactLearnWordsAPI = new ReactLearnWordsAPI();
//   static contextType = Context;
//   context!: React.ContextType<typeof Context>;

//   state = {
//     allUsersWords: this.props.allUsersWords,
//     wordCard: this.props.wordCard
//     // difficulty: this.props.wordCard.difficulty | undefined
//   };

//   componentDidMount() {
//     this.updateDifficult();
//   }

//   componentDidUpdate(prevProps: IDifficult) {
//     if (this.props.wordCard.userWord?.difficulty !== prevProps.wordCard.userWord?.difficulty) {
//       this.updateDifficult();
//     }
//   }

//   updateDifficult() {
//     const allUsersWords = this.props.allUsersWords;
//     const wordCard = this.props.allUsersWords.filter(
//       (wordCard) => wordCard.id === this.props.wordCard.id
//     )[0];
//     // console.log(wordCard);
//     if (wordCard) {
//       this.setState({
//         wordCard: wordCard,
//         difficulty: wordCard.userWord?.difficulty
//       });
//     }
//     this.setState({
//       allUsersWords: allUsersWords
//     });
//   }

//   //   togleDifficult(idword: string) {
//   //     this.reactLearnWordsAPI.postUserWord(idword);
//   //   }

//   togleDifficult() {
//     const { allUsersWords, wordCard } = this.state;
//     const id = wordCard.id;
//     // console.log(wordCard.userWord?.difficulty);
//     if (!wordCard.userWord?.difficulty) {
//       wordCard.userWord = { difficulty: 'hard' };
//       allUsersWords.push(wordCard);
//       this.reactLearnWordsAPI.postUserWord(id, 'hard');
//       this.setState({
//         difficulty: 'hard'
//       });
//     } else {
//       const index = allUsersWords.findIndex((el) => el.id === id);
//       if (wordCard.userWord.difficulty === 'hard') {
//         delete wordCard.userWord.difficulty;
//         this.reactLearnWordsAPI.deleteUserWord(id);
//         allUsersWords.splice(index, 1);
//         this.setState({
//           difficulty: undefined
//         });
//       } else if (wordCard.userWord.difficulty === 'learned') {
//         wordCard.userWord.difficulty = 'hard';
//         this.reactLearnWordsAPI.putUserWord(id, 'hard');
//         allUsersWords[index].userWord = { difficulty: 'hard' };
//         this.setState({
//           difficulty: 'hard'
//         });
//       }
//     }
//     // console.log(allUsersWords);
//   }

//   render(): React.ReactNode {
//     const isAuthorized = this.context.isAuthorized;
//     const difficulty = this.state.wordCard.userWord?.difficulty;
//     // console.log(this.state.wordCard);
//     if (isAuthorized) {
//       if (difficulty === 'hard') {
//         return (
//           <Button variant="outlined" onClick={() => this.togleDifficult()}>
//             <PriorityHighIcon style={{ color: 'red' }} />;
//           </Button>
//         );
//       } else {
//         return (
//           <Button variant="outlined" onClick={() => this.togleDifficult()}>
//             Добавить в сложные
//           </Button>
//         );
//       }
//     }
//   }
// }
