import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { App } from '../components/Textbook/App/App';
import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';
import { ReactLearnWordsAPI } from '../components/API/getWords';
import { IWordCard } from '../components/Textbook/consts';

export class TextbookPage extends Component {
  static contextType = AuthorizeContext;
  context!: React.ContextType<typeof AuthorizeContext>;
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  state = {
    allUsersWords: []
  };

  componentDidMount() {
    this.getCountAllUserWords();
  }

  async getUserWordsByPage(numberPage: number, allUsersWords: IWordCard[], wordsAtPages: number) {
    const result = await this.reactLearnWordsAPI.getUserWordsByPage(numberPage, wordsAtPages);
    if (result) {
      result.words.forEach((el: IWordCard) => allUsersWords.push(el));
    }
  }

  async getCountAllUserWords() {
    const wordsAtPages = 100;
    const allUsersWords: IWordCard[] = [];
    await this.reactLearnWordsAPI.getUserWordsByPage(0, wordsAtPages).then((value) => {
      if (value) {
        const countPages = Math.ceil(value.countPages / wordsAtPages);
        if (countPages === 1) {
          value.words.forEach((el: IWordCard) => allUsersWords.push(el));
        } else {
          for (let i = 0; i < countPages; i++) {
            this.getUserWordsByPage(i, allUsersWords, wordsAtPages);
          }
        }
      }
      this.setState({
        allUsersWords: allUsersWords
      });
    });
  }

  render() {
    const isAuthorized = this.context.isAuthorized;
    return (
      <>
        <Header {...{ isAuthorized }} />
        <App />
      </>
    );
  }
}
