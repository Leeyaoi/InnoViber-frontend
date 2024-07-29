import { StateCreator } from "zustand";
import { UserType } from "../shared/types/UserType";
import { User } from "@auth0/auth0-react";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import { sliceResetFns } from "./GlobalStore";
import MessageType from "../shared/types/MessageType";

export interface UserSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  currentUserId: string;
  currentUser: UserType;
  users: { [id: string]: UserType };
  setCurrentUser: (user: User) => void;
  getUserById: (userId: string) => Promise<UserType>;
  getNames: (messages: MessageType[] | RoleType[]) => void;
  getSuggestedUsers: (query: string) => Promise<UserType[]>;
}

const InitialUserSlice = {
  loading: false,
  success: false,
  errorMessage: "",
  currentUserId: "",
  currentUser: {} as UserType,
  users: {} as { [id: string]: UserType },
};

export const UserStore: StateCreator<UserSlice> = (set, get) => {
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
        uri: `/User/auth/${userId}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
        return {} as UserType;
      }
      return res.data;
    },

    getNames: async (messages: MessageType[] | RoleType[]) => {
      const usersId = [] as string[];
      messages.forEach((message) => usersId.push(message.userId));

      const res = await HttpRequest<{ [id: string]: UserType }>({
        uri: `/User/names`,
        method: RESTMethod.Post,
        item: usersId,
      });
      if (res.code == "error") {
        set({
          errorMessage: res.error.message,
          users: {} as { [id: string]: UserType },
        });
        return;
      }
      set({ users: res.data });
      for (const key in res.data) {
        if (!(key in get().users)) {
          get().users[key] = res.data[key];
        }
      }
    },

    getSuggestedUsers: async (query: string) => {
      const res = await HttpRequest<UserType[]>({
        uri: `https://localhost:7081/api/User?query=${query}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({
          errorMessage: res.error.message,
        });
        return [];
      }
      return res.data;
    },
  };
};
