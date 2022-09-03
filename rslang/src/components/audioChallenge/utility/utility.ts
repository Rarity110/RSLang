import { AudioChallengeOption } from '../../../types/audioChallenge';
import { WordItem } from '../../../types/api';
import { PAGE_PER_GROUP } from '../../../consts/consts';

const FALSY_OPTIONS_COUNT = 4;
const RESULT_TEXT_CORRECT = ['Так держать!', 'Супер!', 'Молодец!', 'Верно!'];
const RESULT_TEXT_INCORRECT = ['Не верно!', 'В следующий раз получится!', 'Не сдавайся!', 'Нет :('];
const FAKE_TRANSLATE_OPTIONS = [
  'человек',
  'говорить',
  'только',
  'время',
  'дело',
  'день',
  'жизнь',
  'рука',
  'большой',
  'вопрос'
];

export const getRandomArrayUniqueIndexes = (length: number, count = FALSY_OPTIONS_COUNT) => {
  const result: number[] = [];

  while (result.length < count) {
    const newRandom = Math.floor(Math.random() * length);

    if (!result.includes(newRandom)) {
      result.push(newRandom);
    }
  }

  return result;
};

export const arrayRandomSort = () => 0.5 - Math.random();

export const getWordsOptions = (words: WordItem[]): AudioChallengeOption[][] => {
  const wordTranslates = words.map((word) => word.wordTranslate);
  const optionsDictionary = [...wordTranslates, ...FAKE_TRANSLATE_OPTIONS];

  return words.map((word) => {
    const falsyOptionsDictionary = optionsDictionary.filter(
      (translate) => translate !== word.wordTranslate
    );
    const falsyIndexList = getRandomArrayUniqueIndexes(falsyOptionsDictionary.length);
    const falsyOptions = falsyIndexList.map((index) => ({
      wordTranslate: falsyOptionsDictionary[index],
      result: false,
      key: `false${index}`
    }));

    return [
      ...falsyOptions,
      {
        wordTranslate: word.wordTranslate,
        result: true,
        key: 'true'
      }
    ].sort(arrayRandomSort);
  });
};

export const getResultText = (isCorrect: boolean): string => {
  const maxIndex = isCorrect ? RESULT_TEXT_CORRECT.length - 1 : RESULT_TEXT_INCORRECT.length - 1;
  const randomIndex = Math.round(Math.random() * maxIndex);
  return isCorrect ? RESULT_TEXT_CORRECT[randomIndex] : RESULT_TEXT_INCORRECT[randomIndex];
};

export const getRandomPage = (): number => {
  return Math.floor(Math.random() * PAGE_PER_GROUP);
};
