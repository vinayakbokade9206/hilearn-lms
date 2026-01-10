import api from "./api";

/* STUDENTS */
export const getStudents = () => api.get("/admin/students");
export const addStudent = (data) => api.post("/admin/students", data);
export const updateStudent = (id, data) => api.put(`/admin/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/admin/students/${id}`);
export const toggleStudentStatus = (id) =>
  api.patch(`/admin/students/${id}/status`);

/* COURSES */
export const getCourses = () => api.get("/admin/courses");
export const addCourse = (data) => api.post("/admin/courses", data);

/* LECTURES */
export const getLectures = () => api.get("/admin/lectures");

/* BATCHES */
export const getBatches = () => api.get("/admin/batches");



export const getAdminProfile = async () => {
  const response = await api.get("/admin/profile");
  return response.data;
}
