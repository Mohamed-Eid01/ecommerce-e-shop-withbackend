import { useState } from "react";
import { apiRequest } from "../api/api";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";

function Login({ openSignUp, onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // لإظهار رسالة الخطأ
  const dispatch = useDispatch();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const data = await apiRequest("/auth/login", "POST", form);

      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
            dispatch(setToken(data.data.token));
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError("Email or password is incorrect");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 text-center text-red-600 font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm outline-none focus:ring-1 focus:ring-red-600"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm outline-none focus:ring-1 focus:ring-red-600"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox border-gray-300 shadow-sm outline-none"
            />
            <span className="ml-2 text-gray-700">Remember Me</span>
          </label>

          <a href="#" className="text-red-700 hover:underline text-sm">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-sm hover:bg-red-700 transition"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-gray-700">Don't have an account? </span>
        <button
          onClick={openSignUp}
          className="text-red-700 font-semibold hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
