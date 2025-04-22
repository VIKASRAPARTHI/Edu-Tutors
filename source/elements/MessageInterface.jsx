import { CommandLineIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import axiosRetry from "axios-retry";
import React, { useEffect, useRef, useState } from "react";
import useMessageStore from "../data/messageStore";
import useAppearanceStore from "../data/appearanceStore";

// Configure axios retry
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error),
});

// Create a cancelable axios instance
const apiClient = axios.create();

const formatTimestamp = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const MessageBubble = ({ message, isNightMode }) => {
  const isUserMessage = message.role === "user";
  const timestamp = message.timestamp
    ? formatTimestamp(new Date(message.timestamp))
    : formatTimestamp(new Date());

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} group`}>
      <div className="flex flex-col max-w-[95%] md:max-w-[80%] gap-1">
        <div
          className={`p-2 md:p-3 rounded-xl shadow-sm text-sm md:text-base ${
            isUserMessage
              ? isNightMode
                ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-none"
                : "bg-gradient-to-br from-violet-500 to-indigo-500 text-white rounded-br-none"
              : isNightMode
              ? "bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700"
              : "bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <p
          className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
            isNightMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
};

const LoadingIndicator = ({ isNightMode }) => (
  <div className="flex justify-start">
    <div
      className={`p-3 rounded-lg ${
        isNightMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-100 shadow-sm"
      }`}
    >
      <div className="flex gap-2 items-center">
        <CommandLineIcon
          className={`h-4 w-4 ${
            isNightMode ? "text-violet-400" : "text-violet-500"
          }`}
        />
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                isNightMode ? "bg-violet-400" : "bg-violet-500"
              } animate-bounce`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MessageInterface = () => {
  const [userInput, setUserInput] = useState("");
  const messageListEndRef = useRef(null);
  const requestCancellerRef = useRef(null);
  const isNightMode = useAppearanceStore((state) => state.isNightMode);
  const {
    messageList,
    isLoading,
    setIsLoading,
    addNewMessage,
    activeSessionId,
    createNewConversation,
  } = useMessageStore();
  const [hasApiError, setHasApiError] = useState(false);

  // Create new session if none exists
  useEffect(() => {
    if (!activeSessionId) {
      createNewConversation();
    }

    // Clean up function
    return () => {
      // Cancel any pending requests
      if (requestCancellerRef.current) {
        requestCancellerRef.current.abort();
      }
      // Reset loading state
      setIsLoading(false);
    };
  }, [activeSessionId, createNewConversation, setIsLoading]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageListEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  // Debug logging for loading state
  useEffect(() => {
    console.log("Loading state:", isLoading);
  }, [isLoading]);

  const processSubmission = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    // Cancel previous request if exists
    if (requestCancellerRef.current) {
      requestCancellerRef.current.abort();
    }

    // Create new abort controller
    requestCancellerRef.current = new AbortController();

    // Add user message
    addNewMessage({ role: "user", content: userInput });
    setIsLoading(true);
    setUserInput("");
    setHasApiError(false);

    try {
      const res = await apiClient.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [...messageList, { role: "user", content: userInput }],
        },
        {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_OPENROUTER_API_KEY || ""
            }`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "LearnWise",
            "Content-Type": "application/json",
          },
          signal: requestCancellerRef.current.signal,
        }
      );

      // Check for valid response
      if (res.data && res.data.choices && res.data.choices.length > 0) {
        const aiResponse =
          res.data.choices[0].message?.content || "No response found.";
        addNewMessage({ role: "assistant", content: aiResponse });
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      // Only add error message if request wasn't cancelled
      if (!axios.isCancel(error)) {
        console.error("API Error:", error.message);
        setHasApiError(true);
        addNewMessage({
          role: "assistant",
          content:
            "Sorry, I encountered an error while processing your request. Please check your API key and try again.",
        });
      }
    } finally {
      // Reset loading state and controller
      setIsLoading(false);
      requestCancellerRef.current = null;
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col h-full ${
        isNightMode
          ? "bg-gray-900 bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gray-50 bg-gradient-to-br from-gray-50 to-white"
      }`}
    >
      {/* API Error Banner */}
      {hasApiError && (
        <div className="bg-red-500 text-white px-4 py-2 text-sm shadow-md">
          API error occurred. Please check your console and verify your API key
          is correct.
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-2 space-y-6 p-4 md:p-6 custom-scrollbar">
        {messageList.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div
              className="text-center max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-sm
              ${isNightMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-white/60 border border-gray-200'}"
            >
              <div className="mb-6 flex justify-center">
                <div
                  className={`p-5 rounded-full ${
                    isNightMode ? "bg-violet-900/30" : "bg-violet-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 ${
                      isNightMode ? "text-violet-400" : "text-violet-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isNightMode ? "text-white" : "text-gray-800"
                }`}
              >
                Welcome to Edu Tutor
              </h3>
              <p
                className={`mb-6 ${
                  isNightMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Your AI-powered learning assistant is ready to help with any
                questions you have.
              </p>
              <div
                className={`flex flex-col gap-2 text-left ${
                  isNightMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <p className="flex items-center">
                  <span className="mr-2 text-sm">•</span> Ask questions about
                  any subject
                </p>
                <p className="flex items-center">
                  <span className="mr-2 text-sm">•</span> Get help with homework
                </p>
                <p className="flex items-center">
                  <span className="mr-2 text-sm">•</span> Explore new topics and
                  concepts
                </p>
              </div>
            </div>
          </div>
        )}

        {messageList.map((message, index) => (
          <MessageBubble key={index} message={message} isNightMode={isNightMode} />
        ))}

        {isLoading && <LoadingIndicator isNightMode={isNightMode} />}

        <div ref={messageListEndRef} />
      </div>

      {/* Message Input Form */}
      <div
        className={`px-6 py-4 border-t mt-auto z-10 ${
          isNightMode
            ? "border-gray-800 bg-gray-900/95 backdrop-blur-md"
            : "border-gray-200 bg-white/95 backdrop-blur-md shadow-md"
        }`}
      >
        <form onSubmit={processSubmission} className="flex gap-2 md:gap-3 max-w-4xl mx-auto">
          <div className="flex-1 min-w-0 relative shadow-lg">
            <div
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isNightMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-2 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 14a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me anything about your studies..."
              className={`w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isNightMode
                  ? "bg-gray-800 text-gray-100 border-gray-700 focus:ring-violet-500 placeholder-gray-400"
                  : "bg-white text-gray-900 border-gray-200 focus:ring-violet-500 placeholder-gray-500"
              } text-base`}
            />
            {userInput.length > 0 && (
              <span
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-medium px-2 py-1 rounded-md ${
                  isNightMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-600"
                } transition-opacity`}
              >
                Press Enter ↵
              </span>
            )}
          </div>

          {/* Send Button */}
          <div className="relative group">
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className={`flex items-center justify-center p-3 md:p-4 rounded-xl w-12 h-12 md:w-14 md:h-14 transition-all transform active:scale-95 shadow-lg ${
                isLoading || !userInput.trim()
                  ? isNightMode
                    ? "bg-gray-700 cursor-not-allowed text-gray-500"
                    : "bg-gray-200 cursor-not-allowed text-gray-400"
                  : isNightMode
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
                  : "bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white"
              }`}
            >
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
              Send message
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInterface;
