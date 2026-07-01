import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaSpinner } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                alert(`${data?.message}`);
                console.log('Response:', data);
                localStorage.setItem('user', JSON.stringify(data.user)); // Save user info
                navigate("/dashboard");
            } else {
                const errorData = await response.json();
                toast.error(`${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while creating the user.');
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#9333ea]">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          POS Register 🚀
        </h2>

        {/* NAME */}
        <div className="mb-3">
          <label className="text-sm text-gray-200">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="text-sm text-gray-200">Email</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg bg-white/20">
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

        {/* PHONE */}
        <div className="mb-3">
          <label className="text-sm text-gray-200">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
            required
          />
        </div>

        {/* ROLE */}
        <div className="mb-3">
          <label className="text-sm text-gray-200">Role</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg bg-white/20">
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
        <div className="mb-5">
          <label className="text-sm text-gray-200">Password</label>
          <div className="flex items-center mt-1 px-4 py-3 rounded-lg bg-white/20">
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
          Sign Up
        </button>

        <ToastContainer />

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-yellow-300">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;