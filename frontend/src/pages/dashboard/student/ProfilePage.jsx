// import React, { useState } from "react";
// import { User, Mail, Shield, BookOpen, Camera, Key, Save, CheckCircle } from "lucide-react";
// import axios from "axios";

// /**
//  * @desc Student Profile page with Password Update functionality
//  */
// const ProfilePage = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
  
//   // State for Password Update
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: ""
//   });
  
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);

//   /**
//    * @desc Handle Password Change
//    */
//   const handleUpdatePassword = async (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       return setMessage({ type: "error", text: "New passwords do not match!" });
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       // Hum wahi updateStudent wala route use karenge jo aapke backend mein hai
//       // Lekin password change ke liye backend mein logic hona zaroori hai
//       const response = await axios.put(`http://localhost:5000/api/students/${user._id}`, 
//         { password: passwordData.newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage({ type: "success", text: "Password updated successfully!" });
//       setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (error) {
//       setMessage({ type: "error", text: "Failed to update password." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="animate-in fade-in slide-in-from-top-4 duration-500">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
//         <p className="text-slate-500 text-sm italic">View your details and manage account security.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column: Info Card */}
//         <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center h-fit">
//           <div className="relative mb-4">
//             <div className="w-24 h-24 bg-sky-100 border-4 border-sky-500 text-sky-600 rounded-3xl flex items-center justify-center text-4xl font-black shadow-lg">
//               {user?.name?.charAt(0)}
//             </div>
//             <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-slate-100 text-sky-600">
//               <Camera size={16} />
//             </div>
//           </div>
//           <h3 className="text-xl font-bold text-slate-800">{user?.name}</h3>
//           <p className="text-sky-600 text-xs font-black uppercase tracking-widest mt-1">Student</p>
          
//           <div className="w-full mt-8 pt-6 border-t border-slate-50 space-y-5 text-left">
//              <InfoRow icon={<Mail size={16}/>} label="Email Address" value={user?.email} />
//              <InfoRow icon={<Shield size={16}/>} label="Account Status" value={user?.isActive ? "Active" : "Inactive"} />
//              <InfoRow icon={<BookOpen size={16}/>} label="Course" value="Full Stack Development" />
//           </div>
//         </div>

//         {/* Right Column: Password Update Form */}
//         <div className="lg:col-span-2">
//           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
//             <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
//               <Key size={18} className="text-sky-500" /> Change Password
//             </h4>

//             {message.text && (
//               <div className={`mb-6 p-4 rounded-2xl flex items-center gap-2 text-xs font-bold ${
//                 message.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-500 border border-red-100"
//               }`}>
//                 {message.type === "success" ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
//                 {message.text}
//               </div>
//             )}

//             <form onSubmit={handleUpdatePassword} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">New Password</label>
//                   <input 
//                     type="password"
//                     required
//                     className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
//                     placeholder="Enter new password"
//                     value={passwordData.newPassword}
//                     onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Confirm Password</label>
//                   <input 
//                     type="password"
//                     required
//                     className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
//                     placeholder="Confirm new password"
//                     value={passwordData.confirmPassword}
//                     onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <button 
//                   type="submit"
//                   disabled={loading}
//                   className="flex items-center gap-2 bg-sky-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-700 shadow-lg shadow-sky-100 transition-all disabled:opacity-50"
//                 >
//                   <Save size={16} />
//                   {loading ? "Updating..." : "Save New Password"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InfoRow = ({ icon, label, value }) => (
//   <div className="flex items-center gap-3">
//     <div className="text-slate-400 bg-slate-50 p-2 rounded-xl">{icon}</div>
//     <div>
//       <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1 tracking-tighter">{label}</p>
//       <p className="text-sm font-bold text-slate-700">{value}</p>
//     </div>
//   </div>
// );

// export default ProfilePage;


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