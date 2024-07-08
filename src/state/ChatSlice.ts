import { create } from "zustand";
import ShortChatType from "../shared/types/ShortChatType";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";

interface ChatSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  chats: ShortChatType[];
  currentChatId: string;
  currentChat: ShortChatType | undefined;
  setCurrentChatId: (id: string) => void;
  fetchChats: () => void;
  createChat: (ChatName: string, userId: string) => void;
  deleteChat: (id: string) => void;
  getChatById: (id: string) => void;
}

export const useChatState = create<ChatSlice>((set, get) => ({
  loading: false,
  success: false,
  errorMessage: "",
  chats: [],
  currentChatId: "",
  currentChat: undefined,
  setCurrentChatId: (id: string) => {
    set({ currentChatId: id, currentChat: undefined });
  },
  fetchChats: async () => {
    set({ loading: true });
    const res = await HttpRequest<ShortChatType[]>({
      uri: "/Chat",
      method: RESTMethod.Get,
    });
    if (res.code == "error") {
      set({ errorMessage: res.error.message, loading: false });
    } else {
      set({ success: true, chats: res.data, loading: false });
    }
  },
  createChat: async (ChatName: string, userId: string) => {
    set({ loading: true });
    const res = await HttpRequest<ShortChatType>({
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
    const res = await HttpRequest<ShortChatType>({
      uri: "/Chat",
      method: RESTMethod.Delete,
      id: id,
    });
    console.log(res);
    console.log(typeof res);
    if (res.code == "error") {
      set({ errorMessage: res.error.message, loading: false });
    } else {
      get().fetchChats();
    }
  },
  getChatById: async (id: string) => {
    set({ loading: true });
    const res = await HttpRequest<ShortChatType>({
      uri: "/Chat",
      method: RESTMethod.GetById,
      id: id,
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
}));
