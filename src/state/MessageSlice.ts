/* eslint-disable react-hooks/rules-of-hooks */
import { StateCreator } from "zustand";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import MessageType from "../shared/types/MessageType";
import { sliceResetFns, useGlobalStore } from "./GlobalStore";
import PaginatedModel from "../shared/types/PaginatedModel";

export interface MessageSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  messages: MessageType[];
  limit: number;
  page: number;
  count: number;
  total: number;
  resetMessages: () => void;
  fetchMessages: (chatId: string) => void;
  createMessage: (chatId: string, userId: string, text: string) => void;
  deleteMessage: (id: string) => void;
  getMoreMessages: (chatId: string) => void;
}

const InitialMessageSlice = {
  loading: false,
  success: false,
  errorMessage: "",
  messages: [],
  limit: 10,
  page: 1,
  count: 1,
  total: 0,
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
      if (get().page == get().count) {
        return;
      }
      set({ page: get().page + 1 });
      console.log(get().page);
      set({ loading: true });
      const res = await HttpRequest<PaginatedModel<MessageType>>({
        uri: "/Message/Chat",
        method: RESTMethod.Paginate,
        id: chatId,
        item: {
          limit: get().limit,
          page: get().page,
        },
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false, messages: [] });
      } else {
        if (!get().messages.includes(res.data.items[0])) {
          set({
            success: true,
            messages: [...res.data.items, ...get().messages],
            loading: false,
            limit: res.data.limit,
            page: res.data.page,
            count: res.data.count,
            total: res.data.total,
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
        uri: "/Message/Chat",
        method: RESTMethod.Paginate,
        id: chatId,
        item: {
          limit: get().limit,
          page: get().page,
        },
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false, messages: [] });
      } else {
        set({
          success: true,
          messages: res.data.items,
          loading: false,
          limit: res.data.limit,
          page: res.data.page,
          count: res.data.count,
          total: res.data.total,
        });
      }
    },

    createMessage: async (chatId: string, userId: string, text: string) => {
      set({ loading: true });
      const res = await HttpRequest<MessageType>({
        uri: "/Message",
        method: RESTMethod.Post,
        item: { chatId: chatId, userId: userId, text: text },
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        set({
          success: true,
          messages: [...get().messages, res.data],
          total: get().total + 1,
          loading: false,
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
  };
};
