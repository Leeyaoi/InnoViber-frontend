/* eslint-disable react-hooks/rules-of-hooks */
import { StateCreator } from "zustand";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import MessageType from "../shared/types/MessageType";
import { useGlobalStore } from "./GlobalStore";
import { ChatSlice } from "./ChatSlice";
import { UserSlice } from "./UserSlice";

export interface MessageSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  messages: MessageType[];
  fetchMessages: (chatId: string) => void;
  createMessage: (chatId: string, userId: string, text: string) => void;
  deleteMessage: (id: string) => void;
}

export const MessageStore: StateCreator<
  ChatSlice & MessageSlice & UserSlice,
  [],
  [],
  MessageSlice
> = (set, get) => ({
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
        messages: res.data
          .filter((mes) => mes.chatId == chatId)
          .sort((m1, m2) => {
            if (m1.date > m2.date) return 0;
            return -1;
          }),
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
    if (res.code == "error") {
      set({ errorMessage: res.error.message, loading: false });
    } else {
      const chatId = useGlobalStore((state) => state.currentChatId);
      get().fetchMessages(chatId);
    }
  },
});
