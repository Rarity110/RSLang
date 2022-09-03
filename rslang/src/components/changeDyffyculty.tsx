import React, { Component } from 'react';
import { ReactLearnWordsAPI } from './API/getWords';
import { IWordCard } from './Textbook/consts';
import { Context } from './Textbook/Context';
import { saveWordsInStorage } from './Textbook/saveWordsInStorage';

interface IDifficulty {
  wordCard: IWordCard;
  allUsersWords?: IWordCard[];
}

// export function addDifficulty(difficulty: string, allUsersWords: IWordCard[], wordCard: IWordCard) {
//     if (!wordCard.userWord?.difficulty) {
//       wordCard.userWord = { difficulty: difficulty };
//       allUsersWords.push(wordCard);
//       this.reactLearnWordsAPI.postUserWord(wordCard.id, difficulty);
//       this.setState({
//         difficulty: difficulty
//       });
//     } else {
//       const index = allUsersWords.findIndex((el) => el.id === wordCard.id);
//       if (wordCard.userWord.difficulty === difficulty) {
//         delete wordCard.userWord.difficulty;
//         this.reactLearnWordsAPI.deleteUserWord(wordCard.id);
//         allUsersWords.splice(index, 1);
//         this.setState({
//           difficulty: undefined
//         });
//       } else {
//         wordCard.userWord.difficulty = difficulty;
//         this.reactLearnWordsAPI.putUserWord(wordCard.id, difficulty);
//         allUsersWords[index].userWord = { difficulty: difficulty };
//         this.setState({
//           difficulty: difficulty
//         });
//       }
//     }
//     saveWordsInStorage(this.context.allUserWords);
//   }

//   removeDifficulty() {
//     const { allUsersWords, wordCard } = this.state;
//     const index = allUsersWords.findIndex((el) => el.id === wordCard.id);
//     delete wordCard.userWord?.difficulty;
//     this.reactLearnWordsAPI.deleteUserWord(wordCard.id);
//     allUsersWords.splice(index, 1);
//     this.setState({
//       difficulty: undefined
//     });
//     saveWordsInStorage(this.context.allUserWords);
//   }
// }
// export class changeDifficulty extends Component<IDifficulty> {
//   reactLearnWordsAPI = new ReactLearnWordsAPI();
//   static contextType = Context;
//   context!: React.ContextType<typeof Context>;

//   state = {
//     allUsersWords: [] as IWordCard[],
//     wordCard: this.props.wordCard
//   };

//   componentDidMount() {
//     this.setState({
//       allUsersWords: this.context.allUserWords,
//       wordCard: this.props.wordCard
//     });
//   }

//   addDifficulty(difficulty: string) {
//     const { allUsersWords, wordCard } = this.state;
//     if (!wordCard.userWord?.difficulty) {
//       wordCard.userWord = { difficulty: difficulty };
//       allUsersWords.push(wordCard);
//       this.reactLearnWordsAPI.postUserWord(wordCard.id, difficulty);
//       this.setState({
//         difficulty: difficulty
//       });
//     } else {
//       const index = allUsersWords.findIndex((el) => el.id === wordCard.id);
//       if (wordCard.userWord.difficulty === difficulty) {
//         delete wordCard.userWord.difficulty;
//         this.reactLearnWordsAPI.deleteUserWord(wordCard.id);
//         allUsersWords.splice(index, 1);
//         this.setState({
//           difficulty: undefined
//         });
//       } else {
//         wordCard.userWord.difficulty = difficulty;
//         this.reactLearnWordsAPI.putUserWord(wordCard.id, difficulty);
//         allUsersWords[index].userWord = { difficulty: difficulty };
//         this.setState({
//           difficulty: difficulty
//         });
//       }
//     }
//     saveWordsInStorage(this.context.allUserWords);
//   }

//   removeDifficulty() {
//     const { allUsersWords, wordCard } = this.state;
//     const index = allUsersWords.findIndex((el) => el.id === wordCard.id);
//     delete wordCard.userWord?.difficulty;
//     this.reactLearnWordsAPI.deleteUserWord(wordCard.id);
//     allUsersWords.splice(index, 1);
//     this.setState({
//       difficulty: undefined
//     });
//     saveWordsInStorage(this.context.allUserWords);
//   }
// }
