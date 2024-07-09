import { create } from "zustand";
import { ChatSlice, ChatStore } from "./ChatSlice";
import { MessageSlice, MessageStore } from "./MessageSlice";
import { UserSlice, UserStore } from "./UserSlice";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface GlobalStoreState extends UserSlice, MessageSlice, ChatSlice {}

export const useGlobalStore = create<GlobalStoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...UserStore(...a),
        ...ChatStore(...a),
        ...MessageStore(...a),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
