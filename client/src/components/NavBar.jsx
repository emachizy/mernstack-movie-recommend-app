import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import useAuth from "../context/AuthContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    user
      ? {
          name: (
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover inline-block"
            />
          ),
          path: "/profile",
        }
      : { name: "Login", path: "/login" },
    user && { name: "Logout", path: "/logout" },
  ].filter(Boolean);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Logo
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-gray-800 font-medium relative">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive
                      ? "text-secondary font-semibold"
                      : "hover:text-secondary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-8 pl-6 text-gray-800 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors duration-300 ${
                      isActive
                        ? "text-secondary font-semibold"
                        : "hover:text-secondary"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
