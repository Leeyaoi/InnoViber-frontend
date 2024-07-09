import { StateCreator } from "zustand";

export interface UserSlice {
  currentUserId: string;
}

export const UserStore: StateCreator<UserSlice> = () => ({
  currentUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // while no auth
});
