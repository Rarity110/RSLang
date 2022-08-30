import { IWord } from './gameTypes';

export function getRandomNumber(maxQuantity: number) {
  return Math.floor(Math.random() * maxQuantity);
}

export function arrayRandElement(arr: IWord[]) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
