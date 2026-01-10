import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../../../services/adminService";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then(res => setStudents(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>

      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.active ? "Active" : "Inactive"}</td>
              <td>
                <button className="text-red-500"
                  onClick={() => deleteStudent(s._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
