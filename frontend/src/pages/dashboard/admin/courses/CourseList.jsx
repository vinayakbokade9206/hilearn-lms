import { useEffect, useState } from "react";
import AddEditCourse from "./AddEditCourse";

const API_URL = "http://localhost:5000/api/courses";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="p-8 bg-[#F0F7FF] min-h-screen">
      {/* --- Dashboard Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-xl shadow-blue-100/50 border border-white">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Course Management</h1>
          <p className="text-blue-500 font-medium mt-1">Manage and organize your learning curriculum</p>
        </div>
        
        <button
          onClick={() => {
            setShowForm(!showForm);
            if(showForm) setEditData(null);
          }}
          className={`mt-4 md:mt-0 px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 ${
            showForm ? "bg-slate-800 text-white" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
          }`}
        >
          {showForm ? "✕ Close Editor" : "＋ Add New Course"}
        </button>
      </div>

      {/* --- ADD/EDIT FORM (Slide Down Animation) --- */}
      {showForm && (
        <div className="mb-12 animate-in fade-in slide-in-from-top-10 duration-500">
          <AddEditCourse
            onCoursesChange={() => { fetchCourses(); setShowForm(false); }}
            editData={editData}
            clearEdit={() => { setEditData(null); setShowForm(false); }}
          />
        </div>
      )}

      {/* --- COURSES GRID --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
        <h2 className="text-xl font-bold text-slate-700">Explore Active Courses</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="group bg-white rounded-[2.5rem] p-7 shadow-xl shadow-slate-200/60 border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-blue-50 text-blue-600 text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-100">
                  {course.category || "General"}
                </span>
                <div className="text-2xl font-black text-slate-800 tracking-tighter">₹{course.price}</div>
              </div>
              
              <h3 className="text-xl font-extrabold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
                {course.description}
              </p>
              
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-lg">⏱</span>
                    <span className="text-slate-600 font-bold text-xs">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-600 font-black text-[10px] uppercase">Live</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleEdit(course)}
                  className="flex-1 bg-white border-2 border-slate-100 text-slate-700 hover:border-blue-600 hover:text-blue-600 py-3 rounded-2xl font-bold text-sm transition-all"
                >
                  Edit Details
                </button>
                <button 
                  onClick={() => deleteCourse(course._id)}
                  className="px-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-2xl font-bold text-sm transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;