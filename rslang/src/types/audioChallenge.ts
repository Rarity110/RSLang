export interface AudioChallengeOption {
  key: string;
  wordTranslate: string;
  result: boolean;
}

export interface AudioChallengeWord {
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
  options: AudioChallengeOption[];
  isComplete: boolean;
  result: boolean;
}

export interface AudioChallengeWordResult {
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
  options?: AudioChallengeOption[];
  isComplete?: boolean;
  result?: boolean;
}

export interface AudioChallengeProgress {
  current: number;
  total: number;
}
