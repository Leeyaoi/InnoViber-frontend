import { StateCreator } from "zustand";
import { UserType } from "../shared/types/UserType";
import { User } from "@auth0/auth0-react";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import { sliceResetFns } from "./GlobalStore";

export interface UserSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  currentUserId: string;
  currentUser: UserType;
  setCurrentUser: (user: User) => void;
  getUserById: (userId: string) => Promise<UserType>;
}

const InitialUserSlice = {
  loading: false,
  success: false,
  errorMessage: "",
  currentUserId: "",
  currentUser: {} as UserType,
};

export const UserStore: StateCreator<UserSlice> = (set) => {
  sliceResetFns.add(() => {
    set(InitialUserSlice);
  });
  return {
    ...InitialUserSlice,
    setCurrentUser: async (user: User) => {
      if (typeof user == "undefined") {
        set({
          currentUserId: "",
          currentUser: {} as UserType,
        });
        return;
      }

      set({ loading: true });
      const res = await HttpRequest<UserType>({
        uri: "/User/auth",
        method: RESTMethod.Post,
        item: {
          auth0Id: user.sub,
          nickName: user.nickname,
          name: user.name,
          email: user.email,
          about: "",
          userPhoto: user.picture,
        },
      });

      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
        return;
      }

      set({ currentUser: res.data, currentUserId: user.sub });
    },

    getUserById: async (userId: string) => {
      set({ loading: true });
      const res = await HttpRequest<UserType>({
        uri: "/User/auth",
        method: RESTMethod.GetById,
        id: userId,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
        return {} as UserType;
      }
      return res.data;
    },
  };
};
