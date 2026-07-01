import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaSpinner } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

   const [formData, setFormData] = useState({
    email: '',
    role: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${data?.message || 'Login successful!'}`);
        console.log('Response:', data);
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user info in local storage
        navigate('/dashboard'); // Redirect to a dashboard or home page
      } else {
        const errorData = await response.json();
        toast.error(`${errorData?.message || 'Login failed. Please try again.'}`);
        console.log('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while logging in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      setFormData({
        email: 'manager@gmail.com',
        password: 'Manager1@',
        role: 'manager',
      });
    } else if (role === 'staff') {
      setFormData({
        email: 'staff@gmail.com',
        password: 'Staff1@',
        role: 'staff',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#9333ea]">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          POS Login 🚀
        </h2>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-200">Email</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30">
            <SiGmail className="text-white mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full bg-transparent outline-none text-white placeholder-gray-300"
              required
            />
          </div>
        </div>

        {/* ROLE */}
        <div className="mb-4">
          <label className="text-sm text-gray-200">Role</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30">
            <RiShieldUserFill className="text-white mr-2" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-transparent text-white outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-gray-200">Password</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30">
            <FaLock className="text-white mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full bg-transparent outline-none text-white placeholder-gray-300"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-white" />
              ) : (
                <FaEye className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center gap-2"
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          Login
        </button>

        <ToastContainer />

        {/* DEMO */}
        <div className="mt-5">
          <p className="text-center text-sm text-gray-300 mb-2">
            Demo Login
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("manager")}
              className="flex-1 py-2 rounded-lg bg-white/20 text-white"
            >
              Manager
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("staff")}
              className="flex-1 py-2 rounded-lg bg-white/20 text-white"
            >
              Staff
            </button>
          </div>
        </div>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Don’t have an account?{" "}
          <NavLink to="/ragister" className="text-yellow-300">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;