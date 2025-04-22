import React, { useState } from "react";
import { BeakerIcon } from "@heroicons/react/24/solid";
import useAppearanceStore from "../data/appearanceStore";
import useUserStore from "../data/userStore";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const isNightMode = useAppearanceStore((state) => state.isNightMode);
  const login = useUserStore((state) => state.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process login
      login({
        name: formData.name,
        email: formData.email,
        joinedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isNightMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`max-w-md w-full p-8 rounded-xl shadow-xl ${
          isNightMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-100"
        }`}
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <BeakerIcon
              className={`h-10 w-10 mr-2 ${
                isNightMode ? "text-teal-400" : "text-teal-600"
              }`}
            />
            <span
              className={`text-3xl font-bold ${
                isNightMode
                  ? "bg-gradient-to-r from-teal-400 to-emerald-400"
                  : "bg-gradient-to-r from-teal-600 to-emerald-600"
              } text-transparent bg-clip-text`}
            >
              EduLab
            </span>
          </div>
        </div>

        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            isNightMode ? "text-white" : "text-gray-800"
          }`}
        >
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-2 ${
                isNightMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : isNightMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-teal-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-teal-500"
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${
                isNightMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : isNightMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-teal-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-teal-500"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg shadow-md ${
              isNightMode
                ? "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white"
                : "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white"
            } transition-all transform hover:shadow-lg active:scale-[0.98]`}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
