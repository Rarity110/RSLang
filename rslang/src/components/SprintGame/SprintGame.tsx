import { Button } from '@mui/material';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import React, { useEffect, useState } from 'react';
import classes from './SprintGame.module.scss';
import { rightAnswerPlay, wrongAnswerPlay } from './Audio';
import { getWords } from './gameApi';
import { IWord } from './gameTypes';
import { getRandomNumber, arrayRandElement } from './getRandomNumber';
import { Timer } from './SprintTimer';
import { GreetingScreen } from './GreetingScreen';
import { EndingScreen } from './EndingScreen';
import { useLocation } from 'react-router-dom';
import { BASEURL_API } from '../../consts/consts';
// export let pageReducer = 1;

const pagesCount = 29;

interface ISprintProps {
  page?: number;
  group?: number;
}

// ---------------------------------------------
export const SprintGame: React.FC<ISprintProps> = () => {
  const [words, setWords] = useState<IWord>();
  const trueTranslate = words?.wordTranslate;
  const [translate, setTranslate] = useState<string>();
  const [score, setScore] = useState('0');
  const [increaseModifCount, setIncreaseModifCount] = useState(0);
  const [modificator, setModificator] = useState('1');
  const [greetingScreen, setGreetingScreen] = useState(true);
  const [endingScreen, setEndingScreen] = useState(false);
  const [chosenGroup, setChosenGroup] = useState(0);
  const location = useLocation();
  const { group, page } = (location.state as ISprintProps) || {};
  const [textbookWordsArr, setTextbookWordsArr] = useState<IWord[]>();
  const [plusArr] = useState<(IWord | undefined)[]>([]);
  const [minusArr] = useState<(IWord | undefined)[]>([]);
  const [correctRowAnswerArr] = useState<number[]>([]);
  const [pageReducer, setPageReducer] = useState<number>(1);

  async function getTextbookWords(group: number, page: number, pageReducer?: number) {
    if (pageReducer !== undefined) {
      const textbookWords = await getWords(group, page - pageReducer);
      setTextbookWordsArr(textbookWords);
    } else {
      const textbookWords = await getWords(group, page);
      setTextbookWordsArr(textbookWords);
    }
  }

  async function useTextbookWords() {
    const randomTranslate = arrayRandElement(textbookWordsArr)?.wordTranslate;
    const randomWord = arrayRandElement(textbookWordsArr);
    const randomTranslateFalsyNumber = getRandomNumber(10);
    const randomWordIndex = textbookWordsArr?.findIndex((e) => e === randomWord);

    setWords(randomWord);
    setTranslate(randomTranslate);
    if (randomTranslateFalsyNumber > 5) {
      setTranslate(randomTranslate);
    } else {
      setTranslate(randomWord?.wordTranslate);
    }
    if (randomWordIndex) {
      textbookWordsArr?.splice(randomWordIndex, 1);
      // console.log(textbookWordsArr);
    }
    if (
      textbookWordsArr &&
      textbookWordsArr.length < 3 &&
      page !== undefined &&
      page !== 0 &&
      group !== undefined
    ) {
      getTextbookWords(group, page - pageReducer);
      // pageReducer++;
      setPageReducer(pageReducer + 1);
    }
    if (textbookWordsArr && textbookWordsArr.length < 3 && page === 0) {
      setEndingScreen(true);
    }
  }

  async function fetchWords() {
    const randomPageNumber = getRandomNumber(pagesCount);
    const randomTranslateFalsyNumber = getRandomNumber(10);
    const words: IWord[] = await getWords(chosenGroup, randomPageNumber);

    const randomTranslate = arrayRandElement(words)?.wordTranslate;
    const randomWord = arrayRandElement(words);

    setWords(randomWord);
    setTranslate(randomTranslate);

    if (randomTranslateFalsyNumber > 5) {
      setTranslate(randomTranslate);
    } else {
      setTranslate(randomWord?.wordTranslate);
    }
  }

  const isTranslateCorrect = trueTranslate === translate;

  function gameApproveBtn(option: boolean) {
    if (location.state) {
      useTextbookWords();
    } else {
      fetchWords();
    }
    if (isTranslateCorrect === option) {
      setIncreaseModifCount(increaseModifCount + 1);
      setScore((Number(score) + 20 * Number(modificator)).toString());
      if (increaseModifCount === 3 && Number(modificator) < 4) {
        setModificator((Number(modificator) + 1).toString());
        setIncreaseModifCount(0);
      }
      rightAnswerPlay();
      plusArr.push(words);
      correctRowAnswerArr.push(1);
    } else {
      correctRowAnswerArr.push(0);
      setModificator('1');
      wrongAnswerPlay();
      minusArr.push(words);
    }
  }

  useEffect(() => {
    fetchWords();

    if (group !== undefined && page !== undefined) {
      setGreetingScreen(false);
      getTextbookWords(group, page);
      useTextbookWords();
    }
    // pageReducer = 1;
    setPageReducer(1);
  }, []);

  const audio = new Audio(BASEURL_API + '/' + words?.audio);

  const start = () => {
    audio.play();
  };

  const changeGreetingScreener = (n: boolean, b?: number) => {
    setGreetingScreen(n);
    if (b) setChosenGroup(b);
  };

  const changeEndingScreener = (n: boolean) => {
    setEndingScreen(n);
  };

  const setScoreAfterEnding = (a: string) => {
    setScore(a);
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowLeft') {
      gameApproveBtn(false);
    }
    if (event.key === 'ArrowRight') {
      gameApproveBtn(true);
    }
  }

  return (
    <>
      {endingScreen && !greetingScreen && (
        <EndingScreen
          score={score}
          setScore={setScoreAfterEnding}
          resultPlus={plusArr}
          resultMinus={minusArr}
          correctRowAnswerArr={correctRowAnswerArr}
          changeEndScreen={changeEndingScreener}
          changeStartScreen={changeGreetingScreener}></EndingScreen>
      )}
      {greetingScreen && !endingScreen && (
        <GreetingScreen changeScreen={changeGreetingScreener}></GreetingScreen>
      )}

      {!greetingScreen && !endingScreen && (
        <div tabIndex={3} className={classes.sprintWrapper} onKeyDown={handleKeyDown}>
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
