import { useState } from "react";

const API = "http://localhost:5000/api/materials";

const AddEditMaterial = ({ lectureId, refresh }) => {
  const [form, setForm] = useState({
    title: "",
    type: "notes",
    fileUrl: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, lecture: lectureId }),
    });

    const data = await res.json();

    if (data.success) {
      refresh();
      setForm({ title: "", type: "notes", fileUrl: "", description: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 p-4 rounded mb-4">
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="input"
        required
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="input"
      >
        <option value="notes">Notes</option>
        <option value="quiz">Quiz</option>
        <option value="interview">Interview Prep</option>
      </select>

      <input
        placeholder="File URL"
        value={form.fileUrl}
        onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
        className="input"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="input"
      />

      <button className="bg-orange-500 px-4 py-2 rounded mt-2">
        Add Material
      </button>
    </form>
  );
};

export default AddEditMaterial;
