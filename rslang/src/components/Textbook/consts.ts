interface IUserWord {
  difficulty?: string;
  optional?: {
    total?: number;
    wrong: number;
  };
}

export interface IWordCard {
  id: string;
  _id?: string;
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
  userWord?: IUserWord;
  func?: TCallback;
}

export interface IState {
  group: number;
  page: number;
  color: string;
  allUserWords: IWordCard[];
  allUsersWordsLength?: number;
}

export type TCallback = (audioList: HTMLAudioElement[]) => void;

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
