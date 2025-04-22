import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useMessageStore = create(
  persist(
    (set, get) => ({
      messageList: [],
      conversationSessions: [],
      activeSessionId: null,
      isLoading: false,

      // Ensure loading state is managed correctly
      setIsLoading: (status) => {
        // Add safeguards to prevent incorrect state
        if (typeof status === 'boolean') {
          set({ isLoading: status });
        } else {
          console.error("setIsLoading received non-boolean value:", status);
          set({ isLoading: false }); // Safe fallback
        }
      },

      createNewConversation: () => {
        // Array of interesting topic names for new conversations
        const topicNames = [
          "Algebra Discussion",
          "Physics Concepts",
          "Literature Analysis",
          "History Timeline",
          "Chemistry Formulas",
          "Language Learning",
          "Biology Exploration",
          "Geometry Problems",
          "Computer Science",
          "Art Appreciation"
        ];

        // Pick a random topic name or use a default with counter if we run out of names
        const sessionCount = get().conversationSessions.length;
        const name = sessionCount < topicNames.length
          ? topicNames[sessionCount]
          : `Study Session ${sessionCount + 1}`;

        const newSession = {
          id: Date.now().toString(),
          name: name,
          messageList: []
        };
        set(state => ({
          conversationSessions: [...state.conversationSessions, newSession],
          activeSessionId: newSession.id,
          messageList: [],
          isLoading: false // Reset loading state when creating a new session
        }));
        return newSession.id;
      },

      renameConversation: (sessionId, newName) => {
        set(state => ({
          conversationSessions: state.conversationSessions.map(session =>
            session.id === sessionId
              ? { ...session, name: newName }
              : session
          )
        }));
      },

      switchConversation: (sessionId) => {
        const session = get().conversationSessions.find(s => s.id === sessionId);
        if (session) {
          set({
            activeSessionId: sessionId,
            messageList: session.messageList
          });
        }
      },

      addNewMessage: (message) => {
        const activeSessionId = get().activeSessionId;
        const messageWithTimestamp = {
          ...message,
          timestamp: new Date().toISOString()
        };

        if (!activeSessionId) {
          const newSessionId = get().createNewConversation();
          set(state => ({
            messageList: [messageWithTimestamp],
            conversationSessions: state.conversationSessions.map(session =>
              session.id === newSessionId
                ? { ...session, messageList: [messageWithTimestamp] }
                : session
            )
          }));
        } else {
          set(state => {
            const newMessages = [...state.messageList, messageWithTimestamp];
            return {
              messageList: newMessages,
              conversationSessions: state.conversationSessions.map(session =>
                session.id === activeSessionId
                  ? { ...session, messageList: newMessages }
                  : session
              )
            };
          });
        }
      },

      clearActiveConversation: () => {
        const activeSessionId = get().activeSessionId;
        if (activeSessionId) {
          set(state => ({
            messageList: [],
            conversationSessions: state.conversationSessions.map(session =>
              session.id === activeSessionId
                ? { ...session, messageList: [] }
                : session
            )
          }));
        }
      },

      deleteConversation: (sessionId) => {
        set(state => {
          const newSessions = state.conversationSessions.filter(s => s.id !== sessionId);
          const newActiveId = sessionId === state.activeSessionId
            ? newSessions[0]?.id || null
            : state.activeSessionId;

          return {
            conversationSessions: newSessions,
            activeSessionId: newActiveId,
            messageList: newActiveId
              ? newSessions.find(s => s.id === newActiveId)?.messageList || []
              : []
          };
        });
      },

      // Add a reset loading method for emergency use
      resetIsLoading: () => {
        set({ isLoading: false });
      }
    }),
    {
      name: 'message-storage',
    }
  )
)

export default useMessageStore
