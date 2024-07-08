/* eslint-disable react-hooks/rules-of-hooks */
import { create } from "zustand";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import MessageType from "../shared/types/MessageType";
import { useChatStore } from "./ChatSlice";

export interface MessageSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  messages: MessageType[];
  fetchMessages: (chatId: string) => void;
  createMessage: (chatId: string, userId: string, text: string) => void;
  deleteMessage: (id: string) => void;
}

export const useMessageStore = create<MessageSlice>((set, get) => ({
  loading: false,
  success: false,
  errorMessage: "",
  messages: [],
  fetchMessages: async (chatId: string) => {
    set({ loading: true });
    const res = await HttpRequest<MessageType[]>({
      uri: "/Message",
      method: RESTMethod.Get,
    });
    if (res.code == "error") {
      set({ errorMessage: res.error.message, loading: false });
    } else {
      set({
        success: true,
        messages: res.data.filter((mes) => mes.chatId == chatId),
        loading: false,
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
    console.log(res);
    console.log(typeof res);
    if (res.code == "error") {
      set({ errorMessage: res.error.message, loading: false });
    } else {
      const chatId = useChatStore((state) => state.currentChatId);
      get().fetchMessages(chatId);
    }
  },
}));
