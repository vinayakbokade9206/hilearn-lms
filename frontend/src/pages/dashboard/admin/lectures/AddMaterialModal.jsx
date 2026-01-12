import { useState } from "react";

const API = "http://localhost:5000/api/materials/upload";

export default function AddMaterialModal({ lecture, onClose }) {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("notes");
  const [title, setTitle] = useState("");

  const uploadMaterial = async () => {
    if (!file) return alert("Select file");

    const form = new FormData();
    form.append("file", file);
    form.append("lectureId", lecture._id);
    form.append("type", type);
    form.append("title", title);

    const res = await fetch(API, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.success) {
      alert("Uploaded");
      onClose();
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="font-bold mb-3">Upload Material</h2>

        <input
          placeholder="Material title"
          className="border p-2 w-full mb-2"
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="notes">Notes</option>
          <option value="quiz">Quiz</option>
          <option value="interview">Interview</option>
        </select>

        <input
          type="file"
          className="mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="flex gap-2">
          <button
            onClick={uploadMaterial}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
