import { IWordCard } from '../types/props';
import { STORAGE_KEY_USER_INFO, STORAGE_KEY_USER_WORDS } from '../consts/consts';

/**
 * Установка userWords в localStorage
 */
export function setWordsInStorage(usersWords: IWordCard[]) {
  window.localStorage.setItem(STORAGE_KEY_USER_WORDS, JSON.stringify(usersWords));
}

/**
 * Получение userID и token из localStorage
 */
export const getUser = () => {
  let userID = '';
  let token = '';
  if (localStorage.getItem(STORAGE_KEY_USER_INFO)) {
    const storage: string = localStorage.getItem(STORAGE_KEY_USER_INFO) as string;
    userID = JSON.parse(storage).userId;
    token = JSON.parse(storage).token;
  }
  return { userID, token };
};

/**
 * Получение unix timestamp на 0:00:00:000 часов переданного дня
 */
export const getDay = (date: Date | string | number): number => {
  const d = typeof date === 'object' ? date : new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};
