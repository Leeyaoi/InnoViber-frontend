/* eslint-disable react-hooks/rules-of-hooks */
import { StateCreator } from "zustand";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import MessageType from "../shared/types/MessageType";
import { sliceResetFns, useGlobalStore } from "./GlobalStore";
import PaginatedModel from "../shared/types/PaginatedModel";
import { MessageStatus } from "../shared/types/MessageStatus";

export interface MessageSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  messages: MessageType[];
  messagesPage: number;
  messagesCount: number;
  messagesTotal: number;
  resetMessages: () => void;
  fetchMessages: (chatId: string) => void;
  createMessage: (chatId: string, userId: string, text: string) => void;
  deleteMessage: (id: string) => void;
  getMoreMessages: (chatId: string) => void;

  getFirstMessagePage: (chatId: string) => void;
}

const InitialMessageSlice = {
  loading: false,
  success: false,
  errorMessage: "",
  messages: [],
  messagesPage: 1,
  messagesCount: 1,
  messagesTotal: 0,
};

export const MessageStore: StateCreator<MessageSlice> = (set, get) => {
  sliceResetFns.add(() => {
    set(InitialMessageSlice);
  });
  return {
    ...InitialMessageSlice,

    resetMessages: () => {
      set(InitialMessageSlice);
    },

    getMoreMessages: async (chatId: string) => {
      if (get().messagesPage == get().messagesCount) {
        return;
      }
      const page = get().messagesPage + 1;
      set({ loading: true });
      const res = await HttpRequest<PaginatedModel<MessageType>>({
        uri: `/Message/Chat/${chatId}?page=${page}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false, messages: [] });
      } else {
        if (res.data.total > get().messagesTotal) {
          let num = res.data.total - get().messagesTotal;
          while (num--) {
            res.data.items.pop();
          }
        }
        if (!get().messages.includes(res.data.items[0])) {
          set({
            success: true,
            messages: [...res.data.items, ...get().messages],
            loading: false,
            messagesPage: res.data.page,
            messagesCount: res.data.count,
            messagesTotal: res.data.total,
          });
        } else {
          set({
            success: true,
            loading: false,
          });
        }
      }
    },

    fetchMessages: async (chatId: string) => {
      set({ loading: true });
      const res = await HttpRequest<PaginatedModel<MessageType>>({
        uri: `/Message/Chat/${chatId}?page=${get().messagesPage}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false, messages: [] });
      } else {
        set({
          success: true,
          messages: res.data.items,
          loading: false,
          messagesPage: res.data.page,
          messagesCount: res.data.count,
          messagesTotal: res.data.total,
        });
      }
    },

    createMessage: async (chatId: string, userId: string, text: string) => {
      set({
        messages: [
          ...get().messages,
          {
            chatId: chatId,
            userId: userId,
            text: text,
            status: MessageStatus.Send,
          } as MessageType,
        ],
      });
      const res = await HttpRequest<MessageType>({
        uri: "/Message",
        method: RESTMethod.Post,
        item: { chatId: chatId, userId: userId, text: text },
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message });
      } else {
        set({
          success: true,
          messages: [...get().messages, res.data],
        });
      }
    },

    deleteMessage: async (id: string) => {
      set({ loading: true });
      const res = await HttpRequest<MessageType>({
        uri: "/Message",
        method: RESTMethod.Delete,
        id: id,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        const { currentChatId } = useGlobalStore();
        get().fetchMessages(currentChatId);
      }
    },

    getFirstMessagePage: async (chatId: string) => {
      const res = await HttpRequest<PaginatedModel<MessageType>>({
        uri: `/Message/Chat/${chatId}?page=1`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false, messages: [] });
      } else {
        res.data.items.forEach((message) => {
          const index = get().messages.findIndex((m) => m.id == message.id);
          if (index > -1) {
            get().messages.splice(index, 1);
          }
        });
        if (!get().messages.includes(res.data.items[0])) {
          set({
            success: true,
            messages: [...get().messages, ...res.data.items],
            messagesPage: res.data.page,
            messagesCount: res.data.count,
            messagesTotal: res.data.total,
          });
        } else {
          set({
            success: true,
          });
        }
      }
    },
  };
};
