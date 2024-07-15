import { StateCreator } from "zustand";
import { UserType } from "../shared/types/UserType";
import { User } from "@auth0/auth0-react";
import { HttpRequest } from "../api/GenericApi";
import { RESTMethod } from "../shared/types/MethodEnum";
import { ShortUserType } from "../shared/types/ShortUserType";
import { sliceResetFns } from "./GlobalStore";

export interface UserSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  currentUserId: string;
  currentUser: UserType;
  setCurrentUser: (user: User) => void;
  getShortUser: (userId: string) => Promise<ShortUserType>;
  getUserById: (userId: string) => Promise<UserType>;
  getUsersId: (mongoId: string) => Promise<string>;
  createUser: (user: User | undefined) => void;
  isExists: (user: User | undefined) => Promise<boolean>;
}

const InitialUserSlice = {
  loading: false,
  success: false,
  errorMessage: "",
  currentUserId: "",
  currentUser: {} as UserType,
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
      get()
        .getUsersId(user.sub!)
        .then((id) => {
          set({ currentUserId: id });
        });
      get()
        .getUserById(get().currentUserId)
        .then((user) => {
          set({ currentUser: user });
        });
    },

    getShortUser: async (userId: string) => {
      set({ loading: true });
      const res = await HttpRequest<ShortUserType>({
        uri: "/ShortUser",
        method: RESTMethod.GetById,
        id: userId,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
        return {} as ShortUserType;
      }
      return res.data;
    },

    getUserById: async (userId: string) => {
      set({ loading: true });
      const mongoId = await (await get().getShortUser(userId)).mongoId;
      const res = await HttpRequest<UserType>({
        uri: "/User",
        method: RESTMethod.GetById,
        id: mongoId,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
        return {} as UserType;
      }
      return res.data;
    },

    getUsersId: async (authId: string) => {
      const user = await HttpRequest<UserType>({
        uri: "/User/auth",
        method: RESTMethod.GetById,
        id: authId,
      });
      if (user.code == "error") {
        set({ errorMessage: user.error.message, loading: false });
        return "";
      }
      const ShortUser = await HttpRequest<ShortUserType[]>({
        uri: "/ShortUser/auth",
        method: RESTMethod.GetById,
        id: user.data.id,
      });
      if (ShortUser.code == "error") {
        set({ errorMessage: ShortUser.error.message, loading: false });
        return "";
      }
      return ShortUser.data[0].id;
    },

    createUser: async (user: User | undefined) => {
      if (typeof user == "undefined") {
        return;
      }
      set({ loading: true });
      const userRes = await HttpRequest<UserType>({
        uri: "/User",
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

      if (userRes.code == "error") {
        set({ errorMessage: userRes.error.message, loading: false });
      } else {
        set({ currentUser: userRes.data });
        const shortUserRes = await HttpRequest<ShortUserType>({
          uri: "/ShortUser",
          method: RESTMethod.Post,
          item: {
            mongoId: userRes.data.id,
          },
        });
        if (shortUserRes.code == "error") {
          set({ errorMessage: shortUserRes.error.message, loading: false });
        } else {
          set({ currentUserId: shortUserRes.data.id, loading: false });
        }
      }
    },

    isExists: async (user: User | undefined) => {
      if (typeof user === "undefined") {
        return true;
      }
      let res = await HttpRequest<UserType>({
        uri: "/User/auth",
        method: RESTMethod.GetById,
        id: user.sub,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
        res = { code: "not found", data: {} as UserType };
      }
      if (res.data == ({} as UserType)) {
        return false;
      }
      return true;
    },
  };
};
