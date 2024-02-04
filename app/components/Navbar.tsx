import { NavLink, useLocation } from "@remix-run/react";
import { routes } from "~/utils/route";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="backdrop-blur-2xl max-h-[calc(100vh-2rem)] flex flex-row lg:flex-col max-lg:justify-between bg-[#ffffff0a] backdrop-filter rounded-lg m-3 px-4 py-8">
      <p className="text-3xl text-white font-semibold block">Game Zone</p>
      <ul className="flex flex-row lg:flex-col lg:mt-3 gap-3">
        {routes.map((route) => (
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
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
