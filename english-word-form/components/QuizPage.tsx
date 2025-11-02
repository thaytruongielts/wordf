
import React, { useState, useEffect, useMemo } from 'react';
import { Question, QuizResult, WordFormType } from '../types';
import { WORD_LIST } from '../constants/words';

interface QuizPageProps {
  pageNumber: number;
  onQuizComplete: (result: QuizResult) => void;
}

const WORDS_PER_PAGE = 10;

const QuizPage: React.FC<QuizPageProps> = ({ pageNumber, onQuizComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const wordsForPage = useMemo(() => {
    const startIndex = (pageNumber - 1) * WORDS_PER_PAGE;
    const endIndex = startIndex + WORDS_PER_PAGE;
    return WORD_LIST.slice(startIndex, endIndex);
  }, [pageNumber]);

  useEffect(() => {
    const generatedQuestions = wordsForPage.map(word => {
      const availableForms: WordFormType[] = [];
      if (word.noun) availableForms.push('noun');
      if (word.verb) availableForms.push('verb');
      if (word.adjective) availableForms.push('adjective');
      if (word.adverb) availableForms.push('adverb');
      
      const formToGuess = availableForms[Math.floor(Math.random() * availableForms.length)];
      
      const prompt = `What is the ${formToGuess.toUpperCase()} form of "${word.base}"?`;
      
      return { word, formToGuess, prompt };
    });
    setQuestions(generatedQuestions);
    setUserAnswers(new Array(generatedQuestions.length).fill(''));
  }, [wordsForPage]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    const correctAnswers = questions.map(q => q.word[q.formToGuess]);

    userAnswers.forEach((answer, index) => {
      const correctAnswer = correctAnswers[index];
      const cleanedAnswer = answer.trim().toLowerCase();
      
      if (Array.isArray(correctAnswer)) {
        if (correctAnswer.map(a => a.toLowerCase()).includes(cleanedAnswer)) {
          score++;
        }
      } else if (typeof correctAnswer === 'string') {
        if (correctAnswer.toLowerCase() === cleanedAnswer) {
          score++;
        }
      }
    });

    onQuizComplete({
      score,
      total: questions.length,
      questions,
      userAnswers,
      correctAnswers
    });
  };
  
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-sky-400">Page {pageNumber}</h2>
      {questions.map((question, index) => (
        <div key={index} className="bg-slate-800 p-5 rounded-lg shadow-lg">
          <label htmlFor={`question-${index}`} className="block text-lg text-slate-300 mb-2">
            {index + 1}. {question.prompt}
          </label>
          <input
            id={`question-${index}`}
            type="text"
            value={userAnswers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            placeholder="Type your answer here..."
          />
        </div>
      ))}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="bg-sky-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-sky-700 transition-colors duration-300 text-lg shadow-md"
        >
          Check Answers
        </button>
      </div>
    </form>
  );
};

export default QuizPage;
