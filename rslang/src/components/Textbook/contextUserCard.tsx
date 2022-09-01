import React from 'react';
import { IWordCard } from './consts';
import { ReactLearnWordsAPI } from '../API/getWords';

const reactLearnWordsAPI = new ReactLearnWordsAPI();

async function getUserWordsByPage(
  numberPage: number,
  usersWords: IWordCard[],
  wordsAtPages: number
) {
  const result = await reactLearnWordsAPI.getUserWordsByPage(numberPage, wordsAtPages);
  if (result) {
    result.words.forEach((el: IWordCard) => usersWords.push(el));
  }
}

async function getCountAllUserWords() {
  const usersWords: IWordCard[] = [];
  const wordsAtPages = 100;
  await reactLearnWordsAPI.getUserWordsByPage(0, wordsAtPages).then((value) => {
    if (value) {
      const countPages = Math.ceil(value.countPages / wordsAtPages);
      if (countPages === 1) {
        value.words.forEach((el: IWordCard) => usersWords.push(el));
      } else {
        for (let i = 0; i < countPages; i++) {
          getUserWordsByPage(i, usersWords, wordsAtPages);
        }
      }
    }
  });
  usersWords.forEach((el) => {
    if (el._id) {
      el.id = el._id;
    }
  });
  return usersWords;
}

const allUserWords: IWordCard[] = [];
getCountAllUserWords().then((res) => {
  res.forEach((el) => allUserWords.push(el));
});

export const { Provider: AllUsersWordsProvader, Consumer: AllUsersWordsConsumer } =
  React.createContext(allUserWords);
