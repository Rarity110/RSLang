import classes from './SprintGame.module.scss';
import React, { useEffect, useState } from 'react';
import { getPadTime } from './getPadTime';

interface IEndingScreenProps {
  changeScreen: (n: boolean) => void;
}

export const Timer: React.FC<IEndingScreenProps> = (props) => {
  const [timeLeft, setTimeleft] = useState(30);
  const [isCounting, setIsCounting] = useState(true);

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - Number(minutes) * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTimeleft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    if (timeLeft === 0) {
      setIsCounting(false);
      props.changeScreen(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, isCounting]);

  return (
    <div className={classes.timerApp}>
      <div className={classes.timer}>
        <span>{seconds}</span>
      </div>
    </div>
  );
};
