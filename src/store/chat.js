// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,

      createChat: (title = "New Chat") => {
        const newChat = {
          id: crypto.randomUUID(),
          messages: [],
          createdAt: Date.now(),
          title,
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));
      },

      addMessage: (messageData) => {
        const state = get();
        if (!state.currentChatId) return;
        const message = {
          id: crypto.randomUUID(),
          timeStamp: Date.now(),
          type: "user",
          ...messageData,
        };
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === state.currentChatId
              ? { ...chat, messages: [...chat.messages, message] }
              : chat
          ),
        }));
      },

      removeMessage: (messageId) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === state.currentChatId
              ? {
                  ...chat,
                  messages: chat.messages.filter((msg) => msg.id !== messageId),
                }
              : chat
          ),
        }));
      },

      deleteChat: (chatId) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          currentChatId:
            state.currentChatId === chatId
              ? state.chats[0]?.id ?? null
              : state.currentChatId,
        }));
      },

      setCurrentChat: (chatId) => {
        set({ currentChatId: chatId });
      },

      getCurrentChat: () => {
        const { chats, currentChatId } = get();
        return chats.find((chat) => chat.id === currentChatId);
      },

      getGroupedChats: () => {
        const { chats } = get();
        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0)).getTime();
        const yesterdayStart = todayStart - 86400000;

        return {
          today: chats.filter((chat) => chat.createdAt >= todayStart),
          yesterday: chats.filter(
            (chat) =>
              chat.createdAt >= yesterdayStart && chat.createdAt < todayStart
          ),
          previous: chats.filter((chat) => chat.createdAt < yesterdayStart),
        };
      },
    }),
    {
      name: "textsage-store",
      partialize: (state) => ({
        ...state,
        chats: state.chats.map((chat) => ({
          ...chat,
          messages: chat.messages.filter((msg) => msg.type !== "loading"),
        })),
      }),
    }
  )
);

// interface Message {
//   id: string;
//   content: string;
//   detectedLang: string;
//   translation?: {
//     targetLang: string,
//     translatedText: string,
//   };
//   summary?: string;
//   createdAt: Date;
// }

// interface ChatMessage {
//   id: string;
//   text: string;
//   sourceLanguage: string;
//   targetLanguage?: string;
//   translatedText?: string;
//   summary?: string;
//   timestamp: number;
//   isSummarized: boolean;
//   isTranslated: boolean;
// }
