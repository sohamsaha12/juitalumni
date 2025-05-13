import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/ju_logo.png"; // Adjust the path as necessary

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (path) => {
    return location.pathname === path
      ? "block mt-4 lg:inline-block lg:mt-0 text-yellow-300 text-lg font-medium transition duration-300 mr-4"
      : "block mt-4 lg:inline-block lg:mt-0 text-white text-lg font-medium hover:text-yellow-300 transition duration-300 mr-4";
  };

  const formatUsername = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            src={logo}
            alt="Jadavpur University Logo"
            className="h-10 mr-4 rounded-full"
          />
          <span className="font-semibold text-xl tracking-tight ml-2 lg:ml-4">
            JU IT Alumni Association
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-yellow-300 hover:border-yellow-300"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow lg:flex lg:justify-end">
            <Link to="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link to="/mission" className={linkClasses("/mission")}>
              Mission
            </Link>
            <Link to="/alumni" className={linkClasses("/alumni")}>
              Alumni
            </Link>
            <Link to="/blogs" className={linkClasses("/blogs")}>
              Blogs
            </Link>
            <Link to="/events" className={linkClasses("/events")}>
              Events
            </Link>
            <Link to="/donate" className={linkClasses("/donate")}>
              Donate
            </Link>
            {user && user.role === 'root' && (
              <Link to="/admin" className={linkClasses("/admin")}>
                Admin Panel
              </Link>
            )}
            {user ? (
              <>
                <span className="bg-white text-blue-800 text-lg font-medium mr-4 mt-4 lg:mt-0 px-4 py-2 rounded-full">
                  {formatUsername(user.name)}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 mt-4 lg:mt-0"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 mt-4 lg:mt-0"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;