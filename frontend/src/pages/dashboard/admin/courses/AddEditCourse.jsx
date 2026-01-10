// import { useEffect, useState } from "react";

// const API_URL = "http://localhost:5000/api/courses";

// const AddEditCourse = ({ onCoursesChange, editData, clearEdit }) => {
//   const [form, setForm] = useState({ title: "", description: "", price: "", duration: "", category: "General" });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (editData) {
//       setForm({
//         title: editData.title || "",
//         description: editData.description || "",
//         price: editData.price || "",
//         duration: editData.duration || "",
//         category: editData.category || "General",
//       });
//     } else {
//       setForm({ title: "", description: "", price: "", duration: "", category: "General" });
//     }
//   }, [editData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const url = editData ? `${API_URL}/${editData._id}` : API_URL;
//       const res = await fetch(url, {
//         method: editData ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (data.success) {
//         if (onCoursesChange) await onCoursesChange();
//       }
//     } catch (err) { alert("Network Error"); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="bg-[#121826] rounded-[2.5rem] p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
//       {/* Decorative Glow */}
//       <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[100px] rounded-full"></div>
      
//       <div className="flex justify-between items-center mb-8 relative z-10">
//         <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500 text-xl font-bold italic">
//                 {editData ? "!" : "+"}
//             </div>
//             <h2 className="text-2xl font-black text-white">
//                 {editData ? "Edit This Course" : "Create New Course"}
//             </h2>
//         </div>
//         {editData && (
//           <button onClick={clearEdit} className="text-sm font-bold text-slate-400 hover:text-white transition underline underline-offset-4">
//             Discard Changes
//           </button>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
//         <div className="space-y-2">
//             <label className="text-[10px] uppercase font-black text-slate-500 ml-2 tracking-widest">Title</label>
//             <input 
//             name="title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} 
//             placeholder="e.g. Full Stack Bootcamp" required 
//             className="w-full bg-[#1c2436] border border-slate-700/50 text-white p-4 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-600" 
//             />
//         </div>
        
//         <div className="space-y-2">
//             <label className="text-[10px] uppercase font-black text-slate-500 ml-2 tracking-widest">Price (INR)</label>
//             <input 
//             name="price" value={form.price} onChange={(e)=>setForm({...form, price: e.target.value})} 
//             placeholder="e.g. 4999" required 
//             className="w-full bg-[#1c2436] border border-slate-700/50 text-white p-4 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-600" 
//             />
//         </div>

//         <div className="space-y-2">
//             <label className="text-[10px] uppercase font-black text-slate-500 ml-2 tracking-widest">Duration</label>
//             <input 
//             name="duration" value={form.duration} onChange={(e)=>setForm({...form, duration: e.target.value})} 
//             placeholder="e.g. 3 Months" required 
//             className="w-full bg-[#1c2436] border border-slate-700/50 text-white p-4 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-600" 
//             />
//         </div>

//         <div className="space-y-2">
//             <label className="text-[10px] uppercase font-black text-slate-500 ml-2 tracking-widest">Category</label>
//             <input 
//             name="category" value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} 
//             placeholder="e.g. Programming" 
//             className="w-full bg-[#1c2436] border border-slate-700/50 text-white p-4 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-600" 
//             />
//         </div>

//         <div className="md:col-span-2 space-y-2">
//             <label className="text-[10px] uppercase font-black text-slate-500 ml-2 tracking-widest">Description</label>
//             <textarea 
//             name="description" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} 
//             placeholder="What will students learn in this course?" 
//             className="w-full bg-[#1c2436] border border-slate-700/50 text-white p-4 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all h-32 resize-none placeholder:text-slate-600" 
//             />
//         </div>

//         <button 
//           type="submit" disabled={loading}
//           className="md:col-span-2 bg-orange-500 hover:bg-orange-600 text-black font-black py-4 rounded-2xl transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-xl shadow-orange-500/20 mt-2"
//         >
//           {loading ? "SAVING TO DATABASE..." : editData ? "CONFIRM & UPDATE COURSE" : "PUBLISH COURSE NOW"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddEditCourse;

import { useEffect, useState } from "react";
import { BookOpen, Clock, Tag, IndianRupee, FileText, XCircle, Send } from "lucide-react";

const API_URL = "http://localhost:5000/api/courses";

const AddEditCourse = ({ onCoursesChange, editData, clearEdit }) => {
  const [form, setForm] = useState({ title: "", description: "", price: "", duration: "", category: "General" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        price: editData.price || "",
        duration: editData.duration || "",
        category: editData.category || "General",
      });
    } else {
      setForm({ title: "", description: "", price: "", duration: "", category: "General" });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editData ? `${API_URL}/${editData._id}` : API_URL;
      const res = await fetch(url, {
        method: editData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        if (onCoursesChange) await onCoursesChange();
        if(!editData) setForm({ title: "", description: "", price: "", duration: "", category: "General" });
      }
    } catch (err) { alert("Network Error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl border border-slate-100 relative">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
                {editData ? "Update Course" : "Add New Course"}
            </h2>
            <p className="text-sm text-slate-500 font-medium">Fill in the details to publish your course</p>
          </div>
        </div>
        
        {editData && (
          <button 
            onClick={clearEdit} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition"
          >
            <XCircle size={18} />
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
        {/* Title */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <BookOpen size={14}/> Course Title
            </label>
            <input 
              name="title" value={form.title} 
              onChange={(e)=>setForm({...form, title: e.target.value})} 
              placeholder="e.g. Master React in 30 Days" required 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400" 
            />
        </div>
        
        {/* Price */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <IndianRupee size={14}/> Price (INR)
            </label>
            <input 
              name="price" value={form.price} 
              onChange={(e)=>setForm({...form, price: e.target.value})} 
              placeholder="999" required 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
            />
        </div>

        {/* Duration */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <Clock size={14}/> Duration
            </label>
            <input 
              name="duration" value={form.duration} 
              onChange={(e)=>setForm({...form, duration: e.target.value})} 
              placeholder="12 Weeks" required 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
            />
        </div>

        {/* Category */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <Tag size={14}/> Category
            </label>
            <input 
              name="category" value={form.category} 
              onChange={(e)=>setForm({...form, category: e.target.value})} 
              placeholder="Web Development" 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
            />
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <FileText size={14}/> Course Description
            </label>
            <textarea 
              name="description" value={form.description} 
              onChange={(e)=>setForm({...form, description: e.target.value})} 
              placeholder="Briefly explain what this course covers..." 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all h-32 resize-none" 
            />
        </div>

        <button 
          type="submit" disabled={loading}
          className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 active:scale-95 disabled:opacity-70"
        >
          {loading ? (
            <span className="animate-pulse">Processing...</span>
          ) : (
            <>
              {editData ? "Update Course Details" : "Publish Course"}
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddEditCourse;