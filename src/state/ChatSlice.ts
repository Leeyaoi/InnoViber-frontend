import { StateCreator } from "zustand";
import ChatType from "../shared/types/ChatType";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import { UserSlice } from "./UserSlice";
import { sliceResetFns } from "./GlobalStore";
import PaginatedModel from "../shared/types/PaginatedModel";

export interface ChatSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  chats: ChatType[];
  currentChatId: string;
  currentChat: ChatType | undefined;
  setCurrentChatId: (id: string) => void;
  fetchChats: () => void;
  createChat: (ChatName: string, userId: string) => void;
  deleteChat: (id: string) => void;
  getChatById: (id: string) => void;

  getFirstChatPage: () => void;
}

const InitialChatSlice = {
  loading: false,
  success: false,
  errorMessage: "",
  chats: [],
  currentChatId: "",
  currentChat: undefined,
};

export const ChatStore: StateCreator<
  ChatSlice & UserSlice,
  [],
  [],
  ChatSlice
> = (set, get) => {
  sliceResetFns.add(() => {
    set(InitialChatSlice);
  });
  return {
    ...InitialChatSlice,

    setCurrentChatId: (id: string) => {
      set({ currentChatId: id, currentChat: undefined });
    },

    fetchChats: async () => {
      set({ loading: true });
      const res = await HttpRequest<PaginatedModel<ChatType>>({
        uri: `/Chat/user/${get().currentUserId}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        set({ success: true, chats: res.data.items, loading: false });
      }
    },

    createChat: async (ChatName: string, userId: string) => {
      set({ loading: true });
      const res = await HttpRequest<ChatType>({
        uri: "/Chat",
        method: RESTMethod.Post,
        item: { name: ChatName, userId: userId },
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        set({
          success: true,
          chats: [...get().chats, res.data],
          loading: false,
        });
      }
    },

    deleteChat: async (id: string) => {
      set({ loading: true });
      const res = await HttpRequest<ChatType>({
        uri: "/Chat",
        method: RESTMethod.Delete,
        id: id,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        get().fetchChats();
      }
    },

    getChatById: async (id: string) => {
      set({ loading: true });
      const res = await HttpRequest<ChatType>({
        uri: `/Chat/${id}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        if (!get().chats.find((chat) => chat.id === id)) {
          set({ chats: [...get().chats, res.data] });
        }
        set({ currentChat: res.data });
      }
    },

    getFirstChatPage: async () => {
      const res = await HttpRequest<PaginatedModel<ChatType>>({
        uri: `/Chat/user/${get().currentUserId}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        res.data.items.forEach((chat) => {
          const index = get().chats.findIndex((c) => c.id == chat.id);
          if (index > -1) {
            get().chats.splice(index, 1);
          }
        });
        set({
          success: true,
          chats: [...res.data.items, ...get().chats],
        });
      }
    },
  };
};
