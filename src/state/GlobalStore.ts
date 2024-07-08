import { create } from "zustand";
import { ChatSlice, useChatStore } from "./ChatSlice";
import { MessageSlice, useMessageStore } from "./MessageSlice";
import { UserSlice, useUserStore } from "./UserSlice";

interface GlobalStoreState extends UserSlice, MessageSlice, ChatSlice {}

export const useGlobalStore = create<GlobalStoreState>(() => ({
  ...useUserStore(),
  ...useChatStore(),
  ...useMessageStore(),
}));
