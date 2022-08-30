import { Button } from '@mui/material';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import React, { useEffect, useState } from 'react';
import classes from './SprintGame.module.scss';
import { rightAnswerPlay, wrongAnswerPlay } from './Audio';
import { getWords, URL } from './gameApi';
import { IWord } from './gameTypes';
import { getRandomNumber, arrayRandElement } from './getRandomNumber';
import { Timer } from './SprintTimer';
import { GreetingScreen } from './GreetingScreen';
import { EndingScreen } from './EndingScreen';

// const groupCount = 5;
const pagesCount = 29;
export const plusArr: (IWord | undefined)[] = [];
export const minusArr: (IWord | undefined)[] = [];

// ---------------------------------------------
export const SprintGame = () => {
  const [words, setWords] = useState<IWord>();
  const trueTranslate = words?.wordTranslate;
  const [translate, setTranslate] = useState<string>();
  const [score, setScore] = useState('0');
  const [increaseModifCount, setIncreaseModifCount] = useState(0);
  const [modificator, setModificator] = useState('1');
  const [greetingScreen, setGreetingScreen] = useState(true);
  const [endingScreen, setEndingScreen] = useState(false);
  // const randomGroupNumber = getRandomNumber(groupCount);
  // const group = randomGroupNumber;
  const [group, setGroup] = useState(0);

  async function fetchWords() {
    const randomPageNumber = getRandomNumber(pagesCount);
    const randomTranslateFalsyNumber = getRandomNumber(10);
    const words: IWord[] = await getWords(group, randomPageNumber);
    const randomTranslate = arrayRandElement(words).wordTranslate;
    const randomWord = arrayRandElement(words);

    setWords(randomWord);
    setTranslate(randomTranslate);
    if (randomTranslateFalsyNumber > 5) {
      setTranslate(randomTranslate);
    } else {
      setTranslate(randomWord.wordTranslate);
    }
  }

  const isTranslateCorrect = trueTranslate === translate;

  function gameApproveBtn(option: boolean) {
    fetchWords();
    if (isTranslateCorrect === option) {
      setIncreaseModifCount(increaseModifCount + 1);
      setScore((Number(score) + 20 * Number(modificator)).toString());
      if (increaseModifCount === 3 && Number(modificator) < 4) {
        setModificator((Number(modificator) + 1).toString());
        setIncreaseModifCount(0);
      }
      rightAnswerPlay();
      plusArr.push(words);
    } else {
      // setScore('0');
      setModificator('1');
      wrongAnswerPlay();
      minusArr.push(words);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const audio = new Audio(URL + '/' + words?.audio);

  const start = () => {
    audio.play();
  };

  const changeGreetingScreener = (n: boolean, b?: number) => {
    setGreetingScreen(n);
    if (b) setGroup(b);
  };

  const changeEndingScreener = (n: boolean) => {
    setEndingScreen(n);
  };

  const setScoreAfterEnding = (a: string) => {
    setScore(a);
  };

  return (
    <>
      {endingScreen && !greetingScreen && (
        <EndingScreen
          score={score}
          setScore={setScoreAfterEnding}
          resultPlus={plusArr}
          resultMinus={minusArr}
          changeEndScreen={changeEndingScreener}
          changeStartScreen={changeGreetingScreener}></EndingScreen>
      )}
      {greetingScreen && !endingScreen && (
        <GreetingScreen changeScreen={changeGreetingScreener}></GreetingScreen>
      )}

      {!greetingScreen && !endingScreen && (
        <div className={classes.sprintWrapper}>
          <Timer changeScreen={changeEndingScreener}></Timer>
          <div>
            <Button
              variant="outlined"
              component="span"
              startIcon={<SpatialAudioOffIcon />}
              onClick={start}></Button>
          </div>
          <div className={classes.word}>{words?.word}</div>
          <div className={classes.wordTranslate}>{translate}</div>
          <div className={classes.buttons}>
            <button className={classes.rejectBtn} onClick={() => gameApproveBtn(false)}>
              Неверно
            </button>
            <button className={classes.approveBtn} onClick={() => gameApproveBtn(true)}>
              Верно
            </button>
          </div>

          <div>Score: {score}</div>
          <div>Modificator: {modificator}</div>
        </div>
      )}
    </>
  );
};
