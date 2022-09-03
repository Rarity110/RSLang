import { ReactLearnWordsAPI } from './API/getWords';
import { IWordCard } from './Textbook/consts';
import { saveWordsInStorage } from './Textbook/saveWordsInStorage';

const reactLearnWordsAPI = new ReactLearnWordsAPI();

export function changeDifficulty(
  difficulty: string,
  allUsersWords: IWordCard[],
  wordCard: IWordCard
) {
  if (difficulty === 'hard' || difficulty === 'learned') {
    if (wordCard.userWord?.difficulty) {
      const index = allUsersWords.findIndex((el) => el.id === wordCard.id);
      wordCard.userWord.difficulty = difficulty;
      reactLearnWordsAPI.putUserWord(wordCard.id, difficulty);
      allUsersWords[index].userWord = { difficulty: difficulty };
    } else {
      wordCard.userWord = { difficulty: difficulty };
      allUsersWords.push(wordCard);
      reactLearnWordsAPI.postUserWord(wordCard.id, difficulty);
    }
  } else {
    const index = allUsersWords.findIndex((el) => el.id === wordCard.id);
    if (wordCard.userWord?.optional) {
      wordCard.userWord.difficulty = difficulty;
      reactLearnWordsAPI.putUserWord(wordCard.id, difficulty);
      allUsersWords[index].userWord = { difficulty: difficulty };
    } else {
      delete wordCard.userWord?.difficulty;
      reactLearnWordsAPI.deleteUserWord(wordCard.id);
      allUsersWords.splice(index, 1);
    }
  }
  saveWordsInStorage(allUsersWords);
}
