import React from "react";
import { Trophy, Medal, Star } from "lucide-react";

const LeaderboardPage = () => {
  const topStudents = [
    { rank: 1, name: "Patel Harsh", points: 2450, avatar: "P" },
    { rank: 2, name: "Rahul Sharma", points: 2300, avatar: "R" },
    { rank: 3, name: "Anjali Gupta", points: 2150, avatar: "A" },
    { rank: 4, name: "Smit Shah", points: 1900, avatar: "S" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center py-6">
        <Trophy className="text-amber-500 mx-auto mb-4" size={48} />
        <h2 className="text-3xl font-black text-slate-800">Global Leaderboard</h2>
        <p className="text-slate-500 text-sm mt-1">See where you stand among your peers.</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        {topStudents.map((s, index) => (
          <div key={index} className={`flex items-center justify-between p-6 ${index !== topStudents.length - 1 ? 'border-b border-slate-50' : ''} ${s.rank === 1 ? 'bg-amber-50/30' : ''}`}>
            <div className="flex items-center gap-6">
              <span className={`w-8 text-lg font-black ${s.rank === 1 ? 'text-amber-500' : 'text-slate-400'}`}>
                #{s.rank}
              </span>
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold">
                {s.avatar}
              </div>
              <div>
                <p className="font-bold text-slate-800">{s.name}</p>
                <p className="text-xs text-slate-400 font-medium">Batch B1</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-800">{s.points}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase">Points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;