// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   addStudent,
//   updateStudent,
//   getStudents,
// } from "../../../../services/adminService";

// const AddEditStudent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password:"",
//   });

//   /* ===== Load student for edit ===== */
//   useEffect(() => {
//     if (id) {
//       loadStudent();
//     }
//   }, [id]);

//   const loadStudent = async () => {
//     const res = await getStudents();
//     const student = res.data.find((s) => s._id === id);
//     if (student) {
//       setFormData({
//         name: student.name,
//         email: student.email,
//         password: student.password,
//         mobile: student.mobile,
//       });
//     }
//   };

//   /* ===== Handlers ===== */
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await updateStudent(id, formData);
//       } else {
//         await addStudent(formData);
//       }
//       navigate("/admin/students");
//     } catch (err) {
//       alert("Failed to save student");
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-blue-700">
//         {id ? "Edit Student" : "Add Student"}
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow space-y-4"
//       >
//         <input
//           name="name"
//           placeholder="Student Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//           required
//         />

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Email"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//           required
//         />

//         <input
//           name="mobile"
//           placeholder="Mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             className="flex-1 bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
//           >
//             {id ? "Update Student" : "Add Student"}
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/admin/students")}
//             className="flex-1 border py-3 rounded font-semibold"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddEditStudent;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addStudent, updateStudent, getStudents } from "../../../../services/adminService";

const AddEditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", password: "" });

  useEffect(() => {
    if (id) {
      getStudents().then(res => {
        const studentList = res.data.data || res.data;
        const student = studentList.find(s => s._id === id);
        if (student) setFormData({ name: student.name, email: student.email, mobile: student.mobile || "", password: "" });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) { await updateStudent(id, formData); } 
      else { await addStudent(formData); }
      navigate("/admin/students");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save student");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">{id ? "Edit Student" : "Add Student"}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-3 rounded" required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-3 rounded" required />
        <input name="password" type="password" placeholder={id ? "New password (optional)" : "Password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border p-3 rounded" required={!id} />
        <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full border p-3 rounded" />
        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700">{id ? "Update" : "Add Student"}</button>
          <button type="button" onClick={() => navigate("/admin/students")} className="flex-1 border py-3 rounded font-semibold">Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default AddEditStudent;