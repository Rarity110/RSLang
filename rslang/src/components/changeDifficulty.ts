import { ReactLearnWordsAPI } from './API/getWords';
import { IUserWordOptional, IWordCard } from '../types/props';
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
  const optional: undefined | IUserWordOptional = wordCard.userWord?.optional;
  if (difficulty === WORD_DIFFICULTY.hard || difficulty === WORD_DIFFICULTY.learned) {
    if (wordCard.userWord?.difficulty) {
      const index = allUserWords.findIndex((el) => el.id === wordCard.id);
      wordCard.userWord.difficulty = difficulty;
      reactLearnWordsAPI.putUserWord(wordCard.id, difficulty, optional);
      allUserWords[index].userWord = { difficulty, optional };
    } else {
      wordCard.userWord = { difficulty };
      allUserWords.push(wordCard);
      reactLearnWordsAPI.postUserWord(wordCard.id, difficulty, optional);
    }
  } else {
    const index = allUserWords.findIndex((el) => el.id === wordCard.id);
    if (wordCard.userWord?.optional) {
      wordCard.userWord.difficulty = difficulty;
      reactLearnWordsAPI.putUserWord(wordCard.id, difficulty, optional);
      allUserWords[index].userWord = { difficulty, optional };
    } else {
      delete wordCard.userWord?.difficulty;
      reactLearnWordsAPI.deleteUserWord(wordCard.id);
      allUserWords.splice(index, 1);
    }
  }
  saveWordsInStorage(allUserWords);
}
