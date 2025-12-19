import { useState } from "react";
import { apiRequest } from "../api/api";

function Register({ openLogin, onRegisterSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // تحقق من تطابق الباسورد
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = await apiRequest("/auth/register", "POST", {
      name: form.name,
      email: form.email,
      password: form.password,
    });
    console.log(data);
    if (data.data.token) {
      localStorage.setItem("token", data.data.token);
      alert("Registration successful!");
      if (onRegisterSuccess) onRegisterSuccess(); 
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            name="name"
            placeholder="Enter Name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm outline-none focus:ring-1 focus:ring-red-600"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            name="email"
            placeholder="Enter Email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm outline-none focus:ring-1 focus:ring-red-600"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            name="password"
            placeholder="Enter Password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm outline-none focus:ring-1 focus:ring-red-600"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            name="confirmPassword"
            placeholder="Enter Password again"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm outline-none focus:ring-1 focus:ring-red-600"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-sm hover:bg-red-700 transition"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-gray-700">Already have an account? </span>
        <button
          onClick={openLogin}
          className="text-red-700 font-semibold hover:underline"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
