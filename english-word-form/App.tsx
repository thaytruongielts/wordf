
import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { QuizResult } from './types';
import { WORD_LIST } from './constants/words';

type View = 'home' | 'quiz' | 'results';

const WORDS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(WORD_LIST.length / WORDS_PER_PAGE);

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  const startQuiz = useCallback((page: number) => {
    setCurrentPage(page);
    setView('quiz');
  }, []);

  const handleQuizComplete = useCallback((result: QuizResult) => {
    setLastResult(result);
    setView('results');
  }, []);

  const backToHome = useCallback(() => {
    setLastResult(null);
    setView('home');
  }, []);

  const renderView = () => {
    switch (view) {
      case 'quiz':
        return <QuizPage pageNumber={currentPage} onQuizComplete={handleQuizComplete} />;
      case 'results':
        if (lastResult) {
          return <ResultsPage result={lastResult} onBackToHome={backToHome} />;
        }
        // Fallback to home if no result
        setView('home');
        return <HomePage totalPages={TOTAL_PAGES} onStartQuiz={startQuiz} />;
      case 'home':
      default:
        return <HomePage totalPages={TOTAL_PAGES} onStartQuiz={startQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 tracking-tight">
          English Word Form Practice
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Luyện tập Word Form tiếng Anh thi vào lớp 10
        </p>
      </header>
      <main className="w-full max-w-4xl">
        {renderView()}
      </main>
      <footer className="w-full max-w-4xl mt-8 text-center text-slate-500 text-sm">
        <p>Built for students. Good luck with your exams!</p>
      </footer>
    </div>
  );
};

export default App;
