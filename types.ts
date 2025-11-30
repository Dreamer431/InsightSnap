export interface CourseCard {
  title: string;
  emoji: string;
  content: string;
  keyword: string; // Used for fetching a relevant image
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MicroCourse {
  topic: string;
  cards: CourseCard[];
  quiz: Quiz;
  mindMapImage?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}