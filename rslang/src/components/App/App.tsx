import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import AuthorizedPage from '../../pages/AuthorizedPage';
import HomePage from '../../pages/HomePage';
import StatisticsPage from '../../pages/StatisticsPage';
import AudioChallengePage from '../../pages/AudioChallengePage';
import { TextbookPage } from '../../pages/TextbookPage';
import SprintGamePage from '../../pages/SprintGamePage';
import NotFoundPage from '../../pages/NotFoundPage';
import classes from './App.module.scss';
import { IWordCard } from '../../types/props';
import { Context, IContext } from './Context';
import { ReactLearnWordsAPI } from '../API/getWords';
import { metaKeyWords, loginKey } from '../auth-form/localStorageFunctions';

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
    this.updateState();
  }

  // componentDidUpdate(prevProps: boolean) {
  //   if (this.props.isAuthorized !== prevProps.wordCard.userWord?.difficulty) {
  //     this.updateDifficult();
  //   }
  // }

  updateState() {
    const storageLogin: string | null = localStorage.getItem(loginKey);
    if (storageLogin) {
      this.setState({
        isAuthorized: true,
        authorize: () => this.emptyObj,
        logout: () => this.setAuthorize(false)
      });
      const storageUserWords: string | null = localStorage.getItem(metaKeyWords);
      if (storageUserWords) {
        this.setState({
          allUserWords: JSON.parse(storageUserWords)
        });
      } else {
        this.getallUserWords();
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
      window.localStorage.setItem(metaKeyWords, JSON.stringify(usersWords));
    }
  }

  async getallUserWords() {
    const usersWords: IWordCard[] = [];
    const wordsAtPages = 100;
    await this.reactLearnWordsAPI
      .getUserWordsByPage(0, wordsAtPages)
      .then((value) => {
        if (value) {
          const countPages = Math.ceil(value.countPages / wordsAtPages);
          if (countPages === 1) {
            value.words.forEach((el: IWordCard) => {
              console.log(el);
              if (el._id) {
                console.log(el._id);
                el.id = el._id;
              }
              usersWords.push(el);
            });
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
      })
      .then(() => {
        // console.log(usersWords);
        this.setState({
          allUserWords: usersWords
        });
        window.localStorage.setItem(metaKeyWords, JSON.stringify(usersWords));
      });
  }

  setAuthorize(value: boolean) {
    if (value) {
      this.setState({
        isAuthorized: true
      });
      this.getallUserWords();
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </StyledEngineProvider>
      </Context.Provider>
    );
  }
}

export default App;
