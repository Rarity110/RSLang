import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { App } from '../components/Textbook/App/App';
// import { AuthorizeContext } from '../components/auth-form/AuthorizeContext';
import { ReactLearnWordsAPI } from '../components/API/getWords';
import { IWordCard } from '../components/Textbook/consts';
import { Context } from '../components/Textbook/Context';

interface IContext {
  allUserWords: IWordCard[];
  isAuthorized: boolean;
  authorize: () => void;
  logout: () => void;
}

export class TextbookPage extends Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  emptyObj = {} as IContext;

  state = {
    allUserWords: [] as IWordCard[],
    isAuthorized: false,
    authorize: () => this.emptyObj,
    logout: () => this.emptyObj
  };

  componentDidMount() {
    const storageLogin: string | null = localStorage.getItem('loginRSLang');
    if (storageLogin) {
      this.setState({
        isAuthorized: true,
        authorize: () => this.emptyObj,
        logout: () => this.setAuthorize(false)
      });
      const storageUserWords: string | null = localStorage.getItem('userWords');
      if (storageUserWords) {
        this.setState({
          allUserWords: JSON.parse(storageUserWords)
        });
      } else {
        this.getAllUserWords();
      }
    } else {
      this.setState({
        isAuthorized: false,
        allUserWords: [] as IWordCard[],
        authorize: () => this.setAuthorize(true),
        logout: () => this.emptyObj
      });
    }
  }

  async getUserWordsByPage(numberPage: number, usersWords: IWordCard[], wordsAtPages: number) {
    const result = await this.reactLearnWordsAPI.getUserWordsByPage(numberPage, wordsAtPages);
    if (result) {
      result.words.forEach((el: IWordCard) => usersWords.push(el));
    }
  }

  async getAllUserWords() {
    const usersWords: IWordCard[] = [];
    const wordsAtPages = 100;
    await this.reactLearnWordsAPI
      .getUserWordsByPage(0, wordsAtPages)
      .then((value) => {
        if (value) {
          const countPages = Math.ceil(value.countPages / wordsAtPages);
          if (countPages === 1) {
            value.words.forEach((el: IWordCard) => usersWords.push(el));
          } else {
            for (let i = 0; i < countPages; i++) {
              this.getUserWordsByPage(i, usersWords, wordsAtPages);
            }
          }
        }
      })
      .then(() => {
        usersWords.forEach((el) => {
          if (el._id) {
            el.id = el._id;
          }
        });
        this.setState({
          allUserWords: usersWords
        });
        window.localStorage.setItem('userWords', JSON.stringify(usersWords));
      });
  }

  setAuthorize(value: boolean) {
    if (value) {
      this.setState({
        isAuthorized: true
      });
      this.getAllUserWords();
    } else {
      this.setState({
        isAuthorized: false,
        allUserWords: [] as IWordCard[]
      });
    }
  }

  render() {
    const { allUserWords, isAuthorized, authorize, logout } = this.state;
    return (
      <Context.Provider
        value={{
          allUserWords: allUserWords,
          isAuthorized: isAuthorized,
          authorize: authorize,
          logout: logout
        }}>
        <Header {...{ isAuthorized }} />
        <App />
      </Context.Provider>
    );
  }
}
