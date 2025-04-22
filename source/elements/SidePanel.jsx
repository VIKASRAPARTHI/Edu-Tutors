import {
  BookOpenIcon,
  BeakerIcon,
  AcademicCapIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import useMessageStore from "../data/messageStore";
import useAppearanceStore from "../data/appearanceStore";

const SidePanel = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);
  const isNightMode = useAppearanceStore((state) => state.isNightMode);
  const {
    conversationSessions,
    activeSessionId,
    createNewConversation: originalCreateNewSession,
    switchConversation,
    deleteConversation,
  } = useMessageStore();

  // Wrap createNewConversation to add animation
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
    deleteConversation(sessionId);
  };

  const getLastMessage = (messageList) => {
    if (!messageList || messageList.length === 0) return "No messages";
    const lastMsg = messageList[messageList.length - 1];
    const content =
      lastMsg.content.slice(0, 30) + (lastMsg.content.length > 30 ? "..." : "");
    return content;
  };

  // Handle clicks outside the panel to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={panelRef}
      className={`fixed md:static h-full flex flex-col p-0 shadow-xl rounded-none backdrop-blur-sm custom-scrollbar transition-all duration-300 z-40 ${
        isNightMode
          ? "bg-gray-900/95 text-gray-100 border-r border-gray-800"
          : "bg-white/95 text-gray-900 border-r border-gray-100"
      } ${
        isOpen ? "w-[280px] left-0" : "w-0 -left-[280px] overflow-hidden"
      } md:w-80 md:left-0 md:overflow-visible`}
    >
        {/* Header */}
        <div
          className={`p-5 ${
            isNightMode
              ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800"
              : "bg-gradient-to-r from-teal-50 via-white to-emerald-50 border-b border-gray-200"
          }`}
        >
          <button
            className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg shadow-md ${
              isNightMode
                ? "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white"
                : "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white"
            } transition-all transform hover:shadow-lg active:scale-[0.98]`}
            onClick={createNewSession}
          >
            <AcademicCapIcon className="h-4 w-4" />
            New Learning Session
          </button>
        </div>

        {/* Chat List */}
        <div
          className={`overflow-y-auto p-4 flex-1 custom-scrollbar ${
            isNightMode ? "text-gray-300" : "text-gray-700"
          }`}
          style={{ maxHeight: "calc(100% - 180px)" }}
        >
          <h3
            className={`text-xs uppercase font-semibold mb-3 px-2 ${
              isNightMode ? "text-teal-400" : "text-teal-600"
            }`}
          >
            Learning Sessions
          </h3>
          {conversationSessions.map((session) => (
            <div
              key={session.id}
              data-session-id={session.id}
              onClick={() => switchConversation(session.id)}
              className={`group mb-3 p-3 cursor-pointer transition-all duration-200 rounded-xl ${
                isNightMode ? "hover:bg-gray-800/70" : "hover:bg-gray-100/70"
              } ${
                activeSessionId === session.id
                  ? isNightMode
                    ? "bg-gray-800 border border-gray-700 shadow-md"
                    : "bg-white border border-gray-200 shadow-md"
                  : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`p-2 rounded-lg ${
                      isNightMode
                        ? activeSessionId === session.id
                          ? "bg-teal-900/50 text-teal-300"
                          : "bg-gray-800 text-gray-400"
                        : activeSessionId === session.id
                        ? "bg-teal-100 text-teal-600"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <BookOpenIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium truncate ${
                        activeSessionId === session.id
                          ? isNightMode
                            ? "text-teal-300"
                            : "text-teal-700"
                          : ""
                      }`}
                    >
                      {session.name}
                    </p>
                    <p
                      className={`text-sm truncate ${
                        isNightMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {getLastMessage(session.messageList)}
                    </p>
                  </div>
                </div>
                <div
                  className={`opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <button
                    className={`p-1.5 rounded-full ${
                      isNightMode
                        ? "hover:bg-gray-700 text-gray-400 hover:text-teal-400"
                        : "hover:bg-gray-200 text-gray-400 hover:text-teal-500"
                    } transition-colors`}
                    onClick={(e) => handleDelete(e, session.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {conversationSessions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 p-6">
              <div
                className={`p-3 rounded-full mb-3 ${
                  isNightMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <BeakerIcon
                  className={`h-6 w-6 ${
                    isNightMode ? "text-teal-400" : "text-teal-500"
                  }`}
                />
              </div>
              <p
                className={`text-center font-medium mb-1 ${
                  isNightMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                No learning sessions yet
              </p>
              <p
                className={`text-center text-sm ${
                  isNightMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Start a new session to begin studying
              </p>
            </div>
          )}
        </div>
    </div>
  );
};

export default SidePanel;
