import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import AuthorizedPage from '../../pages/AuthorizedPage';
import HomePage from '../../pages/HomePage';
import StatisticsPage from '../../pages/StatisticsPage';
import AudioChallengePage from '../../pages/AudioChallengePage';
import classes from './App.module.scss';
import { TextbookPage } from '../../pages/TextbookPage';
import SprintGamePage from '../../pages/SprintGamePage';
import { IWordCard } from '../Textbook/consts';
import { Context } from '../Textbook/Context';
import { ReactLearnWordsAPI } from '../API/getWords';

interface IContext {
  allUserWords: IWordCard[];
  isAuthorized: boolean;
  authorize: () => void;
  logout: () => void;
}

class App extends Component {
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
  render(): React.ReactNode {
    const { allUserWords, isAuthorized, authorize, logout } = this.state;
    return (
      <Context.Provider
        value={{
          allUserWords: allUserWords,
          isAuthorized: isAuthorized,
          authorize: authorize,
          logout: logout
        }}>
        <StyledEngineProvider injectFirst>
          <div className={classes.page}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/textbook" element={<TextbookPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/audio-challenge" element={<AudioChallengePage />} />
              <Route path="/auth-form" element={<AuthorizedPage />} />
              <Route path="/sprint-game" element={<SprintGamePage />} />
            </Routes>
          </div>
        </StyledEngineProvider>
      </Context.Provider>
    );
  }
}

export default App;
