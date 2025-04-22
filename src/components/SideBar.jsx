import {
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import useChatStore from "../store/chatStore";
import useThemeStore from "../store/themeStore";

const Sidebar = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const {
    chatSessions,
    currentSessionId,
    createNewSession: originalCreateNewSession,
    switchSession,
    deleteSession,
  } = useChatStore();

  // Wrap createNewSession to add animation
  const createNewSession = () => {
    // Create the session first
    const sessionId = originalCreateNewSession();

    // Add slide-in animation class to the new session element
    setTimeout(() => {
      const newSessionElement = document.querySelector(
        `[data-session-id="${sessionId}"]`
      );
      if (newSessionElement) {
        newSessionElement.classList.add("slide-in-from-left");
      }
    }, 10);

    return sessionId;
  };

  const handleDelete = (e, sessionId) => {
    e.stopPropagation();
    setSessionToDelete(sessionId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      deleteSession(sessionToDelete);
    }
    setShowDeleteDialog(false);
    setSessionToDelete(null);
  };

  const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return "No messages";
    const lastMsg = messages[messages.length - 1];
    const content =
      lastMsg.content.slice(0, 30) + (lastMsg.content.length > 30 ? "..." : "");
    return content;
  };

  return (
    <>
      <div
        className={`h-full w-80 flex flex-col p-0 shadow-xl rounded-none backdrop-blur-sm custom-scrollbar ${
          isDarkMode
            ? "bg-gray-900/95 text-gray-100 border-r border-gray-800"
            : "bg-white/95 text-gray-900 border-r border-gray-100"
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800"
              : "bg-gradient-to-r from-violet-50 via-white to-indigo-50 border-b border-gray-200"
          }`}
        >
          <button
            className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg shadow-md ${
              isDarkMode
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
                : "bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white"
            } transition-all transform hover:shadow-lg active:scale-[0.98]`}
            onClick={createNewSession}
          >
            <SparklesIcon className="h-4 w-4" />
            New Conversation
          </button>
        </div>

        {/* Chat List */}
        <div
          className={`overflow-y-auto p-4 flex-1 custom-scrollbar ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
          style={{ maxHeight: "calc(100% - 180px)" }}
        >
          <h3
            className={`text-xs uppercase font-semibold mb-3 px-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Conversations
          </h3>
          {chatSessions.map((session) => (
            <div
              key={session.id}
              data-session-id={session.id}
              onClick={() => switchSession(session.id)}
              className={`group mb-3 p-3 cursor-pointer transition-all duration-200 rounded-xl ${
                isDarkMode ? "hover:bg-gray-800/70" : "hover:bg-gray-100/70"
              } ${
                currentSessionId === session.id
                  ? isDarkMode
                    ? "bg-gray-800 border border-gray-700 shadow-md"
                    : "bg-white border border-gray-200 shadow-md"
                  : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? currentSessionId === session.id
                          ? "bg-violet-900/50 text-violet-300"
                          : "bg-gray-800 text-gray-400"
                        : currentSessionId === session.id
                        ? "bg-violet-100 text-violet-600"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium truncate ${
                        currentSessionId === session.id
                          ? isDarkMode
                            ? "text-violet-300"
                            : "text-violet-700"
                          : ""
                      }`}
                    >
                      {session.name}
                    </p>
                    <p
                      className={`text-sm truncate ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {getLastMessage(session.messages)}
                    </p>
                  </div>
                </div>
                <div
                  className={`opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <button
                    className={`p-1.5 rounded-full ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-400 hover:text-red-400"
                        : "hover:bg-gray-200 text-gray-400 hover:text-red-500"
                    } transition-colors`}
                    onClick={(e) => handleDelete(e, session.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {chatSessions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 p-6">
              <div
                className={`p-3 rounded-full mb-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p
                className={`text-center font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                No conversations yet
              </p>
              <p
                className={`text-center text-sm ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Start a new conversation to begin learning
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-xl shadow-xl max-w-sm w-full ${
              isDarkMode
                ? "bg-gray-900/95 border border-gray-800"
                : "bg-white/95 border border-gray-200"
            } backdrop-blur-sm`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`p-2 rounded-full mr-3 ${
                  isDarkMode ? "bg-red-900/30" : "bg-red-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-red-500" : "text-red-600"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Delete Conversation
              </h3>
            </div>
            <p
              className={
                isDarkMode ? "text-gray-400 mb-6" : "text-gray-600 mb-6"
              }
            >
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={`px-4 py-2 rounded-lg font-medium bg-gradient-to-r ${
                  isDarkMode
                    ? "from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
                    : "from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
                } text-white transition-colors shadow-md hover:shadow-lg`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
