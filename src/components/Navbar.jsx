import {
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import useThemeStore from "../store/themeStore";

const Navbar = ({ activeSection, setActiveSection }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode
          ? "bg-gray-900/90 border-b border-gray-800"
          : "bg-white/90 border-b border-gray-200"
      } backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setActiveSection("chat")}
            className="flex items-center space-x-2"
          >
            <AcademicCapIcon
              className={`h-8 w-8 ${
                isDarkMode ? "text-violet-400" : "text-violet-600"
              }`}
            />
            <span
              className={`text-2xl font-bold ${
                isDarkMode
                  ? "bg-gradient-to-r from-violet-400 to-indigo-400"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600"
              } text-transparent bg-clip-text`}
            >
              EduTutor
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setActiveSection("subjects")}
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors ${
                activeSection === "subjects"
                  ? "font-bold border-b-2 border-violet-500 pb-1"
                  : ""
              }`}
            >
              Subjects
            </button>
            <button
              onClick={() => setActiveSection("resources")}
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors ${
                activeSection === "resources"
                  ? "font-bold border-b-2 border-violet-500 pb-1"
                  : ""
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveSection("progress")}
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors ${
                activeSection === "progress"
                  ? "font-bold border-b-2 border-violet-500 pb-1"
                  : ""
              }`}
            >
              My Progress
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-800 text-violet-400"
                  : "hover:bg-gray-100 text-violet-600"
              }`}
              aria-label="Toggle theme"
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setActiveSection("settings")}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              } ${
                activeSection === "settings"
                  ? "bg-gray-800 text-violet-400"
                  : ""
              }`}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveSection("profile")}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              } ${
                activeSection === "profile" ? "bg-gray-800 text-violet-400" : ""
              }`}
            >
              <UserCircleIcon className="h-5 w-5" />
            </button>
            <button
              className={`flex items-center px-3 py-2 rounded-full ${
                isDarkMode
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
