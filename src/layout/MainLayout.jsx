import { Outlet } from "react-router";
import { useEffect, useState } from "react";

import Navbar from "../Shared/Navbar/Navbar";
import Login from "../page/Authentication/Login";
import useUser from "../Shared/getUser/GetUser";

const MainLayout = () => {

  const user = useUser();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {

    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme"));
    };

    window.addEventListener("themeChanged", handleThemeChange);

    return () => {
      window.removeEventListener("themeChanged", handleThemeChange);
    };

  }, []);

  return (
    <div>

      {
        user ? (

          <div className="flex h-screen overflow-hidden">

            {/* SIDEBAR */}
            <div className={` w-[290px] shrink-0    ${
                  theme === "dark"
                    ? "bg-[#020617] text-white"
                    : "bg-[#f4f7fe] text-black"
                }`}  >
              <Navbar />
            </div>

            {/* CONTENT */}
            <main
              className={`
                flex-1
                overflow-y-auto
                transition-all duration-300

                ${
                  theme === "dark"
                    ? "bg-[#020617] text-white"
                    : "bg-[#f4f7fe] text-black"
                }
              `}
            >
              <Outlet />
            </main>

          </div>

        ) : (
          <Login />
        )
      }

    </div>
  );
};

export default MainLayout;