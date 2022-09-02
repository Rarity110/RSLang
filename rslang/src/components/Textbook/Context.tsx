import React, { Component } from 'react';
import { IWordCard } from './consts';
import { ReactLearnWordsAPI } from '../API/getWords';

interface IContext {
  allUserWords: IWordCard[];
  isAuthorized: boolean;
  authorize: () => void;
  logout: () => void;
}

type Props = {
  children: React.ReactNode;
};

const emptyObj = {} as IContext;

export const Context = React.createContext({
  allUserWords: [] as IWordCard[],
  isAuthorized: false,
  authorize: () => emptyObj,
  logout: () => emptyObj
});

class MyContextProvider extends Component<Props> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  emptyObj = {} as IContext;

  state = {
    allUserWords: [] as IWordCard[],
    isAuthorized: false,
    authorize: () => emptyObj,
    logout: () => emptyObj
  };

  componentDidMount() {
    const storage: string | null = localStorage.getItem('loginRSLang');
    if (storage) {
      this.setState({
        isAuthorized: true,
        authorize: () => this.emptyObj,
        logout: () => this.setAuthorize(false)
      });
      this.getAllUserWords();
    } else {
      this.setState({
        isAuthorized: false,
        allUserWords: [] as IWordCard[],
        authorize: () => this.setAuthorize(true),
        logout: () => this.emptyObj
      });
    }
    // this.updateContext;
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

  //   updateContext() {
  //     const myContext = React.createContext<IContext>(this.state);
  //     this.setState({
  //       context: myContext
  //     });
  //   }

  render(): React.ReactNode {
    const { allUserWords, isAuthorized, authorize, logout } = this.state;
    console.log(isAuthorized, allUserWords);
    return (
      <Context.Provider
        value={{
          allUserWords: allUserWords,
          isAuthorized: isAuthorized,
          authorize: authorize,
          logout: logout
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
