/* eslint-disable react-hooks/rules-of-hooks */
import { StateCreator } from "zustand";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import MessageType from "../shared/types/MessageType";
import { sliceResetFns, useGlobalStore } from "./GlobalStore";
import { ConnectionSlice } from "./ConnectionSlice";

export interface MessageSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  messages: MessageType[];
  getMessage: (message: MessageType) => void;
  fetchMessages: (chatId: string) => void;
  createMessage: (chatId: string, userId: string, text: string) => void;
  deleteMessage: (id: string) => void;
}

const InitialMessageSlice = {
  loading: false,
  success: false,
  errorMessage: "",
  messages: [],
};

export const MessageStore: StateCreator<
  MessageSlice & ConnectionSlice,
  [],
  [],
  MessageSlice
> = (set, get) => {
  sliceResetFns.add(() => {
    set(InitialMessageSlice);
  });
  return {
    ...InitialMessageSlice,

    getMessage: (message: MessageType) => {
      set({ messages: [...get().messages, message] });
    },

    fetchMessages: async (chatId: string) => {
      set({ loading: true });
      const res = await HttpRequest<MessageType[]>({
        uri: "/Message/Chat",
        method: RESTMethod.GetById,
        id: chatId,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false, messages: [] });
      } else {
        set({
          success: true,
          messages: res.data,
          loading: false,
        });
      }
    },

    createMessage: async (chatId: string, userId: string, text: string) => {
      set({ loading: true });
      console.log("starting request");
      const res = await HttpRequest<MessageType>({
        uri: "/Message",
        method: RESTMethod.Post,
        item: { chatId: chatId, userId: userId, text: text },
      });
      console.log(res);
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        console.log("sending");
        get().connection.invoke("SendMessage", res.data);
        console.log("setting");
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
        const { currentChatId } = useGlobalStore();
        get().fetchMessages(currentChatId);
      }
    },
  };
};
