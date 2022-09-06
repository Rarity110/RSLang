export enum BookGroupNameShort {
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
  'HARD'
}

export enum BookGroupName {
  'A1. Elementary',
  'A2. Pre-Intermediate',
  'B1. Intermediate',
  'B2. Upper-Intermediate',
  'C1. Advanced',
  'C2. Proficiency',
  'HARD. Difficult words'
}

export interface WordItem {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface GameStatistics {
  correct: number;
  incorrect: number;
  rowCorrect: number;
  newWords: number;
}

export interface DayStatistics {
  learnWords: number;
  audio: GameStatistics;
  sprint: GameStatistics;
}

export interface OptionalStatistics {
  [key: string]: DayStatistics;
}

export interface AllStatistics {
  id?: string;
  learnedWords?: number;
  optional?: OptionalStatistics;
}
