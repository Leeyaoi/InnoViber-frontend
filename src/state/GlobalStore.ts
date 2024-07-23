import { create } from "zustand";
import { ChatSlice, ChatStore } from "./ChatSlice";
import { MessageSlice, MessageStore } from "./MessageSlice";
import { UserSlice, UserStore } from "./UserSlice";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { ConnectionSlice, ConnectionStore } from "./ConnectionSlice";

export const sliceResetFns = new Set<() => void>();

export const resetGlobalStore = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

interface GlobalStoreState
  extends UserSlice,
    MessageSlice,
    ChatSlice,
    ConnectionSlice {}

export const useGlobalStore = create<GlobalStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...UserStore(...a),
        ...ChatStore(...a),
        ...MessageStore(...a),
        ...ConnectionStore(...a),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
