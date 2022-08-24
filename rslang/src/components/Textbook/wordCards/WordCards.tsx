import React, { Component } from 'react';
import { Grid } from '@mui/material';
import { ReactLearnWordsAPI } from '../../API/getWords';
import { WordCard } from '../WordCard/WordCard';
import { IWordCard, IState } from '../consts';

export class WordCards extends Component<IState> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  state = {
    group: 0,
    page: 0,
    cards: [] as IWordCard[]
  };

  componentDidMount() {
    this.updateCards();
  }

  componentDidUpdate(prevProps: IState) {
    if (this.props.page !== prevProps.page || this.props.group !== prevProps.group) {
      this.updateCards();
    }
  }

  updateCards() {
    const { page, group } = this.props;
    this.setState({
      page: page,
      group: group
    });
    this.reactLearnWordsAPI.getWords(group, page).then((words) => {
      this.setState({
        cards: words
      });
    });
  }

  render() {
    const cards = this.state.cards;
    return (
      <Grid container rowSpacing={4} columnSpacing={{ xs: 0, sm: 4, md: 6 }} mt={1}>
        {cards.map((item: IWordCard) => (
          <Grid item xs={12} sm={6} lg={4} key={item.image}>
            <WordCard id={item.id} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
