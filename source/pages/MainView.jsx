import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import MessageInterface from "../elements/MessageInterface";
import TopBar from "../elements/TopBar";
import UserProfile from "../elements/UserProfile";
import SidePanel from "../elements/SidePanel";
import useAppearanceStore from "../data/appearanceStore";

function MainView({ currentView, setCurrentView }) {
  const isNightMode = useAppearanceStore((state) => state.isNightMode);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Close side panel when view changes on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsSidePanelOpen(true); // Always open on desktop
      } else {
        setIsSidePanelOpen(false); // Closed by default on mobile
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close side panel when view changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidePanelOpen(false);
    }
  }, [currentView]);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  // Function to render the appropriate content based on currentView
  const displayContent = () => {
    switch (currentView) {
      case "chat":
        return <MessageInterface />;
      case "profile":
        return <UserProfile />;
      case "subjects":
        return (
          <div
            className={`flex-1 p-8 overflow-y-auto custom-scrollbar ${
              isNightMode ? "text-white" : "text-gray-800"
            }`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-6">
                <AcademicCapIcon
                  className={`h-8 w-8 mr-3 ${
                    isNightMode ? "text-violet-400" : "text-violet-600"
                  }`}
                />
                <h1 className="text-3xl font-bold">Subjects</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {/* Math Card */}
                <div
                  className={`rounded-xl shadow-lg overflow-hidden ${
                    isNightMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                    <span className="text-4xl text-white">π</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">Mathematics</h3>
                    <p
                      className={`text-sm mb-4 ${
                        isNightMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Algebra, Calculus, Geometry, and more
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs font-medium ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        12 lessons
                      </span>
                      <button
                        className={`px-3 py-1 rounded-full text-sm ${
                          isNightMode
                            ? "bg-violet-600 hover:bg-violet-700 text-white"
                            : "bg-violet-500 hover:bg-violet-600 text-white"
                        }`}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>

                {/* Science Card */}
                <div
                  className={`rounded-xl shadow-lg overflow-hidden ${
                    isNightMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center">
                    <span className="text-4xl text-white">⚗️</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">Science</h3>
                    <p
                      className={`text-sm mb-4 ${
                        isNightMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Physics, Chemistry, Biology, and more
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs font-medium ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        15 lessons
                      </span>
                      <button
                        className={`px-3 py-1 rounded-full text-sm ${
                          isNightMode
                            ? "bg-violet-600 hover:bg-violet-700 text-white"
                            : "bg-violet-500 hover:bg-violet-600 text-white"
                        }`}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>

                {/* Language Card */}
                <div
                  className={`rounded-xl shadow-lg overflow-hidden ${
                    isNightMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-400 flex items-center justify-center">
                    <span className="text-4xl text-white">🔤</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">Languages</h3>
                    <p
                      className={`text-sm mb-4 ${
                        isNightMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      English, Spanish, French, and more
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs font-medium ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        10 lessons
                      </span>
                      <button
                        className={`px-3 py-1 rounded-full text-sm ${
                          isNightMode
                            ? "bg-violet-600 hover:bg-violet-700 text-white"
                            : "bg-violet-500 hover:bg-violet-600 text-white"
                        }`}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "resources":
        return (
          <div
            className={`flex-1 p-8 overflow-y-auto custom-scrollbar ${
              isNightMode ? "text-white" : "text-gray-800"
            }`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-6">
                <BookOpenIcon
                  className={`h-8 w-8 mr-3 ${
                    isNightMode ? "text-violet-400" : "text-violet-600"
                  }`}
                />
                <h1 className="text-3xl font-bold">Learning Resources</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* E-Books Section */}
                <div
                  className={`p-6 rounded-xl ${
                    isNightMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  <h2 className="text-xl font-bold mb-4">E-Books</h2>
                  <ul className="space-y-3">
                    <li
                      className={`p-3 rounded-lg ${
                        isNightMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-50 hover:bg-gray-100"
                      } transition cursor-pointer`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">
                          Advanced Mathematics
                        </span>
                        <span
                          className={`text-xs ${
                            isNightMode ? "text-violet-300" : "text-violet-600"
                          }`}
                        >
                          PDF
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Comprehensive guide to advanced math concepts
                      </p>
                    </li>
                    <li
                      className={`p-3 rounded-lg ${
                        isNightMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-50 hover:bg-gray-100"
                      } transition cursor-pointer`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">
                          Physics Fundamentals
                        </span>
                        <span
                          className={`text-xs ${
                            isNightMode ? "text-violet-300" : "text-violet-600"
                          }`}
                        >
                          PDF
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Essential physics concepts explained
                      </p>
                    </li>
                    <li
                      className={`p-3 rounded-lg ${
                        isNightMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-50 hover:bg-gray-100"
                      } transition cursor-pointer`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">English Grammar</span>
                        <span
                          className={`text-xs ${
                            isNightMode ? "text-violet-300" : "text-violet-600"
                          }`}
                        >
                          PDF
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Complete guide to English grammar rules
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Video Tutorials */}
                <div
                  className={`p-6 rounded-xl ${
                    isNightMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  <h2 className="text-xl font-bold mb-4">Video Tutorials</h2>
                  <ul className="space-y-3">
                    <li
                      className={`p-3 rounded-lg ${
                        isNightMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-50 hover:bg-gray-100"
                      } transition cursor-pointer`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">Calculus Made Easy</span>
                        <span
                          className={`text-xs ${
                            isNightMode ? "text-violet-300" : "text-violet-600"
                          }`}
                        >
                          Video
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Step-by-step calculus tutorials
                      </p>
                    </li>
                    <li
                      className={`p-3 rounded-lg ${
                        isNightMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-50 hover:bg-gray-100"
                      } transition cursor-pointer`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">
                          Chemistry Lab Techniques
                        </span>
                        <span
                          className={`text-xs ${
                            isNightMode ? "text-violet-300" : "text-violet-600"
                          }`}
                        >
                          Video
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Visual guide to common lab procedures
                      </p>
                    </li>
                    <li
                      className={`p-3 rounded-lg ${
                        isNightMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-50 hover:bg-gray-100"
                      } transition cursor-pointer`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">
                          Spanish Conversation
                        </span>
                        <span
                          className={`text-xs ${
                            isNightMode ? "text-violet-300" : "text-violet-600"
                          }`}
                        >
                          Video
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          isNightMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Practice Spanish with native speakers
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case "progress":
        return (
          <div
            className={`flex-1 p-8 overflow-y-auto custom-scrollbar ${
              isNightMode ? "text-white" : "text-gray-800"
            }`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-6">
                <ChartBarIcon
                  className={`h-8 w-8 mr-3 ${
                    isNightMode ? "text-violet-400" : "text-violet-600"
                  }`}
                />
                <h1 className="text-3xl font-bold">My Progress</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Overall Progress Card */}
                <div
                  className={`p-6 rounded-xl ${
                    isNightMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  <h3 className="text-lg font-medium mb-2">Overall Progress</h3>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">78%</span>
                    <span
                      className={`ml-2 text-sm ${
                        isNightMode ? "text-green-400" : "text-green-500"
                      }`}
                    >
                      +12% this month
                    </span>
                  </div>
                  <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                {/* Completed Lessons Card */}
                <div
                  className={`p-6 rounded-xl ${
                    isNightMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  <h3 className="text-lg font-medium mb-2">
                    Completed Lessons
                  </h3>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">24</span>
                    <span className="ml-2 text-sm text-gray-500">
                      / 37 total
                    </span>
                  </div>
                  <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                {/* Study Time Card */}
                <div
                  className={`p-6 rounded-xl ${
                    isNightMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  <h3 className="text-lg font-medium mb-2">Study Time</h3>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">18.5</span>
                    <span className="ml-2 text-sm text-gray-500">
                      hours this week
                    </span>
                  </div>
                  <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Subject Progress */}
              <div
                className={`p-6 rounded-xl ${
                  isNightMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                } shadow-lg mb-8`}
              >
                <h3 className="text-xl font-bold mb-4">Subject Progress</h3>

                <div className="space-y-4">
                  {/* Math Progress */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Mathematics</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Science Progress */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Science</span>
                      <span>72%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Language Progress */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Languages</span>
                      <span>60%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div
            className={`flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar h-full ${
              isNightMode ? "text-white" : "text-gray-800"
            }`}
          >
            <div className="max-w-3xl mx-auto pb-6">
              <div className="flex items-center mb-6">
                <Cog6ToothIcon
                  className={`h-8 w-8 mr-3 ${
                    isNightMode ? "text-violet-400" : "text-violet-600"
                  }`}
                />
                <h1 className="text-3xl font-bold">Settings</h1>
              </div>

              <div
                className={`p-4 rounded-xl ${
                  isNightMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                } shadow-lg mb-4`}
              >
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Notifications
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <span className="ml-2">Receive email notifications</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Language
                    </label>
                    <select
                      className={`w-full px-4 py-2 rounded-lg ${
                        isNightMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      } border`}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Time Zone
                    </label>
                    <select
                      className={`w-full px-4 py-2 rounded-lg ${
                        isNightMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      } border`}
                    >
                      <option>UTC-8:00 (Pacific Time)</option>
                      <option>UTC-5:00 (Eastern Time)</option>
                      <option>UTC+0:00 (GMT)</option>
                      <option>UTC+1:00 (Central European Time)</option>
                      <option>UTC+5:30 (Indian Standard Time)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl ${
                  isNightMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                } shadow-lg`}
              >
                <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Data Sharing
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                      />
                      <span className="ml-2">
                        Share my learning data to improve the platform
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Session History
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <span className="ml-2">Save chat history</span>
                    </div>
                  </div>

                  <button
                    className={`mt-4 px-4 py-2 rounded-lg ${
                      isNightMode
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    Clear All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <MessageInterface />;
    }
  };

  return (
    <div
      className={`flex h-screen ${isNightMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <TopBar
        currentView={currentView}
        setCurrentView={setCurrentView}
        toggleSidePanel={toggleSidePanel}
      />
      {/* Overlay for mobile when side panel is open */}
      {isSidePanelOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidePanelOpen(false)}
        />
      )}
      <div className="flex w-full h-[calc(100%-4rem)] mt-16 relative">
        {currentView === "chat" && (
          <SidePanel
            isOpen={isSidePanelOpen}
            onClose={() => setIsSidePanelOpen(false)}
          />
        )}
        <div className="flex-1 overflow-auto">{displayContent()}</div>
      </div>
    </div>
  );
}

export default MainView;
