// import { useEffect, useState } from "react";
// import { BookOpen, Clock, Tag, IndianRupee, FileText, XCircle, Send, Layers } from "lucide-react";

// const API_URL = "http://localhost:5000/api/courses";

// const AddEditCourse = ({ onCoursesChange, editData, clearEdit }) => {
//   // Category ki default value "general" rakhi hai schema ke mutabiq
//   const [form, setForm] = useState({ title: "", description: "", price: "", duration: "", category: "general" });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (editData) {
//       setForm({
//         title: editData.title || "",
//         description: editData.description || "",
//         price: editData.price || "",
//         duration: editData.duration || "",
//         category: editData.category || "general",
//       });
//     } else {
//       setForm({ title: "", description: "", price: "", duration: "", category: "general" });
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
//         if(!editData) setForm({ title: "", description: "", price: "", duration: "", category: "general" });
//         if(editData) clearEdit(); // Update ke baad form close karne ke liye
//       }
//     } catch (err) { 
//       alert("Error: " + err.message); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   return (
//     <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl border border-slate-100 relative">
      
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-10">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
//             <BookOpen size={24} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-slate-800">
//                 {editData ? "Update Course" : "Add New Course"}
//             </h2>
//             <p className="text-sm text-slate-500 font-medium">Fill in the details to publish your course</p>
//           </div>
//         </div>
        
//         {editData && (
//           <button 
//             onClick={clearEdit} 
//             className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition"
//           >
//             <XCircle size={18} />
//             Cancel Edit
//           </button>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
//         {/* Title */}
//         <div className="md:col-span-2 space-y-2">
//             <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//                <BookOpen size={14}/> Course Title
//             </label>
//             <input 
//               name="title" value={form.title} 
//               onChange={(e)=>setForm({...form, title: e.target.value})} 
//               placeholder="e.g. Full Stack Web Development" required 
//               className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium" 
//             />
//         </div>
        
//         {/* Category - Modern Dropdown */}
//         <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//                <Layers size={14}/> Category
//             </label>
//             <select 
//               name="category" 
//               value={form.category} 
//               onChange={(e)=>setForm({...form, category: e.target.value})} 
//               required
//               className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer font-medium"
//             >
//               <option value="general">General</option>
//               <option value="frontend">Frontend Development</option>
//               <option value="backend">Backend Development</option>
//               <option value="database">Database Systems</option>
//               <option value="fullstack">Fullstack Development</option>
//             </select>
//         </div>

//         {/* Price */}
//         <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//                <IndianRupee size={14}/> Price (INR)
//             </label>
//             <input 
//               type="number"
//               name="price" value={form.price} 
//               onChange={(e)=>setForm({...form, price: e.target.value})} 
//               placeholder="999" required 
//               className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium" 
//             />
//         </div>

//         {/* Duration */}
//         <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//                <Clock size={14}/> Duration
//             </label>
//             <input 
//               name="duration" value={form.duration} 
//               onChange={(e)=>setForm({...form, duration: e.target.value})} 
//               placeholder="e.g. 3 Months" required 
//               className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium" 
//             />
//         </div>

//         {/* Placeholder for future Level field if needed, or keeping spacing clean */}
//         <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//                <Tag size={14}/> Access Level
//             </label>
//             <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl outline-none font-medium cursor-not-allowed opacity-60" disabled>
//               <option>Standard Access</option>
//             </select>
//         </div>

//         {/* Description */}
//         <div className="md:col-span-2 space-y-2">
//             <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
//                <FileText size={14}/> Course Description
//             </label>
//             <textarea 
//               name="description" value={form.description} 
//               onChange={(e)=>setForm({...form, description: e.target.value})} 
//               placeholder="Briefly explain what this course covers..." 
//               className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all h-32 resize-none font-medium" 
//             />
//         </div>

//         <button 
//           type="submit" disabled={loading}
//           className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 active:scale-95 disabled:opacity-70"
//         >
//           {loading ? (
//             <span className="animate-pulse">Processing...</span>
//           ) : (
//             <>
//               {editData ? "Update Course Details" : "Publish Course"}
//               <Send size={18} />
//             </>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddEditCourse;



import { useEffect, useState } from "react";
import { BookOpen, Clock, Tag, IndianRupee, FileText, XCircle, Send, Layers } from "lucide-react";

const API_URL = "http://localhost:5000/api/courses";

const AddEditCourse = ({ onCoursesChange, editData, clearEdit }) => {
  const [form, setForm] = useState({ title: "", description: "", price: "", duration: "", category: "general" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        price: editData.price || "",
        duration: editData.duration || "",
        category: editData.category || "general",
      });
    } else {
      setForm({ title: "", description: "", price: "", duration: "", category: "general" });
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
        if(!editData) setForm({ title: "", description: "", price: "", duration: "", category: "general" });
        if(editData) clearEdit(); 
      }
    } catch (err) { 
      alert("Error: " + err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-200 relative mb-8">
      
      {/* Header Section - Matches Batch Style */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2563eb]">
            {editData ? "Update Course" : "Add New Course"}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Fill in the details to publish your course</p>
        </div>
        
        {editData && (
          <button 
            onClick={clearEdit} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition"
          >
            <XCircle size={18} />
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        
        {/* Title */}
        <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <BookOpen size={14} className="text-[#2563eb]"/> Course Title
            </label>
            <input 
              name="title" value={form.title} 
              onChange={(e)=>setForm({...form, title: e.target.value})} 
              placeholder="e.g. Full Stack Web Development" required 
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-sm" 
            />
        </div>
        
        {/* Category */}
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <Layers size={14} className="text-[#2563eb]"/> Category
            </label>
            <select 
              name="category" 
              value={form.category} 
              onChange={(e)=>setForm({...form, category: e.target.value})} 
              required
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer font-medium text-sm"
            >
              <option value="general">General</option>
              <option value="frontend">Frontend Development</option>
              <option value="backend">Backend Development</option>
              <option value="database">Database Systems</option>
              <option value="fullstack">Fullstack Development</option>
            </select>
        </div>

        {/* Price */}
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <IndianRupee size={14} className="text-[#2563eb]"/> Price (INR)
            </label>
            <input 
              type="number"
              name="price" value={form.price} 
              onChange={(e)=>setForm({...form, price: e.target.value})} 
              placeholder="999" required 
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-sm" 
            />
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <Clock size={14} className="text-[#2563eb]"/> Duration
            </label>
            <input 
              name="duration" value={form.duration} 
              onChange={(e)=>setForm({...form, duration: e.target.value})} 
              placeholder="e.g. 3 Months" required 
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-sm" 
            />
        </div>

        {/* Access Level */}
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <Tag size={14} className="text-[#2563eb]"/> Access Level
            </label>
            <select className="w-full bg-slate-50 border border-slate-300 text-slate-800 p-3 rounded-lg outline-none font-medium cursor-not-allowed opacity-60 text-sm" disabled>
              <option>Standard Access</option>
            </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <FileText size={14} className="text-[#2563eb]"/> Course Description
            </label>
            <textarea 
              name="description" value={form.description} 
              onChange={(e)=>setForm({...form, description: e.target.value})} 
              placeholder="Briefly explain what this course covers..." 
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 p-3 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-28 resize-none font-medium text-sm" 
            />
        </div>

        {/* Action Button */}
        <button 
          type="submit" disabled={loading}
          className="md:col-span-2 bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-3 shadow-md active:scale-[0.98] disabled:bg-blue-300 mt-2"
        >
          {loading ? (
            <span className="animate-pulse text-sm">Processing...</span>
          ) : (
            <>
              <span className="text-sm font-bold uppercase tracking-wider">
                {editData ? "Update Course Details" : "Publish Course"}
              </span>
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddEditCourse;