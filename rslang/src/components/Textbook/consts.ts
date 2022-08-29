export interface IWordCard {
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
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

// TODO refactor duble
export interface IStateCard {
  id: string;
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
  func: TCallback;
}

export interface IState {
  group: number;
  page: number;
  color: string;
}

type TCallback = (audioList: HTMLAudioElement[]) => void;

export interface IID {
  id: string;
  func: TCallback;
  color: string;
}

export interface IAudio {
  id: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  func: TCallback;
}

const UserID = '630c74f3ff834f4fe0142bb7';
