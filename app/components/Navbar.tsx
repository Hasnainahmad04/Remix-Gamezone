import { NavLink, useLocation } from "@remix-run/react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { routes } from "~/utils/route";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleNav = () => setIsDrawerOpen((st) => !st);
  return (
    <aside className="">
      <nav className="backdrop-blur-2xl lg:h-[calc(100vh-2rem)] flex flex-row bg-[#ffffff0a] lg:flex-col max-lg:justify-between  backdrop-filter rounded-lg m-3 px-4 py-4 lg:py-8">
        <p className="text-3xl text-white font-semibold block">Game Zone</p>
        <ul className="hidden lg:flex flex-row lg:flex-col lg:mt-3 gap-3">
          <Navlinks />
        </ul>

        <button onClick={handleNav} className="block lg:hidden">
          {isDrawerOpen ? (
            <AiOutlineClose size={20} color="white" />
          ) : (
            <AiOutlineMenu size={20} color="white" />
          )}
        </button>
      </nav>

      <ul
        className={
          isDrawerOpen
            ? `z-10 absolute lg:hidden space-y-2 transition-all w-64 md:w-80 h-[20rem]  m-5 rounded-md px-4 py-8 bg-[#ffffff2e] right-0 opacity-100 bottom-0 ease-in-out duration-500 backdrop-blur-md `
            : "duration-500 fixed opacity-0 bottom-0 left-[100%]"
        }
      >
        <Navlinks onclick={handleNav} />
      </ul>
    </aside>
  );
};

export default Navbar;

const Navlinks = ({ onclick }: { onclick?: () => void }) => {
  const { pathname } = useLocation();

  return routes.map((route) => (
    <li key={route.name} className="group">
      <NavLink
        to={route.path}
        className={({ isActive }) =>
          `flex gap-2 text-xl ${
            isActive
              ? "text-white"
              : "text-white/70 hover:text-white transition-all duration-300"
          }`
        }
        onClick={onclick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-6 w-6 transition-all duration-300 ${
            pathname === `/${route.name.toLowerCase()}`
              ? "fill-white"
              : "fill-white/70 group-hover:fill-white"
          }`}
        >
          {route.icon}
        </svg>
        <span>{route.name}</span>
      </NavLink>
    </li>
  ));
};
