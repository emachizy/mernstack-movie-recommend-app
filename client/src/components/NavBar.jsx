import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "../context/AuthContext.jsx";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Logo
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition duration-300 ${
                  isActive
                    ? "text-secondary font-semibold"
                    : "hover:text-secondary"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          {!user && (
            <li>
              <NavLink to="/login" className="transition hover:text-secondary">
                Login
              </NavLink>
            </li>
          )}

          {user && (
            <li className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-300 hover:ring-secondary transition"
                />
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <NavLink
                    to="/favorites"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    ❤️ My Favorites
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-6 text-gray-800 font-medium">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive
                      ? "text-secondary font-semibold"
                      : "hover:text-secondary"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            {!user && (
              <li>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-secondary transition-colors"
                >
                  Login
                </NavLink>
              </li>
            )}

            {user && (
              <>
                <li className="flex items-center space-x-2">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.email}</span>
                </li>
                <li>
                  <NavLink
                    to="/favorites"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-secondary transition-colors"
                  >
                    ❤️ My Favorites
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-left w-full hover:text-secondary transition-colors"
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
