import { StateCreator } from "zustand";
import { ChatSlice } from "./ChatSlice";
import { MessageSlice } from "./MessageSlice";

export interface UserSlice {
  currentUserId: string;
}

export const UserStore: StateCreator<
  ChatSlice & MessageSlice & UserSlice,
  [],
  [],
  UserSlice
> = () => ({
  currentUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // while no auth
});
