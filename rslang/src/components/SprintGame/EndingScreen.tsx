import React, { useContext, useEffect } from 'react';
import { IWord } from './gameTypes';
import classes from './SprintGame.module.scss';
import { ResWordCard } from './ResultWordCard';
import { updateStatisticAfterGame, updateWordAfterGame } from '../../utility/games';
import { Context } from '../App/Context';

interface IEndingScreenProps {
  score: string;
  setScore: (a: string) => void;
  resultPlus: (IWord | undefined)[];
  resultMinus: (IWord | undefined)[];
  correctRowAnswerArr: number[];
  changeEndScreen: (n: boolean) => void;
  changeStartScreen: (n: boolean, b?: number) => void;
}

export const EndingScreen: React.FC<IEndingScreenProps> = (props) => {
  const { allUserWords, isAuthorized } = useContext(Context);

  function restart() {
    props.changeEndScreen(false);
    props.changeStartScreen(true);
    props.resultPlus.splice(0, props.resultPlus.length);
    props.resultMinus.splice(0, props.resultMinus.length);
    props.setScore('0');
    window.location.reload();
  }

  useEffect(() => {
    const refreshStatistic = async () => {
      const resultTotal: { learnedCount: number; newCount: number } = {
        learnedCount: 0,
        newCount: 0
      };

      const resultPlusArrayPromise = props.resultPlus.map(async (word) => {
        if (word) return updateWordAfterGame(allUserWords, word, true);
      });

      const resultsPlusArray = await Promise.all(resultPlusArrayPromise);
      resultsPlusArray.map((item) => {
        resultTotal.learnedCount += item?.isLearned ? 1 : 0;
        resultTotal.newCount += item?.isNew ? 1 : 0;
      });

      const resultMinusArrayPromise = props.resultMinus.map(async (word) => {
        if (word) return updateWordAfterGame(allUserWords, word, false);
      });

      const resultsMinusArray = await Promise.all(resultMinusArrayPromise);
      resultsMinusArray.map((item) => {
        resultTotal.learnedCount += item?.isLearned ? 1 : 0;
        resultTotal.newCount += item?.isNew ? 1 : 0;
      });

      let maxCorrectRow = 0;
      let counter = 0;
      props.correctRowAnswerArr.forEach((el) => {
        if (el === 1) counter++;
        if (el === 0) counter = 0;
        if (counter > maxCorrectRow) maxCorrectRow = counter;
      });

      await updateStatisticAfterGame('sprint', resultTotal.learnedCount, {
        correct: props.resultPlus.length,
        incorrect: props.resultMinus.length,
        rowCorrect: maxCorrectRow,
        newWords: resultTotal.newCount
      });
    };
    if (isAuthorized) refreshStatistic();
  });

  return (
    <>
      <div className={classes.bg}></div>
      <div className={classes.bg + ' ' + classes.bg2}></div>
      <div className={classes.bg + ' ' + classes.bg3}></div>
      <div className={classes.content}>
        <div className={classes.resultTableWrapper}>
          <h2 className={classes.scoreTitle}>Ваш результат: {props.score} очков</h2>

          <div className={classes.resultsAllResultsWrapper}>
            <div>
              <h3>Отвечено верно:</h3>
              <div className={classes.resultsPlusWords}>
                {props.resultPlus.map((item) => (
                  <ResWordCard
                    word={item?.word}
                    wordTranslate={item?.wordTranslate}
                    audio={item?.audio}
                    key={item?.id}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3>Предстоит выучить:</h3>
              <div className={classes.resultsMinusWords}>
                {props.resultMinus.map((item) => (
                  <ResWordCard
                    word={item?.word}
                    wordTranslate={item?.wordTranslate}
                    audio={item?.audio}
                    key={item?.id}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className={classes.restartSprintBtn} onClick={restart}>
            Начать заново!
          </button>
        </div>
      </div>
    </>
  );
};
