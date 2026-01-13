import { useEffect, useState } from "react";
import { Clock, Search, Filter, Plus, X, Play, FolderOpen } from "lucide-react";
import AddEditLecture from "./AddEditLecture";
import AddMaterialModal from "./AddMaterialModal";

const API = "http://localhost:5000/api/lectures";

const LectureList = () => {
  const [lectures, setLectures] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // material modal
  const [selectedLecture, setSelectedLecture] = useState(null);

  const fetchLectures = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (data.success) setLectures(data.lectures);
    } catch (err) {
      console.error("Error fetching lectures:", err);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const deleteLecture = async (id) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchLectures();
    }
  };

  const handleEdit = (lecture) => {
    setEditData(lecture);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredLectures = lectures.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterValue === "" ||
      l.course?._id === filterValue ||
      l.course?.category?.toLowerCase() === filterValue.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const uniqueCourses = Array.from(new Set(lectures.map((l) => l.course?._id)))
    .map((id) => lectures.find((l) => l.course?._id === id)?.course)
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 bg-[#f8faff] min-h-screen font-sans text-slate-800">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-blue-100 pb-6">
        <div>
          <h1 className="text-2xl font-black text-blue-900 tracking-tight">Lecture Management</h1>
          <p className="text-blue-500/70 text-sm font-medium">
            Manage your course curriculum and resources
          </p>
        </div>

        <button
          onClick={() =>
            isFormOpen ? (setIsFormOpen(false), setEditData(null)) : setIsFormOpen(true)
          }
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 ${
            isFormOpen
              ? "bg-white text-slate-500 border border-slate-200"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
          }`}
        >
          {isFormOpen ? (
            <>
              <X size={18} /> Close Panel
            </>
          ) : (
            <>
              <Plus size={18} /> Add New Lecture
            </>
          )}
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-10">
          <AddEditLecture
            refreshLectures={fetchLectures}
            editData={editData}
            clearEdit={() => {
              setIsFormOpen(false);
              setEditData(null);
            }}
          />
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search lectures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-4 py-3 bg-white border border-blue-100 rounded-xl"
          />
        </div>

        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="bg-white border border-blue-100 px-4 rounded-xl"
        >
          <option value="">All Disciplines</option>
          {uniqueCourses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLectures.map((l) => (
          <div
            key={l._id}
            className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6 flex flex-col"
          >
            <div className="flex justify-between mb-3">
              <span className="text-xs font-bold text-blue-600">
                {l.course?.category || "General"}
              </span>
              <span className="text-xs text-slate-500">
                <Clock size={12} className="inline" /> {l.duration}m
              </span>
            </div>

            <h3 className="font-bold mb-2">{l.title}</h3>

            <p className="text-xs text-slate-500 mb-4 flex-grow">
              {l.description || "No summary provided"}
            </p>

            {l.videoUrl && (
              <button
                onClick={() => window.open(l.videoUrl, "_blank")}
                className="mb-2 bg-blue-50 text-blue-700 py-2 rounded"
              >
                <Play size={14} className="inline" /> Watch
              </button>
            )}

            <button
              onClick={() => setSelectedLecture(l)}
              className="mb-2 bg-indigo-50 text-indigo-700 py-2 rounded"
            >
              <FolderOpen size={14} className="inline" /> Manage Material
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(l)}
                className="flex-1 bg-indigo-100 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteLecture(l._id)}
                className="flex-1 bg-rose-100 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Material Modal */}
      {selectedLecture && (
        <AddMaterialModal
          lecture={selectedLecture}
          onClose={() => setSelectedLecture(null)}
        />
      )}
    </div>
  );
};

export default LectureList;
