import api from "./api";

/* STUDENTS */
export const getStudents = () => api.get("/students");
export const addStudent = (data) => api.post("/students", data);
export const updateStudent = (id, data) =>
  api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export const toggleStudentStatus = (id) =>
  api.patch(`/students/${id}/status`);


export const getStudentDetails = (id) =>
  api.get(`/students/${id}`);

export const getStudentAttendance = (id) =>
  api.get(`/admin/students/${id}/attendance`);

export const getStudentQuizzes = (id) =>
  api.get(`/admin/students/${id}/quizzes`);

/* COURSES */
export const getCourses = () => api.get("/courses");
export const addCourse = (data) => api.post("/admin/courses", data);

/* LECTURES */
export const getLectures = () => api.get("/admin/lectures");

/* BATCHES */
export const getBatches = () => api.get("/admin/batches");
export const addBatch = (data) => api.post("/admin/batches", data);
export const updateBatch = (id, data) =>
  api.put(`/admin/batches/${id}`, data);
export const deleteBatch = (id) =>
  api.delete(`/admin/batches/${id}`);
export const toggleBatchStatus = (id) =>
  api.patch(`/admin/batches/${id}/status`);


export const getAdminProfile = async () => {
  const response = await api.get("/admin/profile");
  return response.data;
}


/* ===================== FACULTIES ===================== */

// Get all faculties (mentors)
export const getFaculties = () =>
  api.get("/admin/faculties");

// Add new faculty
export const addFaculty = (data) =>
  api.post("/admin/faculties", data);

// Update faculty
export const updateFaculty = (id, data) =>
  api.put(`/admin/faculties/${id}`, data);

// Delete faculty
export const deleteFaculty = (id) =>
  api.delete(`/admin/faculties/${id}`);

export const toggleFacultyStatus = (id) =>
  api.patch(`/admin/faculties/${id}/status`);

// Assign faculty to course
export const assignFacultyToCourse = (data) =>
  api.post("/admin/faculties/assign-course", data);


