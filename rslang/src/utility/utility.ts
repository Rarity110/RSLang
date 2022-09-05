import { IWordCard } from '../types/props';

export function setWordsInStorage(usersWords: IWordCard[]) {
  window.localStorage.setItem('userWords', JSON.stringify(usersWords));
}
