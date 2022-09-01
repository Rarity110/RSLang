import { AudioChallengeOption, AudioChallengeStartParam } from '../../../types/audioChallenge';
import { WordItem } from '../../../types/api';

const FALSY_OPTIONS_COUNT = 4;
const RESULT_TEXT_CORRECT = ['Так держать!', 'Супер!', 'Молодец!', 'Верно!'];
const RESULT_TEXT_INCORRECT = ['Не верно!', 'В следующий раз получится!', 'Не сдавайся!', 'Нет :('];

const getRandomArrayIndexesWithoutCurrent = (
  current: number,
  length: number,
  count = FALSY_OPTIONS_COUNT
) => {
  const result: number[] = [];

  while (result.length < count) {
    const newRandom = Math.floor(Math.random() * length);

    if (newRandom !== current && !result.includes(newRandom)) {
      result.push(newRandom);
    }
  }

  return result;
};

export const getWordsOptions = (words: WordItem[]): AudioChallengeOption[][] => {
  return words.map((word, i, arr) => {
    const indexList = getRandomArrayIndexesWithoutCurrent(i, arr.length);
    const falsyOptions = indexList.map((item) => ({
      wordTranslate: arr[item].wordTranslate,
      result: false,
      key: `false${item}`
    }));

    return [
      ...falsyOptions,
      {
        key: 'true',
        wordTranslate: word.wordTranslate,
        result: true
      }
    ].sort(() => 0.5 - Math.random());
  });
};

export const getResultText = (isCorrect: boolean): string => {
  const maxIndex = isCorrect ? RESULT_TEXT_CORRECT.length - 1 : RESULT_TEXT_INCORRECT.length - 1;
  const randomIndex = Math.round(Math.random() * maxIndex);
  return isCorrect ? RESULT_TEXT_CORRECT[randomIndex] : RESULT_TEXT_INCORRECT[randomIndex];
};

export const getLocalStorageBookParams = (): AudioChallengeStartParam => {
  const group = localStorage.getItem('group') !== null ? Number(localStorage.getItem('group')) : 0;
  const page = localStorage.getItem('page') !== null ? Number(localStorage.getItem('page')) : 0;
  return { group, page };
};
