import { useEffect, useState } from "react";
import { BookOpen, Plus, X, IndianRupee, Clock, Tag, Edit3, Trash2, Search, Layout } from "lucide-react";
import AddEditCourse from "./AddEditCourse";

const API_URL = "http://localhost:5000/api/courses";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) setCourses(data.courses || []);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleEdit = (course) => {
    setEditData(course);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchCourses();
    } catch (err) { alert("Delete failed"); }
  };

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">

      {/* --- Dashboard Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Manage Courses</h1>
          <p className="text-slate-500 font-medium">Create and organize your academic curriculum</p>
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add New Course
          </button>
        ) : (
          <button
            onClick={() => { setShowForm(false); setEditData(null); }}
            className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-2xl font-bold transition-all"
          >
            <X size={20} /> Close Editor
          </button>
        )}
      </div>

      {/* --- ADD/EDIT FORM (Slide Down) --- */}
      {showForm && (
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <AddEditCourse
            onCoursesChange={() => { fetchCourses(); setShowForm(false); }}
            editData={editData}
            clearEdit={() => { setEditData(null); setShowForm(false); }}
          />
        </div>
      )}

      {/* --- SEARCH & FILTER BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        {/* Search Side */}
        <div className="relative w-full md:w-96 flex items-center">
          {/* Icon Wrapper for Perfect Centering */}
          <div className="absolute left-3.5 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={18} />
          </div>

          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/5 transition-all text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Stats Side */}
        <div className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.15em]">
            Total: {filteredCourses.length} Courses
          </span>
        </div>
      </div>

      {/* --- COURSES GRID (LectureList Style) --- */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-5 pb-0 flex justify-between items-start">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  <Tag size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {course.category || "General"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-800 font-black text-sm">
                  <IndianRupee size={14} /> {course.price}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                  {course.description || "No description provided."}
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                    <Clock size={14} className="text-blue-500" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-600 font-bold text-[10px] uppercase">Active</span>
                  </div>
                </div>
              </div>

              {/* Card Actions (Same as LectureList) */}
              <div className="px-5 py-4 bg-slate-50 flex gap-3">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                >
                  <Edit3 size={14} /> Edit
                </button>
                <button
                  onClick={() => deleteCourse(course._id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-50 hover:border-rose-200 transition-all shadow-sm"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCourses.length === 0 && (
        <div className="col-span-full py-20 bg-white rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center">
          <BookOpen className="text-slate-200 mb-4" size={48} />
          <p className="text-slate-500 font-medium">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;