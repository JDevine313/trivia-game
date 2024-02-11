interface Question {
  text: string;
}

export interface Quizs {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: Question;
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
  shuffledAnswers?: string[];
}
