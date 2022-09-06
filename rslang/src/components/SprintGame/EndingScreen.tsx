import React from 'react';
import { IWord } from './gameTypes';
import classes from './SprintGame.module.scss';
import { ResWordCard } from './ResultWordCard';

interface IEndingScreenProps {
  score: string;
  setScore: (a: string) => void;
  resultPlus: (IWord | undefined)[];
  resultMinus: (IWord | undefined)[];
  changeEndScreen: (n: boolean) => void;
  changeStartScreen: (n: boolean, b?: number) => void;
}

export const EndingScreen: React.FC<IEndingScreenProps> = (props) => {
  function restart() {
    props.changeEndScreen(false);
    props.changeStartScreen(true);
    props.resultPlus.splice(0, props.resultPlus.length);
    props.resultMinus.splice(0, props.resultMinus.length);
    props.setScore('0');
    window.location.reload();
  }

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
