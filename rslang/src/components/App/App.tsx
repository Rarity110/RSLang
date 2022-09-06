import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import { Context } from './Context';
import { ReactLearnWordsAPI } from '../API/getWords';
import { metaKeyWords, loginKey } from '../auth-form/localStorageFunctions';
import { COUNT_ALL_WORDS } from '../../consts/consts';

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
    this.updateState();
  }

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

  async getallUserWords() {
    const usersWords: IWordCard[] = [];
    await this.reactLearnWordsAPI
      .getUserWordsByPage(0, COUNT_ALL_WORDS)
      .then((value) => {
        if (value?.words) {
          value.words.forEach((el: IWordCard) => {
            if (el._id) {
              el.id = el._id;
            }
            usersWords.push(el);
          });
        }
      })
      .then(() => {
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
              <Route
                path="/auth-form"
                element={
                  localStorage.getItem('loginRSLang') ? <Navigate to="/" /> : <AuthorizedPage />
                }
              />
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
