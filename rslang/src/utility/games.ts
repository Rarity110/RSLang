import { ReactLearnWordsAPI } from '../components/API/getWords';
import { IUserWordOptional, IWordCard, IUserWord, IWordGameResult } from '../types/props';
import { LEARNED_WORD_CONDITION, WORD_DIFFICULTY } from '../consts/consts';
import { getDay, setWordsInStorage } from './utility';
import { DayStatistics, GameStatistics, OptionalStatistics } from '../types/api';
import { getStatistics, setStatistics } from '../components/API/api';

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

export const updateStatisticAfterGame = async (
  game: 'audio' | 'sprint',
  learnedCount: number,
  results: GameStatistics
) => {
  const day = getDay(new Date());
  let todayStatistic: DayStatistics;
  const templateDayStatistic: DayStatistics = {
    learnWords: learnedCount,
    audio: {
      correct: 0,
      incorrect: 0,
      rowCorrect: 0,
      newWords: 0
    },
    sprint: {
      correct: 0,
      incorrect: 0,
      rowCorrect: 0,
      newWords: 0
    }
  };
  const allStatisticsOld = await getStatistics();
  const statisticOld = allStatisticsOld?.optional;

  let dayStaticsicOld: undefined | DayStatistics = undefined;

  if (statisticOld) {
    dayStaticsicOld = statisticOld[day];
  }
  // если уже есть статистика за текущий день - модифицируем
  if (dayStaticsicOld) {
    todayStatistic = {
      ...dayStaticsicOld, // копируем данные по второй игре
      learnWords: learnedCount + dayStaticsicOld.learnWords,
      [game]: {
        correct: dayStaticsicOld[game].correct + results.correct,
        incorrect: dayStaticsicOld[game].incorrect + results.incorrect,
        rowCorrect: Math.max(dayStaticsicOld[game].rowCorrect, results.rowCorrect),
        newWords: dayStaticsicOld[game].newWords + results.newWords
      }
    };
  }
  // если нет статистики за текущий день
  else {
    todayStatistic = {
      ...templateDayStatistic,
      [game]: results
    };
  }

  const statisticNew: OptionalStatistics = {
    ...statisticOld,
    [day]: todayStatistic
  };

  await setStatistics(statisticNew);
};
