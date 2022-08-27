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
  isPlaying: boolean;
}

export interface IIsPlaying {
  card: IWordCard;
  isPlaying: boolean;
}

export interface IState {
  group: number;
  page: number;
}

export interface IID {
  id: string;
}
