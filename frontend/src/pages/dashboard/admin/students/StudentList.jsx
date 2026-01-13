// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//     getStudents,
//     addStudent,
//     updateStudent,
//     deleteStudent,
//     toggleStudentStatus,
// } from "../../../../services/adminService";

// const StudentList = () => {
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//     });

//     const [editId, setEditId] = useState(null);

    /* ================= FETCH STUDENTS ================= */
    // const fetchStudents = async () => {
    //     try {
    //         const res = await getStudents();
    //         setStudents(res.data);
    //     } catch (err) {
    //         console.error(err);
    //         alert("Failed to load students");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchStudents();
    // }, []);

    /* ================= FORM HANDLERS ================= */
    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         if (editId) {
    //             await updateStudent(editId, formData);
    //         } else {
    //             await addStudent(formData);
    //         }

    //         setFormData({ name: "", email: "", mobile: "" });
    //         setEditId(null);
    //         fetchStudents();
    //     } catch (err) {
    //         alert(err.response?.data?.message || "Action failed");
    //     }
    // };

    // const handleEdit = (student) => {
    //     setEditId(student._id);
    //     setFormData({
    //         name: student.name,
    //         email: student.email,
    //         mobile: student.mobile,
    //     });
    // };

    // const handleDelete = async (id) => {
    //     if (!window.confirm("Are you sure you want to delete this student?")) return;
    //     await deleteStudent(id);
    //     fetchStudents();
    // };
//     const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this student?")) return;

//   try {
//     await deleteStudent(id);
//     fetchStudents(); // refresh list
//   } catch (err) {
//     alert("Failed to delete student");
//   }
// };

//     const handleStatusToggle = async (student) => {
//   try {
    // UI update immediately (optimistic update)
//     setStudents((prev) =>
//       prev.map((s) =>
//         s._id === student._id
//           ? { ...s, isActive: !s.isActive }
//           : s
//       )
//     );

//     // DB update
//     await toggleStudentStatus(student._id);
//   } catch (err) {
//     alert("Failed to update status");

//     // rollback if API fails
//     setStudents((prev) =>
//       prev.map((s) =>
//         s._id === student._id ? student : s
//       )
//     );
//   }
// };

//     /* ================= UI ================= */
//     return (
//         <div className="p-6 ">
//             <div className="flex justify-between">
//                 <h1 className="text-2xl font-bold mb-6 text-blue-700">
//                     Manage Students
//                 </h1>
//                 <button onClick={() => navigate("/admin/students/add")} className="text-xl px-4 py-2 rounded-2xl font-bold mb-6 text-white bg-blue-700 hover:bg-blue-800">ADD</button>
//             </div>

//             {/* ================= ADD / EDIT FORM ================= */}
//             {/* <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Student Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="border p-3 rounded"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           className="border p-3 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="mobile"
//           placeholder="Mobile Number"
//           value={formData.mobile}
//           onChange={handleChange}
//           className="border p-3 rounded"
//         />

//         <button
//           type="submit"
//           className="md:col-span-3 bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
//         >
//           {editId ? "Update Student" : "Add Student"}
//         </button>
//       </form> */}

//             {/* ================= STUDENT TABLE ================= */}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <div className="overflow-x-auto bg-white rounded-xl shadow">
//                     <table className="w-full text-sm">
//                         <thead className="bg-blue-600 text-white">
//                             <tr>
//                                 <th className="p-3 text-left">Name</th>
//                                 <th className="text-left">Email</th>
//                                 {/* <th className="text-left">Mobile</th> */}
//                                 <th className="text-left">Status</th>
//                                 <th className="text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {students.map((student) => (
//                                 <tr key={student._id} className="border-t hover:bg-gray-50">
//                                     <td className="p-3">{student.name}</td>
//                                     <td>{student.email}</td>
//                                     {/* <td>{student.mobile}</td> */}
//                                     <td>
//                                         <span
//                                             className={`px-3 py-1 rounded-full text-xs font-semibold
//                         ${student.isActive
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-red-100 text-red-700"
//                                                 }`}
//                                         >
//                                             {student.isActive ? "Active" : "Inactive"}
//                                         </span>
//                                     </td>
//                                     <td className="flex gap-3 justify-center py-3">
//                                         <button
//                                             onClick={() => navigate(`/admin/students/edit/${student._id}`)}
//                                             className="text-blue-600 font-semibold"
//                                         >
//                                             Edit
//                                         </button>

                                        
//                                         <button
//                                             type="button"
//                                             onClick={() => handleStatusToggle(student)}
//                                             className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${
//                                             student.isActive ? "bg-green-500" : "bg-red-500"
//                                              }`}
//                                         >
//                                             <span
//                                                 className="absolute h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ease-in-out"
//                                                 style={{
//                                                 // Agar active hai toh left se 24px (6 units) dur, nahi toh 4px dur
//                                                 left: student.isActive ? "24px" : "4px",
//                                                 }}
//                                             />
//                                         </button>

//                                         <button
//                                             onClick={() => handleDelete(student._id)}
//                                             className="text-red-600 font-semibold"
//                                         >
//                                             Delete
//                                         </button>
//                                         <button
//                     onClick={() =>
//                       navigate(`/admin/students/${student._id}`)
//                     }
//                     className="text-blue-600 font-medium hover:underline"
//                   >
//                     View
//                   </button>
//                                     </td>
//                                 </tr>
//                             ))}

//                             {students.length === 0 && (
//                                 <tr>
//                                     <td colSpan="5" className="text-center p-6 text-gray-500">
//                                         No students found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StudentList;



import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    toggleStudentStatus,
} from "../../../../services/adminService";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    const [editId, setEditId] = useState(null);

    /* ================= FETCH STUDENTS ================= */
    const fetchStudents = async () => {
        try {
            const res = await getStudents();
            setStudents(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    /* ================= FORM HANDLERS ================= */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await updateStudent(editId, formData);
            } else {
                await addStudent(formData);
            }

            setFormData({ name: "", email: "", mobile: "" });
            setEditId(null);
            fetchStudents();
        } catch (err) {
            alert(err.response?.data?.message || "Action failed");
        }
    };

    const handleEdit = (student) => {
        setEditId(student._id);
        setFormData({
            name: student.name,
            email: student.email,
            mobile: student.mobile,
        });
    };

    // const handleDelete = async (id) => {
    //     if (!window.confirm("Are you sure you want to delete this student?")) return;
    //     await deleteStudent(id);
    //     fetchStudents();
    // };
    const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this student?")) return;

  try {
    await deleteStudent(id);
    fetchStudents(); // refresh list
  } catch (err) {
    alert("Failed to delete student");
  }
};

    const handleStatusToggle = async (student) => {
  try {
    // UI update immediately (optimistic update)
    setStudents((prev) =>
      prev.map((s) =>
        s._id === student._id
          ? { ...s, isActive: !s.isActive }
          : s
      )
    );

    // DB update
    await toggleStudentStatus(student._id);
  } catch (err) {
    alert("Failed to update status");

    // rollback if API fails
    setStudents((prev) =>
      prev.map((s) =>
        s._id === student._id ? student : s
      )
    );
  }
};

    /* ================= UI ================= */
    return (
        <div className="p-6 ">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6 text-blue-700">
                    Manage Students
                </h1>
                <button onClick={() => navigate("/admin/students/add")} className="text-xl px-4 py-2 rounded-2xl font-bold mb-6 text-white bg-blue-700 hover:bg-blue-800">ADD</button>
            </div>

            {/* ================= ADD / EDIT FORM ================= */}
            {/* <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form> */}

            {/* ================= STUDENT TABLE ================= */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="text-left">Email</th>
                                {/* <th className="text-left">Mobile</th> */}
                                <th className="text-left">Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{student.name}</td>
                                    <td>{student.email}</td>
                                    {/* <td>{student.mobile}</td> */}
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${student.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {student.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="flex gap-3 justify-center py-3">
                                        <button
                                            onClick={() => navigate(`/admin/students/edit/${student._id}`)}
                                            className="text-blue-600 font-semibold"
                                        >
                                            Edit
                                        </button>

                                        
                                        <button
                                            type="button"
                                            onClick={() => handleStatusToggle(student)}
                                            className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${
                                            student.isActive ? "bg-green-500" : "bg-red-500"
                                             }`}
                                        >
                                            <span
                                                className="absolute h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ease-in-out"
                                                style={{
                                                // Agar active hai toh left se 24px (6 units) dur, nahi toh 4px dur
                                                left: student.isActive ? "24px" : "4px",
                                                }}
                                            />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(student._id)}
                                            className="text-red-600 font-semibold"
                                        >
                                            Delete
                                        </button>
                                        <button
                    onClick={() =>
                      navigate(`/admin/students/${student._id}`)
                    }
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View
                  </button>
                                    </td>
                                </tr>
                            ))}

                            {students.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 text-gray-500">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudentList;