import { StateCreator } from "zustand";
import { sliceResetFns } from "./GlobalStore";
import { RESTMethod } from "../shared/types/MethodEnum";
import { HttpRequest } from "../api/GenericApi";
import { UserRoles } from "../shared/types/UserRolesEnum";
import { UserSlice } from "./UserSlice";
import { ChatSlice } from "./ChatSlice";

export interface RoleSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  currentRole: UserRoles;
  setCurrentRole: () => void;
  createRole: (role: RoleType) => void;
  deleteRole: (role: RoleType) => void;
}

const InitialRoleSlice = {
  loading: false,
  success: true,
  errorMessage: "",
  currentRole: UserRoles.Member,
};

export const RoleStore: StateCreator<
  RoleSlice & UserSlice & ChatSlice,
  [],
  [],
  RoleSlice
> = (set, get) => {
  sliceResetFns.add(() => {
    set(InitialRoleSlice);
  });
  return {
    ...InitialRoleSlice,

    setCurrentRole: async () => {
      set({ loading: true });
      const res = await HttpRequest<RoleType>({
        uri: `/ChatRole/chat/${get().currentChatId}?userId=${
          get().currentUserId
        }`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        set({
          currentRole: res.data.role,
          success: true,
          loading: false,
        });
      }
    },

    createRole: async (role: RoleType) => {
      set({ loading: true });
      const res = await HttpRequest<RoleType>({
        uri: "/ChatRole",
        method: RESTMethod.Post,
        item: role,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        set({
          success: true,
          loading: false,
        });
      }
    },

    deleteRole: async (role: RoleType) => {
      set({ loading: true });
      const res = await HttpRequest<RoleType>({
        uri: `/ChatRole/chat/${role.chatId}?userId=${role.userId}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        const delRes = await HttpRequest<RoleType>({
          uri: `/ChatRole`,
          method: RESTMethod.Delete,
          id: res.data.id,
        });
        if (delRes.code == "error") {
          set({ errorMessage: delRes.error.message, loading: false });
          return;
        }
        set({
          success: true,
          loading: false,
        });
      }
    },
  };
};
