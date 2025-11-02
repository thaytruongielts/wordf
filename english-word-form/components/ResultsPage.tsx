
import React from 'react';
import { QuizResult } from '../types';

interface ResultsPageProps {
  result: QuizResult;
  onBackToHome: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onBackToHome }) => {
  const { score, total, questions, userAnswers, correctAnswers } = result;

  const getCorrectAnswerString = (answer: string | string[] | undefined): string => {
    if (Array.isArray(answer)) {
      return answer.join(' / ');
    }
    return answer || 'N/A';
  };

  const isCorrect = (userAnswer: string, correctAnswer: string | string[] | undefined): boolean => {
    const cleanedUserAnswer = userAnswer.trim().toLowerCase();
    if (Array.isArray(correctAnswer)) {
      return correctAnswer.map(a => a.toLowerCase()).includes(cleanedUserAnswer);
    }
    if (typeof correctAnswer === 'string') {
      return correctAnswer.toLowerCase() === cleanedUserAnswer;
    }
    return false;
  };

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-sky-400 mb-2">Your Score</h2>
        <p className={`text-6xl font-bold ${score / total > 0.7 ? 'text-green-400' : score / total > 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
          {score} / {total}
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          const correct = isCorrect(userAnswers[index], correctAnswers[index]);
          return (
            <div key={index} className={`p-4 rounded-lg ${correct ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
              <p className="text-slate-300 mb-2">{index + 1}. {question.prompt}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <p className={`font-semibold ${correct ? 'text-green-300' : 'text-red-300'}`}>
                  Your answer: <span className="font-normal italic">{userAnswers[index] || '(no answer)'}</span>
                </p>
                {!correct && (
                  <p className="text-yellow-300 font-semibold">
                    Correct answer: <span className="font-normal italic">{getCorrectAnswerString(correctAnswers[index])}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onBackToHome}
          className="bg-slate-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-slate-700 transition-colors duration-300 text-lg shadow-md"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
