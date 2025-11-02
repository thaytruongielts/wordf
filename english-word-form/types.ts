
export interface WordForms {
  base: string;
  noun?: string | string[];
  verb?: string | string[];
  adjective?: string | string[];
  adverb?: string | string[];
}

export type WordFormType = 'noun' | 'verb' | 'adjective' | 'adverb';

export interface Question {
  word: WordForms;
  formToGuess: WordFormType;
  prompt: string;
}

export interface QuizResult {
  score: number;
  total: number;
  questions: Question[];
  userAnswers: string[];
  correctAnswers: (string | string[] | undefined)[];
}
