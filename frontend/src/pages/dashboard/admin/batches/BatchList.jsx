import { useEffect, useState } from "react";
import {
  getBatches,
  addBatch,
  deleteBatch,
  toggleBatchStatus,
  updateBatch,
  getCourses,
} from "../../../../services/adminService";

const BatchList = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const [editBatch, setEditBatch] = useState(null);

  const loadBatches = async () => {
    const res = await getBatches();
    setBatches(res.data.data);
  };

  const loadCourses = async () => {
    const res = await getCourses();
    setCourses(res.data.courses);
  };

  useEffect(() => {
    loadBatches();
    loadCourses();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addBatch({ name, course });
    setName("");
    setCourse("");
    loadBatches();
  };

  const handleUpdate = async () => {
    await updateBatch(editBatch._id, {
      name: editBatch.name,
      course: editBatch.course,
    });
    setEditBatch(null);
    loadBatches();
  };
 
  const handleToggleStatus = async (batches) => {
    if (!batches || !batches._id) {
      console.error("Invalid batch", batches);
      return;
    }

    //  Real-life toggle effect (optimistic UI)
    setBatches((prev) =>
      prev.map((b) =>
        b._id === batches._id
          ? { ...b, isActive: !b.isActive }
          : b
      )
    );

    try {
      await toggleBatchStatus(batches._id);
    } catch (error) {
      alert("Failed to update batch status");

      // rollback if API fails
      setBatches((prev) =>
        prev.map((b) =>
          b._id === batches._id ? batches : b
        )
      );
    }
  };



  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Manage Batches
      </h1>

      {/* ADD BATCH */}
      <form onSubmit={handleAdd} className="flex gap-4 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Batch Name"
          className="border p-3 rounded w-64"
          required
        />

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-3 rounded w-64"
          required
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-6 rounded">
          Add Batch
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Batch</th>
              <th>Course</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {batches.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3">{b.name}</td>
                <td>{b.course?.title}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${b.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {b.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="flex gap-3 justify-center py-3">
                  <button
                    onClick={() => setEditBatch(b)}
                    className="text-yellow-600"
                  >
                    Edit
                  </button>

                  {/* <button
                    onClick={() =>
                      toggleBatchStatus(b._id).then(loadBatches)
                    }
                    className="text-blue-600"
                  >
                    Toggle
                  </button> */}
                  <td className="text-center">

                    <button
                      type="button"
                      onClick={() => {
                        console.log("Clicked batch:", b);
                        handleToggleStatus(b);
                      }}
                      // Added 'px-1' for inner spacing and 'justify-start/end'
                      className={`relative inline-flex h-7 w-14 items-center px-1 rounded-full 
                      transition-all duration-300 focus:outline-none
                      ${b.isActive
                          ? "bg-blue-600 justify-end shadow-[0_0_12px_rgba(37,99,235,0.6)]"
                          : "bg-gray-300 justify-start"
                        }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 rounded-full bg-white shadow-md
                        transition-all duration-300`}
                      />
                    </button>
                  </td>

                  <button
                    onClick={() =>
                      deleteBatch(b._id).then(loadBatches)
                    }
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {batches.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No batches found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 EDIT MODAL */}
      {editBatch && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-lg font-bold mb-4">Edit Batch</h2>

            <input
              value={editBatch.name}
              onChange={(e) =>
                setEditBatch({ ...editBatch, name: e.target.value })
              }
              className="border p-3 rounded w-full mb-3"
            />

            <select
              value={editBatch.course}
              onChange={(e) =>
                setEditBatch({
                  ...editBatch,
                  course: e.target.value,
                })
              }
              className="border p-3 rounded w-full mb-4"
            >
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditBatch(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchList;
