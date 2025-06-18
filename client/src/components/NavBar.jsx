import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "../context/AuthContext.jsx";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    console.log("Logout button clicked");
    await logout();
    console.log("User logged out");
    navigate("/"); // Redirect to login or homepage
  };

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
    user
      ? { name: <p>Hello {user.email}</p> }
      : { name: "Profile", path: "/profile" },
  ].filter(Boolean);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Logo
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-gray-800 font-medium relative items-center">
          {navLinks.map((link, idx) => (
            <li key={idx}>
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

          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-secondary transition-colors duration-300 cursor-pointer"
              >
                Logout
              </button>
            </li>
          )}
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
            {navLinks.map((link, idx) => (
              <li key={idx}>
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
            {user && (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-left w-full text-gray-800 hover:text-secondary transition-colors duration-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
