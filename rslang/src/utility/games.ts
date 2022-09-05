import { ReactLearnWordsAPI } from '../components/API/getWords';
import { IUserWordOptional, IWordCard, IUserWord, IWordGameResult } from '../types/props';
import { LEARNED_WORD_CONDITION, WORD_DIFFICULTY } from '../consts/consts';
import { setWordsInStorage } from './utility';

const reactLearnWordsAPI = new ReactLearnWordsAPI();

export const updateWordAfterGame = async (
  allUserWords: IWordCard[],
  gameWord: IWordCard,
  gameResult: boolean
): Promise<IWordGameResult> => {
  const resultInfo: IWordGameResult = { isLearned: false, isNew: false };
  const optionalNew: IUserWordOptional = {
    correct: gameResult ? 1 : 0,
    incorrect: gameResult ? 0 : 1,
    rowCorrect: gameResult ? 1 : 0
  };
  let difficultyNew = WORD_DIFFICULTY.normal;

  // слово есть в пользовательских
  const index = allUserWords.findIndex((word) => word.id === gameWord.id);
  if (index !== -1) {
    // у слова в allUserWords точно есть атрибут userWord
    const word = allUserWords[index].userWord as IUserWord;

    // если у слова уже есть optional - формируем новый
    if (word.optional) {
      const optionalOld = word.optional;
      optionalNew.correct = gameResult ? optionalOld.correct + 1 : optionalOld.correct;
      optionalNew.incorrect = gameResult ? optionalOld.incorrect : optionalOld.incorrect + 1;
      optionalNew.rowCorrect = gameResult ? optionalOld.rowCorrect + 1 : 0;
    }

    // если у слова есть есть difficulty
    if (word.difficulty) {
      const difficultyOld = word.difficulty;

      if (
        difficultyOld === WORD_DIFFICULTY.hard &&
        optionalNew.rowCorrect >= LEARNED_WORD_CONDITION.hard
      ) {
        difficultyNew = WORD_DIFFICULTY.learned;
        resultInfo.isLearned = true;
      } else if (
        difficultyOld === WORD_DIFFICULTY.normal &&
        optionalNew.rowCorrect >= LEARNED_WORD_CONDITION.normal
      ) {
        difficultyNew = WORD_DIFFICULTY.learned;
        resultInfo.isLearned = true;
      } else if (difficultyOld === WORD_DIFFICULTY.learned && !gameResult) {
        difficultyNew = WORD_DIFFICULTY.normal;
      } else {
        difficultyNew = difficultyOld;
      }
    }

    // сформированы difficultyNew и optionalNew - можно обновлять слово
    await reactLearnWordsAPI.putUserWord(gameWord.id, difficultyNew, optionalNew);
    allUserWords[index].userWord = { difficulty: difficultyNew, optional: optionalNew };
  }

  // слова нет в пользовательских
  else {
    resultInfo.isNew = true;
    const wordNew = {
      ...gameWord,
      userWord: {
        difficulty: difficultyNew,
        optional: optionalNew
      }
    };
    allUserWords.push(wordNew);
    await reactLearnWordsAPI.postUserWord(wordNew.id, difficultyNew, optionalNew);
  }

  setWordsInStorage(allUserWords);
  return resultInfo;
};
