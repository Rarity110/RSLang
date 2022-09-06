import React, { Component } from 'react';
import { Context } from '../../../App/Context';
import { IWordCard } from '../../../../types/props';
import classes from './WordStat.module.scss';

interface IWordStat {
  wordCard: IWordCard;
}

export class WordStat extends Component<IWordStat> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  state = {
    correct: this.props.wordCard.userWord?.optional?.correct,
    incorrect: this.props.wordCard.userWord?.optional?.incorrect
  };

  componentDidMount() {
    this.setState({
      correct: this.props.wordCard.userWord?.optional?.correct,
      incorrect: this.props.wordCard.userWord?.optional?.incorrect
    });
  }

  render(): React.ReactNode {
    const isAuthorized = this.context.isAuthorized;
    const correct = this.state.correct ? this.state.correct : 0;
    const incorrect = this.state.incorrect ? this.state.incorrect : 0;
    const total = correct + incorrect;

    if (isAuthorized) {
      const CorrectAndIncorrect = () => {
        if (total) {
          return (
            <div className={classes.wordStatPoints}>
              <div className={classes.wordStatPointsPoint}>
                <div>Количество верных ответов: </div>
                <div className={classes.wordStatPointsPointCorrect}> {correct}</div>
              </div>
              <div className={classes.wordStatPointsPoint}>
                <div>Количество ошибок: </div>
                <div className={classes.wordStatPointsPointIncorrect}> {incorrect}</div>
              </div>
            </div>
          );
        } else {
          return <div></div>;
        }
      };
      return (
        <div className={classes.wordStat}>
          <div className={classes.wordStatTotal}>Всего игр со словом: {total}</div>
          <CorrectAndIncorrect />
        </div>
      );
    }
  }
}
