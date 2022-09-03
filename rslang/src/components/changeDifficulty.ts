import { ReactLearnWordsAPI } from './API/getWords';
import { IWordCard } from '../types/props';
import { WORD_DIFFICULTY } from '../consts/consts';

export function saveWordsInStorage(usersWords: IWordCard[]) {
  window.localStorage.setItem('userWords', JSON.stringify(usersWords));
}

const reactLearnWordsAPI = new ReactLearnWordsAPI();

export function changeDifficulty(
  difficulty: string,
  allUserWords: IWordCard[],
  wordCard: IWordCard
) {
  if (difficulty === WORD_DIFFICULTY.hard || difficulty === WORD_DIFFICULTY.learned) {
    if (wordCard.userWord?.difficulty) {
      const index = allUserWords.findIndex((el) => el.id === wordCard.id);
      wordCard.userWord.difficulty = difficulty;
      reactLearnWordsAPI.putUserWord(wordCard.id, difficulty);
      allUserWords[index].userWord = { difficulty: difficulty };
    } else {
      wordCard.userWord = { difficulty: difficulty };
      allUserWords.push(wordCard);
      reactLearnWordsAPI.postUserWord(wordCard.id, difficulty);
    }
  } else {
    const index = allUserWords.findIndex((el) => el.id === wordCard.id);
    if (wordCard.userWord?.optional) {
      wordCard.userWord.difficulty = difficulty;
      reactLearnWordsAPI.putUserWord(wordCard.id, difficulty);
      allUserWords[index].userWord = { difficulty: difficulty };
    } else {
      delete wordCard.userWord?.difficulty;
      reactLearnWordsAPI.deleteUserWord(wordCard.id);
      allUserWords.splice(index, 1);
    }
  }
  saveWordsInStorage(allUserWords);
}
