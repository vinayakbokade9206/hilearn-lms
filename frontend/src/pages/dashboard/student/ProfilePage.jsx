import React from "react";
import { User, Mail, Phone, Shield } from "lucide-react";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-black text-slate-800 mb-8">My Profile</h2>
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-50">
          <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl font-bold">{user?.name[0]}</div>
          <div><h3 className="text-xl font-bold text-slate-800">{user?.name}</h3><p className="text-blue-600 font-bold text-sm uppercase tracking-widest">{user?.role}</p></div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-4 text-slate-600 font-medium"><Mail size={18}/> {user?.email}</div>
          <div className="flex items-center gap-4 text-slate-600 font-medium"><Phone size={18}/> {user?.mobile || "Not Provided"}</div>
          <div className="flex items-center gap-4 text-slate-600 font-medium"><Shield size={18}/> Account Status: <span className="text-emerald-600">Active</span></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;