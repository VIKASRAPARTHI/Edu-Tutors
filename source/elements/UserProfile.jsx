import React from "react";
import useAppearanceStore from "../data/appearanceStore";

const UserProfile = () => {
  const isNightMode = useAppearanceStore((state) => state.isNightMode);

  return (
    <div
      className={`flex-1 p-6 ${isNightMode ? "text-gray-100" : "text-gray-900"}`}
    >
      <div className="max-w-4xl mx-auto p-6">
        <h1
          className={`text-3xl font-bold mb-8 ${
            isNightMode
              ? "bg-gradient-to-r from-violet-400 to-indigo-400"
              : "bg-gradient-to-r from-violet-600 to-indigo-600"
          } text-transparent bg-clip-text`}
        >
          Profile Settings
        </h1>

        <div
          className={`rounded-xl p-6 ${
            isNightMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-gray-300"></div>
              <button
                className={`px-4 py-2 rounded-lg ${
                  isNightMode
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "bg-violet-500 hover:bg-violet-600"
                } text-white`}
              >
                Change Photo
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 rounded-lg ${
                    isNightMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } border`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 rounded-lg ${
                    isNightMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } border`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Learning Preferences
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-lg ${
                    isNightMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } border`}
                >
                  <option>Visual Learning</option>
                  <option>Auditory Learning</option>
                  <option>Reading/Writing</option>
                  <option>Kinesthetic Learning</option>
                </select>
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-lg ${
                isNightMode
                  ? "bg-violet-600 hover:bg-violet-700"
                  : "bg-violet-500 hover:bg-violet-600"
              } text-white font-medium`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
