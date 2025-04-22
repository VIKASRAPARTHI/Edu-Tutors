import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      chatSessions: [],
      currentSessionId: null,
      loading: false,
      
      // Ensure loading state is managed correctly
      setLoading: (status) => {
        // Add safeguards to prevent incorrect state
        if (typeof status === 'boolean') {
          set({ loading: status });
        } else {
          console.error("setLoading received non-boolean value:", status);
          set({ loading: false }); // Safe fallback
        }
      },
      
      createNewSession: () => {
        const newSession = {
          id: Date.now().toString(),
          name: `Chat ${get().chatSessions.length + 1}`,
          messages: []
        };
        set(state => ({
          chatSessions: [...state.chatSessions, newSession],
          currentSessionId: newSession.id,
          messages: [],
          loading: false // Reset loading state when creating a new session
        }));
        return newSession.id;
      },

      renameSession: (sessionId, newName) => {
        set(state => ({
          chatSessions: state.chatSessions.map(session =>
            session.id === sessionId
              ? { ...session, name: newName }
              : session
          )
        }));
      },

      switchSession: (sessionId) => {
        const session = get().chatSessions.find(s => s.id === sessionId);
        if (session) {
          set({
            currentSessionId: sessionId,
            messages: session.messages
          });
        }
      },

      addMessage: (message) => {
        const currentSessionId = get().currentSessionId;
        const messageWithTimestamp = {
          ...message,
          timestamp: new Date().toISOString()
        };

        if (!currentSessionId) {
          const newSessionId = get().createNewSession();
          set(state => ({
            messages: [messageWithTimestamp],
            chatSessions: state.chatSessions.map(session =>
              session.id === newSessionId
                ? { ...session, messages: [messageWithTimestamp] }
                : session
            )
          }));
        } else {
          set(state => {
            const newMessages = [...state.messages, messageWithTimestamp];
            return {
              messages: newMessages,
              chatSessions: state.chatSessions.map(session =>
                session.id === currentSessionId
                  ? { ...session, messages: newMessages }
                  : session
              )
            };
          });
        }
      },

      clearCurrentSession: () => {
        const currentSessionId = get().currentSessionId;
        if (currentSessionId) {
          set(state => ({
            messages: [],
            chatSessions: state.chatSessions.map(session =>
              session.id === currentSessionId
                ? { ...session, messages: [] }
                : session
            )
          }));
        }
      },

      deleteSession: (sessionId) => {
        set(state => {
          const newSessions = state.chatSessions.filter(s => s.id !== sessionId);
          const newCurrentId = sessionId === state.currentSessionId
            ? newSessions[0]?.id || null
            : state.currentSessionId;
          
          return {
            chatSessions: newSessions,
            currentSessionId: newCurrentId,
            messages: newCurrentId 
              ? newSessions.find(s => s.id === newCurrentId)?.messages || []
              : []
          };
        });
      },

      // Add a reset loading method for emergency use
      resetLoading: () => {
        set({ loading: false });
      }
    }),
    {
      name: 'chat-storage',
    }
  )
)

export default useChatStore