// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth"; // backend url

// export const registerUser = async (data) => {
//   const res = await axios.post(`${API_URL}/register`, data);
//   return res.data;
// };

// export const loginUser = async (data) => {
//   const res = await axios.post(`${API_URL}/login`, data);
//   return res.data;
// };

// export const forgotPassword = async (email) => {
//   const res = await axios.post(`${API_URL}/forgot-password`, { email });
//   return res.data;
// };

// export const resetPassword = async (token, password) => {
//   const res = await axios.post(`${API_URL}/reset-password/${token}`, {
//     password,
//   });
//   return res.data;
// };


// import api from "./api";

// // REGISTER
// export const registerUser = async (data) => {
//   const res = await api.post("/auth/register", data);
//   return res.data;
// };

// // LOGIN
// export const loginUser = async (data) => {
//   const res = await api.post("/auth/login", data);

//   // 🔐 save auth data
//   localStorage.setItem("token", res.data.token);
//   localStorage.setItem("user", JSON.stringify(res.data.user));

//   return res.data;
// };

// // FORGOT PASSWORD
// export const forgotPassword = async (email) => {
//   const res = await api.post("/auth/forgot-password", { email });
//   return res.data;
// };

// // RESET PASSWORD
// export const resetPassword = async (token, password) => {
//   const res = await api.post(`/auth/reset-password/${token}`, {
//     password,
//   });
//   return res.data;
// };

// export const sendOtp = async (email) => {
//   const res = await api.post(
//     "http://localhost:5000/api/auth/send-otp",
//     { email }
//   );
//   return res.data;
// };

// export const verifyOtp = async (data) => {
//   const res = await api.post(
//     "http://localhost:5000/api/auth/verify-otp",
//     data
//   );
//   return res.data;
// };


import api from "./api";

// REGISTER
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  // 🔐 save auth data
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (token, password) => {
  const res = await api.post(`/auth/reset-password/${token}`, {
    password,
  });
  return res.data;
};

// ✅ SEND OTP
export const sendOtp = async (email) => {
  const res = await api.post("/auth/send-otp", { email }); // <-- just use relative URL
  return res.data;
};

// ✅ VERIFY OTP
export const verifyOtp = async (data) => {
  const res = await api.post("/auth/verify-otp", data); // <-- just use relative URL
  return res.data;
};
