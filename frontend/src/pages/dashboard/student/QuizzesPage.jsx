import React, { useState } from "react";
import { HelpCircle, Clock, Award, ChevronRight } from "lucide-react";

const QuizzesPage = () => {
  // Static data for now, later fetch from Backend
  const [quizzes] = useState([
    { id: 1, title: "React Basics Quiz", questions: 10, time: "15 min", status: "Active" },
    { id: 2, title: "Tailwind CSS Pro", questions: 15, time: "20 min", status: "Active" },
    { id: 3, title: "Javascript ES6", questions: 20, time: "25 min", status: "Completed", score: "80%" },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <HelpCircle className="text-blue-600" size={28} /> My Quizzes
        </h2>
        <p className="text-slate-500 text-sm font-medium">Test your knowledge and earn badges.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all group">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${quiz.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                {quiz.status === 'Completed' ? <Award size={24} /> : <Clock size={24} />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{quiz.title}</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  {quiz.questions} Questions • {quiz.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {quiz.status === "Completed" ? (
                <div className="text-right mr-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Score</p>
                  <p className="text-lg font-black text-emerald-600">{quiz.score}</p>
                </div>
              ) : (
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight hover:bg-blue-600 transition-all flex items-center gap-2">
                  Start Quiz <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzesPage;