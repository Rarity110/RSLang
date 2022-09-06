import { IWord } from './gameTypes';

export function getRandomNumber(maxQuantity: number) {
  return Math.floor(Math.random() * maxQuantity);
}

export function arrayRandElement(arr?: IWord[]) {
  if (arr !== undefined) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  } else {
    return undefined;
  }
}
