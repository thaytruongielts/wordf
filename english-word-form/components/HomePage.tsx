
import React from 'react';

interface HomePageProps {
  totalPages: number;
  onStartQuiz: (page: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ totalPages, onStartQuiz }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-semibold text-center mb-2 text-sky-300">Choose a Page to Start</h2>
      <p className="text-slate-400 text-center mb-6">There are 10 words on each page.</p>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3 md:gap-4">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onStartQuiz(page)}
            className="aspect-square flex items-center justify-center bg-slate-700 rounded-lg text-lg font-bold text-slate-200 hover:bg-sky-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
