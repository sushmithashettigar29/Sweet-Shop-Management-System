import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#8B2321] text-white p-4 sm:px-12 md:px-24">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-wider text-white">
          Sweet.
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-[#FFDAB9] hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/all-sweets" className="text-[#FFDAB9] hover:text-white transition-colors">
            All Sweets
          </Link>
          <Link to="/about" className="text-[#FFDAB9] hover:text-white transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-[#FFDAB9] hover:text-white transition-colors">
            Contact
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="text-[#FFDAB9] hover:text-white transition-colors">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="text-[#FFDAB9] hover:text-white transition-colors">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-[#8B2321] px-4 py-2 rounded-full font-bold
                           hover:bg-gray-200 transition-colors shadow-lg cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-[#8B2321] px-4 py-2 rounded-full font-bold
                           hover:bg-gray-200 transition-colors shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#FFDAB9] text-[#8B2321] px-4 py-2 rounded-full font-bold
                           hover:bg-white transition-colors shadow-lg"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 pt-4">
          <Link onClick={toggleMenu} to="/" className="text-[#FFDAB9] hover:text-white transition-colors">
            Home
          </Link>
          <Link onClick={toggleMenu} to="/all-sweets" className="text-[#FFDAB9] hover:text-white transition-colors">
            All Sweets
          </Link>
          <Link onClick={toggleMenu} to="/about" className="text-[#FFDAB9] hover:text-white transition-colors">
            About
          </Link>
          <Link onClick={toggleMenu} to="/contact" className="text-[#FFDAB9] hover:text-white transition-colors">
            Contact
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link onClick={toggleMenu} to="/admin" className="text-[#FFDAB9] hover:text-white transition-colors">
                  Admin
                </Link>
              )}
              <Link onClick={toggleMenu} to="/dashboard" className="text-[#FFDAB9] hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link onClick={toggleMenu} to="/profile" className="text-[#FFDAB9] hover:text-white transition-colors">
                Profile
              </Link>
              <button
                onClick={() => { handleLogout(); toggleMenu(); }}
                className="bg-white text-[#8B2321] px-4 py-2 rounded-full font-bold
                           hover:bg-gray-200 transition-colors shadow-lg w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                onClick={toggleMenu}
                to="/login"
                className="bg-white text-[#8B2321] px-4 py-2 rounded-full font-bold
                           hover:bg-gray-200 transition-colors shadow-lg w-full text-center"
              >
                Login
              </Link>
              <Link
                onClick={toggleMenu}
                to="/register"
                className="bg-[#FFDAB9] text-[#8B2321] px-4 py-2 rounded-full font-bold
                           hover:bg-white transition-colors shadow-lg w-full text-center"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
