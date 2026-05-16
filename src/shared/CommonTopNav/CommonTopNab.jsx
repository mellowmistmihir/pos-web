import 'react'
import { useEffect, useRef, useState } from 'react';
import useUser from '../getUser/GetUser';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

import {
  HiMiniHomeModern,
  HiOutlineUsers,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineArrowLeft,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserCircle,
  HiSparkles,
} from 'react-icons/hi2';

import {
  MdFullscreen,
  MdFullscreenExit,
  MdKeyboardArrowDown,
} from 'react-icons/md';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

const CommonTopNab = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [theme, setTheme] = useState(
  localStorage.getItem('theme') || 'light'
);

  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  // ROUTE CHECK
  const isDashboard = location.pathname === "/dashboard";
  const isPos = location.pathname === "/pos";

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logout Successful!');
    navigate('/login');
  };

  // FULLSCREEN
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // THEME
useEffect(() => {

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  localStorage.setItem('theme', theme);

}, [theme]);

const toggleTheme = () => {

  const newTheme =
    theme === "light"
      ? "dark"
      : "light";

  setTheme(newTheme);

  localStorage.setItem("theme", newTheme);

  window.dispatchEvent(new Event("themeChanged"));
};

  // OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div
      className="
        sticky top-0 z-50
        h-20
        px-6

        flex items-center justify-between

        border-b border-white/10

        bg-gradient-to-r
        from-[#020617]
        via-[#0f172a]
        to-[#111827]

        backdrop-blur-3xl

        shadow-[0_10px_40px_rgba(0,0,0,0.45)]
      "
    >

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 h-full">

        {isPos && (
          <NavLink to="/dashboard">
            <motion.button
              whileTap={{ scale: 0.90 }}
              whileHover={{ scale: 1.05 }}
              className="
                h-12 w-12 rounded-2xl

                bg-white/10
                border border-white/10

                flex items-center justify-center

                text-white text-2xl

                hover:bg-indigo-500

                transition-all duration-300
              "
            >
              <HiOutlineArrowLeft />
            </motion.button>
          </NavLink>
        )}

        {/* TITLE */}
        <div className="flex flex-col justify-center">

          <h1
            className="
              text-2xl md:text-3xl
              font-black
              leading-none
              tracking-wide

              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500

              bg-clip-text text-transparent
            "
          >
            {
              isDashboard
                ? `WELCOME ${user?.name || 'ADMIN'}`
                : 'POS SYSTEM'
            }
          </h1>

          <p
            className="
              text-gray-400
              text-sm
              mt-1

              flex items-center gap-1
            "
          >
            <HiSparkles className="text-cyan-400" />
            Premium Dashboard Experience
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* HOME */}
        <NavLink to="/dashboard">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="
              h-12 w-12

              rounded-2xl

              bg-white/10
              border border-white/10

              text-white

              flex items-center justify-center

              text-xl

              hover:bg-cyan-500

              transition-all duration-300

              shadow-lg
            "
          >
            <HiMiniHomeModern />
          </motion.button>
        </NavLink>

        {/* USERS */}
        <NavLink to="/customerList">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="
              h-12 w-12

              rounded-2xl

              bg-white/10
              border border-white/10

              text-white

              flex items-center justify-center

              text-xl

              hover:bg-purple-500

              transition-all duration-300

              shadow-lg
            "
          >
            <HiOutlineUsers />
          </motion.button>
        </NavLink>

        {/* FULLSCREEN */}
        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleFullScreen}
          className="
            h-12 w-12

            rounded-2xl

            bg-white/10
            border border-white/10

            text-white

            flex items-center justify-center

            text-xl

            hover:bg-indigo-500

            transition-all duration-300

            shadow-lg
          "
        >
          {
            isFullScreen
              ? <MdFullscreenExit />
              : <MdFullscreen />
          }
        </motion.button>

        {/* DARK MODE */}
        <motion.button
          whileHover={{ rotate: 15 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          className="
            h-12 w-12

            rounded-2xl

            bg-white/10
            border border-white/10

            text-yellow-300

            flex items-center justify-center

            text-xl

            hover:bg-yellow-400/10

            transition-all duration-300

            shadow-lg
          "
        >
          {
            theme === 'light'
              ? <HiOutlineMoon />
              : <HiOutlineSun />
          }
        </motion.button>

        {/* PROFILE */}
        <div className="relative flex items-center" ref={menuRef}>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              pr-3 pl-2

              h-14
              min-w-[230px]

              rounded-2xl

              bg-white/10

              backdrop-blur-2xl

              border border-white/10

              flex items-center justify-between

              shadow-[0_8px_30px_rgba(0,0,0,0.35)]

              hover:border-cyan-400/40
              hover:bg-white/15

              transition-all duration-300
            "
          >

            {/* LEFT */}
            <div className="flex items-center gap-3">

              {/* AVATAR */}
              <div
                className="
                  h-11 w-11

                  rounded-2xl

                  bg-gradient-to-br
                  from-cyan-400
                  via-blue-500
                  to-indigo-600

                  flex items-center justify-center

                  text-white text-2xl

                  shadow-lg
                "
              >
                <HiOutlineUserCircle />
              </div>

              {/* USER INFO */}
              <div className="flex flex-col items-start">

                <h1 className="text-white text-sm font-semibold leading-none">
                  {user?.name || "Admin"}
                </h1>

                <p className="text-xs text-gray-300 capitalize mt-1">
                  {user?.role || "Manager"}
                </p>

              </div>

            </div>

            {/* RIGHT ICON */}
            <MdKeyboardArrowDown
              className={`
                text-2xl text-gray-300
                transition-all duration-300
                ${isMenuOpen ? 'rotate-180' : ''}
              `}
            />

          </motion.button>

          {/* DROPDOWN */}
          <AnimatePresence>

            {
              isMenuOpen && (

                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.96 }}
                  transition={{ duration: 0.25 }}

                  className="
                    absolute
                    top-[72px]
                    right-0

                    w-[340px]

                    rounded-3xl

                    overflow-hidden

                    border border-white/10

                    bg-[#0f172ae8]

                    backdrop-blur-3xl

                    shadow-[0_25px_80px_rgba(0,0,0,0.6)]
                  "
                >

                  {/* TOP PROFILE */}
                  <div
                    className="
                      relative overflow-hidden

                      p-6

                      bg-gradient-to-r
                      from-cyan-500
                      via-blue-500
                      to-indigo-600
                    "
                  >

                    <div
                      className="
                        absolute
                        -top-10
                        -right-10

                        h-40 w-40

                        rounded-full

                        bg-white/10
                      "
                    />

                    <div className="relative flex items-center gap-4">

                      {/* AVATAR */}
                      <div
                        className="
                          h-16 w-16

                          rounded-2xl

                          bg-white/20

                          flex items-center justify-center

                          text-5xl text-white

                          backdrop-blur-lg
                        "
                      >
                        <HiOutlineUserCircle />
                      </div>

                      {/* INFO */}
                      <div className="text-white">

                        <h1 className="text-xl font-bold">
                          {user?.name || "Admin"}
                        </h1>

                        <p className="text-sm text-cyan-100 capitalize">
                          {user?.role || "Manager"}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* MENU */}
                  <div className="p-3 space-y-2">

                    {/* PROFILE */}
                    <NavLink to="/myProfile">
                      <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.97 }}
                        className="
                          w-full h-14

                          rounded-2xl

                          px-4

                          flex items-center justify-between

                          text-white

                          bg-white/5

                          hover:bg-cyan-500

                          transition-all duration-300
                        "
                      >

                        <div className="flex items-center gap-4">

                          <div
                            className="
                              h-10 w-10

                              rounded-xl

                              bg-white/10

                              flex items-center justify-center

                              text-xl
                            "
                          >
                            <HiOutlineUserCircle />
                          </div>

                          <span className="font-medium">
                            My Profile
                          </span>

                        </div>

                        <MdKeyboardArrowDown className="-rotate-90 text-xl" />

                      </motion.button>
                    </NavLink>

                    {/* SETTINGS */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.97 }}
                      className="
                        w-full h-14

                        rounded-2xl

                        px-4

                        flex items-center justify-between

                        text-white

                        bg-white/5

                        hover:bg-indigo-500

                        transition-all duration-300
                      "
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            h-10 w-10

                            rounded-xl

                            bg-white/10

                            flex items-center justify-center

                            text-xl
                          "
                        >
                          <HiOutlineCog6Tooth />
                        </div>

                        <span className="font-medium">
                          Settings
                        </span>

                      </div>

                      <MdKeyboardArrowDown className="-rotate-90 text-xl" />

                    </motion.button>

                    {/* LOGOUT */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleLogout}
                      className="
                        w-full h-14

                        rounded-2xl

                        px-4

                        flex items-center justify-between

                        text-white

                        bg-red-500/10

                        hover:bg-red-600

                        transition-all duration-300
                      "
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            h-10 w-10

                            rounded-xl

                            bg-white/10

                            flex items-center justify-center

                            text-xl
                          "
                        >
                          <HiOutlineArrowRightOnRectangle />
                        </div>

                        <span className="font-medium">
                          Logout
                        </span>

                      </div>

                      <MdKeyboardArrowDown className="-rotate-90 text-xl" />

                    </motion.button>

                  </div>

                </motion.div>
              )
            }

          </AnimatePresence>

        </div>

      </div>

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

    </div>
  );
};

export default CommonTopNab;