export interface GameRouteParam {
  group: number;
  page: number;
}

export interface IUserWordOptional {
  correct: number;
  incorrect: number;
  rowCorrect: number;
}

interface IUserWord {
  difficulty?: string;
  optional?: IUserWordOptional;
}

export interface IGroup {
  readonly num: number;
  readonly abbr: string;
  readonly color: string;
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
  funcAudio?: (audioList: HTMLAudioElement[]) => void;
  funcRender?: () => void;
}

export interface IPropGroupItem {
  propsGroup: IGroup;
  groupActive: number;
  onChangeGroupFunc: (num: number) => void;
}
