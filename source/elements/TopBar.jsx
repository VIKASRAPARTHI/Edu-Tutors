import {
  BeakerIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import useAppearanceStore from "../data/appearanceStore";
import useUserStore from "../data/userStore";

const TopBar = ({ currentView, setCurrentView, toggleSidePanel }) => {
  const isNightMode = useAppearanceStore((state) => state.isNightMode);
  const toggleAppearance = useAppearanceStore((state) => state.toggleAppearance);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isNightMode
          ? "bg-gray-900/90 border-b border-gray-800"
          : "bg-white/90 border-b border-gray-200"
      } backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidePanel}
            className="md:hidden p-2 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
          >
            <Bars3Icon className="h-6 w-6 text-teal-500" />
          </button>
          {/* Logo */}
          <button
            onClick={() => setCurrentView("chat")}
            className="flex items-center space-x-2"
          >
            <BeakerIcon
              className={`h-8 w-8 ${
                isNightMode ? "text-teal-400" : "text-teal-600"
              }`}
            />
            <span
              className={`text-2xl font-bold ${
                isNightMode
                  ? "bg-gradient-to-r from-teal-400 to-emerald-400"
                  : "bg-gradient-to-r from-teal-600 to-emerald-600"
              } text-transparent bg-clip-text`}
            >
              EduTutor
            </span>
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentView("subjects")}
              className={`${
                isNightMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors ${
                currentView === "subjects"
                  ? "font-bold border-b-2 border-violet-500 pb-1"
                  : ""
              }`}
            >
              Subjects
            </button>
            <button
              onClick={() => setCurrentView("resources")}
              className={`${
                isNightMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors ${
                currentView === "resources"
                  ? "font-bold border-b-2 border-violet-500 pb-1"
                  : ""
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setCurrentView("progress")}
              className={`${
                isNightMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors ${
                currentView === "progress"
                  ? "font-bold border-b-2 border-violet-500 pb-1"
                  : ""
              }`}
            >
              My Progress
            </button>
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleAppearance}
              className={`p-2 rounded-full transition-colors ${
                isNightMode
                  ? "hover:bg-gray-800 text-violet-400"
                  : "hover:bg-gray-100 text-violet-600"
              }`}
              aria-label="Toggle theme"
              title={
                isNightMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isNightMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setCurrentView("settings")}
              className={`p-2 rounded-full ${
                isNightMode
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              } ${
                currentView === "settings"
                  ? "bg-gray-800 text-violet-400"
                  : ""
              }`}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentView("profile")}
              className={`p-2 rounded-full ${
                isNightMode
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              } ${
                currentView === "profile" ? "bg-gray-800 text-violet-400" : ""
              }`}
            >
              <UserCircleIcon className="h-5 w-5" />
            </button>
            <button
              onClick={logout}
              className={`flex items-center px-3 py-2 rounded-full ${
                isNightMode
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              }`}
            >
              <ArrowLeftStartOnRectangleIcon className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleAppearance}
              className={`p-2 rounded-full transition-colors ${isNightMode ? "text-teal-400" : "text-teal-600"}`}
              aria-label="Toggle theme"
            >
              {isNightMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full ${isNightMode ? "text-teal-400" : "text-teal-600"}`}
            >
              {mobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            className={`absolute top-16 left-0 right-0 z-50 shadow-lg ${isNightMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-t md:hidden`}
          >
            <div className="px-4 py-3 space-y-3">
              <button
                onClick={() => {
                  setCurrentView("subjects");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${isNightMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} ${currentView === "subjects" ? "bg-teal-100 text-teal-800" : ""}`}
              >
                Subjects
              </button>
              <button
                onClick={() => {
                  setCurrentView("resources");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${isNightMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} ${currentView === "resources" ? "bg-teal-100 text-teal-800" : ""}`}
              >
                Resources
              </button>
              <button
                onClick={() => {
                  setCurrentView("progress");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${isNightMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} ${currentView === "progress" ? "bg-teal-100 text-teal-800" : ""}`}
              >
                My Progress
              </button>
              <button
                onClick={() => {
                  setCurrentView("settings");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${isNightMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} ${currentView === "settings" ? "bg-teal-100 text-teal-800" : ""}`}
              >
                Settings
              </button>
              <button
                onClick={() => {
                  setCurrentView("profile");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${isNightMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} ${currentView === "profile" ? "bg-teal-100 text-teal-800" : ""}`}
              >
                Profile
              </button>
              <button
                onClick={logout}
                className={`block w-full text-left px-3 py-2 rounded-md ${isNightMode ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-teal-500 hover:bg-teal-600 text-white"}`}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
