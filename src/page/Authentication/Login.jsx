import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaSpinner } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { NavLink, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    role: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://pos-backend-delta.vercel.app/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      toast.error("Server error!" ,error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === "admin") {
      setFormData({
        email: "manager@gmail.com",
        password: "Manager1@",
        role: "manager",
      });
    } else {
      setFormData({
        email: "staff@gmail.com",
        password: "Staff1@",
        role: "staff",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#9333ea]">

      {/* Glass Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          POS Login 🚀
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-200">Email</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg
          bg-white/20 border border-white/30 focus-within:ring-2 focus-within:ring-indigo-400">
            <SiGmail className="text-white mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full bg-transparent outline-none text-white placeholder-gray-300"
            />
          </div>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="text-sm text-gray-200">Role</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg
          bg-white/20 border border-white/30 focus-within:ring-2 focus-within:ring-indigo-400">
            <RiShieldUserFill className="text-white mr-2" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-transparent text-white outline-none"
            >
              <option value="" className="text-black">Select Role</option>
              <option value="manager" className="text-black">Manager</option>
              <option value="staff" className="text-black">Staff</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-200">Password</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg
          bg-white/20 border border-white/30 focus-within:ring-2 focus-within:ring-indigo-400">
            <FaLock className="text-white mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full bg-transparent outline-none text-white placeholder-gray-300"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash className="text-white"/> : <FaEye className="text-white"/>}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg font-semibold text-white
          bg-gradient-to-r from-indigo-500 to-purple-600
          hover:scale-105 transition flex items-center justify-center gap-2"
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          Login
        </button>

        <ToastContainer />

        {/* Demo */}
        <div className="mt-5">
          <p className="text-center text-sm text-gray-300 mb-2">
            Demo Login
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("staff")}
              className="flex-1 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30"
            >
              Staff
            </button>
          </div>
        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Don’t have an account?{" "}
          <NavLink to="/ragister" className="text-yellow-300 font-medium">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;