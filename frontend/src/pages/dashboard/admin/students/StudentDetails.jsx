// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   getStudentDetails,
//   getStudentAttendance,
//   getStudentQuizzes,
// } from "../../../../services/adminService";

// const StudentDetails = () => {
//   const { id } = useParams();

//   const [student, setStudent] = useState(null);
//   const [attendance, setAttendance] = useState(null);
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const s = await getStudentDetails(id);
//     const a = await getStudentAttendance(id);
//     const q = await getStudentQuizzes(id);

//     setStudent(s.data.student);
//     setAttendance(a.data);
//     setQuizzes(q.data);
//   };

//   if (!student) return <p>Loading...</p>;

//   return (
//     <div className="space-y-6">

//       {/* STUDENT INFO */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-xl font-bold">Student Info</h2>
//         <p>Name: {student.name}</p>
//         <p>Course: {student.course?.title}</p>
//         <p>Batch: {student.batch?.name}</p>
//       </div>

//       {/* ATTENDANCE */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-xl font-bold">Attendance</h2>
//         <p>Total Lectures: {attendance.totalLectures}</p>
//         <p>Attended: {attendance.attended}</p>
//         <p>
//           Percentage:{" "}
//           {attendance.totalLectures
//             ? Math.round(
//                 (attendance.attended /
//                   attendance.totalLectures) *
//                   100
//               )
//             : 0}
//           %
//         </p>
//       </div>

//       {/* QUIZZES */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-xl font-bold">Quiz Results</h2>

//         <table className="w-full text-sm">
//           <thead>
//             <tr>
//               <th>Quiz</th>
//               <th>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {quizzes.map((q, i) => (
//               <tr key={i}>
//                 <td>{q.quizTitle}</td>
//                 <td>
//                   {q.score}/{q.totalMarks}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentDetails } from "../../../../services/adminService";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getStudentDetails(id);
        setStudent(res.data.student);
      } catch (err) {
        console.error("Failed to load student", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>No student found</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Student Details</h2>

      <p><b>Name:</b> {student.name}</p>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Phone:</b> {student.phone}</p>
      <p><b>Course:</b> {student.course?.title}</p>
      <p>
        <b>Status:</b>{" "}
        {student.isActive ? "Active" : "Inactive"}
      </p>
    </div>
  );
};

export default StudentDetails;
