import { IWordCard } from './consts';

export function saveWordsInStorage(usersWords: IWordCard[]) {
  window.localStorage.setItem('userWords', JSON.stringify(usersWords));
}
