import { create } from "zustand";
import { ChatSlice, ChatStore } from "./ChatSlice";
import { MessageSlice, MessageStore } from "./MessageSlice";
import { UserSlice, UserStore } from "./UserSlice";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { RoleSlice, RoleStore } from "./RoleSlice";
import { RoleSlice, RoleStore } from "./RoleSlice";

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
    RoleSlice {}

export const useGlobalStore = create<GlobalStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...UserStore(...a),
        ...ChatStore(...a),
        ...MessageStore(...a),
        ...RoleStore(...a),
        ...RoleStore(...a),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
