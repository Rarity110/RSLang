export interface AudioChallengeOption {
  key: string;
  wordTranslate: string;
  result: boolean;
}

export interface AudioChallengeWord {
  id: string;
  word: string;
  image: string;
  audio: string;
  transcription: string;
  wordTranslate: string;
  options: AudioChallengeOption[];
  isComplete: boolean;
  result: boolean;
}

export interface AudioChallengeProgress {
  current: number;
  total: number;
}
