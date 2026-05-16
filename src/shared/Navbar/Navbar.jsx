import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import {
  LuChevronFirst,
  LuChevronLast,
} from "react-icons/lu";

import {
  AiOutlineDashboard,
  AiOutlineProduct,
  AiOutlineSetting,
} from "react-icons/ai";

import { FiUser } from "react-icons/fi";
import {  MdOutlinePeopleAlt } from "react-icons/md";

import {
  BsChevronDown,
  // BsChevronUp,
  BsFileEarmarkPost,
} from "react-icons/bs";

import useUser from "../getUser/GetUser";

import {
  MdFormatListBulletedAdd,
  MdOutlineCategory,
  MdOutlinePlaylistAddCheck,
} from "react-icons/md";

import logo from "../../assets/logo.jpg";

import { CiShoppingCart } from "react-icons/ci";
import { FaUsersViewfinder } from "react-icons/fa6";

const Navbar = () => {
  const [expanded, setExpanded] = useState(true);
  const user = useUser();

  const menuItems = [
    {
      id: "dashboard",
      text: "Dashboard",
      icon: <AiOutlineDashboard size={20} />,
      path: "/dashboard",
    },

    {
      id: "Products",
      text: "Products",
      icon: <AiOutlineProduct size={20} />,
      submenu: [
        ...(user?.role !== "staff"
          ? [
              {
                id: "AddCategory",
                text: "Category",
                icon: <MdOutlineCategory size={16} />,
                path: "/addCategory",
              },
            ]
          : []),

        {
          id: "AddProduct",
          text: "Add Product",
          icon: <MdFormatListBulletedAdd size={16} />,
          path: "/addProduct",
        },
    
        {
          id: "AllProducts",
          text: "All Products",
          icon: <MdOutlinePlaylistAddCheck size={18} />,
          path: "/allProducts",
        },
      ],
    },

    {
      id: "sale",
      text: "Sales",
      icon: <CiShoppingCart size={20} />,
      submenu: [
        {
          id: "pos",
          text: "POS",
          icon: <BsFileEarmarkPost size={16} />,
          path: "/pos",
        },

        {
          id: "CustomerList",
          text: "Sale List",
          icon: <FaUsersViewfinder size={18} />,
          path: "/customerList",
        },
      ],
    },

    {
      id: "People",
      text: "People",
      icon: <MdOutlinePeopleAlt size={20} />,
      submenu: [
        {
          id: "PeopleList",
          text: "People List",
          icon: <MdOutlinePeopleAlt size={18} />,
          path: "/peopleList",
        },
      ],
    },

    {
      id: "info",
      text: "Settings",
      icon: <AiOutlineSetting size={20} />,
      submenu: [
        {
          id: "about",
          text: "About",
          icon: <FiUser size={16} />,
          path: "/info/about",
        },

        {
          id: "contact",
          text: "Contact",
          icon: <FiUser size={16} />,
          path: "/info/contact",
        },
      ],
    },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen
        ${expanded ? "w-72" : "w-20"}
        transition-all duration-300
        bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#020617]
        border-r border-white/10
        shadow-[0_0_40px_rgba(0,0,0,0.5)]
        backdrop-blur-xl
      `}
    >
      <nav className="h-full flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">

          <div className="flex items-center gap-3 overflow-hidden">

            {/* LOGO */}
            <div
              className="
                min-w-[48px]
                min-h-[48px]
                w-12
                h-12
                rounded-full
                overflow-hidden
                border-2 border-cyan-400/40
                shadow-lg shadow-cyan-500/20
              "
            >
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>

            {expanded && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="
                  font-bold
                  text-lg
                  tracking-[3px]
                  bg-gradient-to-r from-cyan-400 to-purple-500
                  bg-clip-text
                  text-transparent
                  whitespace-nowrap
                "
              >
                POS SYSTEM
              </motion.h1>
            )}
          </div>

          {/* EXPAND BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExpanded(!expanded)}
            className="
              p-2.5
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-500
              text-white
              shadow-lg
              hover:shadow-cyan-500/40
              transition
            "
          >
            {expanded ? <LuChevronFirst /> : <LuChevronLast />}
          </motion.button>
        </div>

        {/* MENU */}
        <div className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              expanded={expanded}
            />
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/10 flex items-center gap-3">

          <div
            className="
              w-11
              h-11
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              to-purple-500
              flex
              items-center
              justify-center
              font-bold
              text-white
              uppercase
              shadow-lg
            "
          >
            {user?.name?.charAt(0)}
          </div>

          {expanded && (
            <div className="overflow-hidden">
              <p className="font-semibold text-white truncate">
                {user?.name}
              </p>

              <p className="text-xs text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({ item, expanded }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const active =
    location.pathname === item.path ||
    item.submenu?.some((sub) =>
      location.pathname.startsWith(sub.path)
    );

  return (
    <div>
      <NavLink
        to={item.path || "#"}
        onClick={() => item.submenu && setOpen(!open)}
        className={`
          relative
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          overflow-hidden
          transition-all
          duration-300
          group

          ${
            active
              ? `
                bg-gradient-to-r
                from-cyan-500/20
                to-purple-500/20
                text-white
                shadow-lg
                border border-cyan-400/20
              `
              : `
                text-gray-400
                hover:text-white
                hover:bg-white/5
              `
          }
        `}
      >

        {/* ACTIVE SIDE BAR */}
        {active && (
          <motion.div
            layoutId="activeSidebar"
            className="
              absolute
              left-0
              top-2
              bottom-2
              w-1.5
              rounded-r-full
              bg-gradient-to-b
              from-cyan-400
              to-purple-500
            "
          />
        )}

        {/* ICON */}
        <span
          className={`
            text-xl
            transition
            duration-300

            ${
              active
                ? "text-cyan-300"
                : "group-hover:text-cyan-300"
            }
          `}
        >
          {item.icon}
        </span>

        {/* TEXT */}
        {expanded && (
          <span className="flex-1 text-sm font-semibold tracking-wide">
            {item.text}
          </span>
        )}

        {/* ARROW */}
        {item.submenu && expanded && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="
              text-xs
              bg-white/10
              p-1.5
              rounded-full
            "
          >
            <BsChevronDown />
          </motion.span>
        )}
      </NavLink>

      {/* SUBMENU */}
      <AnimatePresence>
        {item.submenu && open && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              ml-6
              mt-2
              pl-4
              border-l
              border-cyan-500/20
              overflow-hidden
              space-y-1
            "
          >
            {item.submenu.map((sub) => {
              const subActive =
                location.pathname === sub.path;

              return (
                <NavLink
                  key={sub.id}
                  to={sub.path}
                  className={`
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    transition-all
                    duration-300

                    ${
                      subActive
                        ? `
                          bg-gradient-to-r
                          from-cyan-500/20
                          to-purple-500/20
                          text-white
                        `
                        : `
                          text-gray-400
                          hover:text-white
                          hover:bg-white/5
                        `
                    }
                  `}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.text}</span>
                </NavLink>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;