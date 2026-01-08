import { useState } from "react";
import { registerUser } from "../../services/authService";
import Input from "../common/Input";
import RoleSelect from "../common/RoleSelect";
import Button from "../common/Button";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(data);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Full Name" onChange={handleChange} />
        <Input name="email" placeholder="Email Address" onChange={handleChange} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <RoleSelect onChange={handleChange} />

        <Button text="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;