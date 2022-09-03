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
  funcAudio?: TCallbackAudio;
  funcRender: TCallbackRender;
}

export interface IState {
  group: number;
  page: number;
  color: string;
  allUserWords?: IWordCard[];
}

export type TCallbackAudio = (audioList: HTMLAudioElement[]) => void;
export type TCallbackRender = () => void;

export interface IID {
  id: string;
  funcAudio: TCallbackAudio;
  funcRender: TCallbackRender;
  color: string;
  allUserWords?: IWordCard[];
}

export interface IAudio {
  id: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  funcAudio: TCallbackAudio;
}
