import React from 'react';
import classes from './SprintGame.module.scss';

export interface IProps {
  changeScreen: (n: boolean, b: number) => void;
}

export const GreetingScreen: React.FC<IProps> = (props) => {
  return (
    <>
      <div className={classes.bg}></div>
      <div className={classes.bg + ' ' + classes.bg2}></div>
      <div className={classes.bg + ' ' + classes.bg3}></div>

      <div className={classes.content}>
        <div className={classes.greetingScreenWrapper}>
          <h2 className={classes.greetingScreenTitleMain}>Привет!</h2>
          <h3 className={classes.greetingScreenTitleMain}>
            Чтобы продолжить, пожалуйста, выберите уровень сложности:
          </h3>
          <ul className={classes.difficultyList}>
            <li>
              <button
                className={classes.difficultyBtn + ' ' + classes.difficultyBtn1}
                onClick={() => props.changeScreen(false, 0)}>
                Уровень А1. Breakthrough or beginner
              </button>
            </li>
            <li>
              <button
                className={classes.difficultyBtn + ' ' + classes.difficultyBtn2}
                onClick={() => props.changeScreen(false, 1)}>
                Уровень А2. Way stage or elementary
              </button>
            </li>
            <li>
              <button
                className={classes.difficultyBtn + ' ' + classes.difficultyBtn3}
                onClick={() => props.changeScreen(false, 2)}>
                Уровень B1. Threshold or intermediate
              </button>
            </li>
            <li>
              <button
                className={classes.difficultyBtn + ' ' + classes.difficultyBtn4}
                onClick={() => props.changeScreen(false, 3)}>
                Уровень B2. Vantage or upper intermediate
              </button>
            </li>
            <li>
              <button
                className={classes.difficultyBtn + ' ' + classes.difficultyBtn5}
                onClick={() => props.changeScreen(false, 4)}>
                Уровень C1. Effective operational proficiency or advanced
              </button>
            </li>
            <li>
              <button
                className={classes.difficultyBtn + ' ' + classes.difficultyBtn6}
                onClick={() => props.changeScreen(false, 5)}>
                Уровень C2. Mastery or proficiency
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
