export interface IWord {
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
  funcAudio?: (audioList: HTMLAudioElement[]) => void;
  funcRender?: () => void;
}

export interface IUserWord {
  difficulty?: string;
  optional?: IUserWordOptional;
}

export interface IUserWordOptional {
  correct: number;
  incorrect: number;
  rowCorrect: number;
}

export interface SprintOption {
  key: string;
  wordTranslate: string;
  result: boolean;
}

// export interface SprintWord {
//   id: string;
//   group: number;
//   page: number;
//   word: string;
//   image: string;
//   audio: string;
//   audioMeaning: string;
//   audioExample: string;
//   textMeaning: string;
//   textExample: string;
//   transcription: string;
//   textExampleTranslate: string;
//   textMeaningTranslate: string;
//   wordTranslate: string;
//   options: SprintOption[];
//   isComplete: boolean;
//   result: boolean;
// }

// export interface SprintWordResult {
//   id: string;
//   group: number;
//   page: number;
//   word: string;
//   image: string;
//   audio: string;
//   audioMeaning: string;
//   audioExample: string;
//   textMeaning: string;
//   textExample: string;
//   transcription: string;
//   textExampleTranslate: string;
//   textMeaningTranslate: string;
//   wordTranslate: string;
//   options?: SprintOption[];
//   isComplete?: boolean;
//   result?: boolean;
// }

// export interface SprintProgress {
//   current: number;
//   total: number;
// }
