import { StateCreator } from "zustand";
import { GlobalStoreState, sliceResetFns } from "./GlobalStore";
import { RESTMethod } from "../shared/types/MethodEnum";
import { HttpRequest } from "../api/GenericApi";
import { UserRoles } from "../shared/types/UserRolesEnum";
import PaginatedModel from "../shared/types/PaginatedModel";

export interface RoleSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  currentRole: UserRoles;
  rolesPage: number;
  rolesCount: number;
  rolesTotal: number;
  roles: RoleType[];
  open: boolean;
  resetRoles: () => void;
  toggleOpen: () => void;
  close: () => void;
  setCurrentRole: (chatId: string) => void;
  fetchRoles: (chatId: string) => void;
  getMoreRoles: (chatId: string) => void;
  createRole: (role: RoleType) => void;
  deleteRole: (role: RoleType) => void;
  changeRole: (role: RoleType) => void;
  updateActivityTime: () => void;
}

const InitialRoleSlice = {
  loading: false,
  success: true,
  errorMessage: "",
  currentRole: UserRoles.Member,
  rolesPage: 1,
  rolesCount: 1,
  rolesTotal: 0,
  roles: [],
  open: false,
};

export const RoleStore: StateCreator<GlobalStoreState, [], [], RoleSlice> = (
  set,
  get
) => {
  sliceResetFns.add(() => {
    set(InitialRoleSlice);
  });
  return {
    ...InitialRoleSlice,

    resetRoles: () => {
      set(InitialRoleSlice);
    },

    toggleOpen: () => {
      set({ open: !get().open });
    },

    close: () => {
      set({ open: false });
    },

    fetchRoles: async (chatId: string) => {
      set({ loading: true });
      const res = await HttpRequest<PaginatedModel<RoleType>>({
        uri: `/ChatRole/chat/${chatId}?page=${get().rolesPage}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false, roles: [] });
      } else {
        set({
          success: true,
          roles: res.data.items,
          loading: false,
          rolesPage: res.data.page,
          rolesCount: res.data.count,
          rolesTotal: res.data.total,
        });
      }
    },

    getMoreRoles: async (chatId: string) => {
      if (get().rolesPage == get().rolesCount) {
        return;
      }
      const page = get().rolesPage + 1;
      set({ loading: true });
      const res = await HttpRequest<PaginatedModel<RoleType>>({
        uri: `/ChatRole/chat/${chatId}?page=${page}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false, roles: [] });
      } else {
        if (res.data.total > get().rolesTotal) {
          let num = res.data.total - get().rolesTotal;
          while (num--) {
            res.data.items.pop();
          }
        }
        if (!get().roles.includes(res.data.items[0])) {
          set({
            success: true,
            roles: [...res.data.items, ...get().roles],
            loading: false,
            rolesPage: res.data.page,
            rolesCount: res.data.count,
            rolesTotal: res.data.total,
          });
        } else {
          set({
            success: true,
            loading: false,
          });
        }
      }
    },

    setCurrentRole: async (chatId: string) => {
      set({ loading: true });
      const res = await HttpRequest<PaginatedModel<RoleType>>({
        uri: `/ChatRole/chat/${chatId}?userId=${get().currentUserId}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        set({
          currentRole: res.data.items[0].role,
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
          roles: [...get().roles, res.data],
        });
      }
    },

    deleteRole: async (role: RoleType) => {
      set({ loading: true });
      const res = await HttpRequest<RoleType>({
        uri: `/ChatRole`,
        method: RESTMethod.Delete,
        id: role.id,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message, loading: false });
      } else {
        set({
          success: true,
          loading: false,
          roles: get().roles.filter((r) => r.id != role.id),
          chats: get().chats.filter((c) => c.id != role.chatId),
        });
      }
    },

    changeRole: async (role: RoleType) => {
      set({ loading: true });
      const res = await HttpRequest<RoleType>({
        uri: `/ChatRole`,
        method: RESTMethod.Put,
        id: role.id,
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

    updateActivityTime: async () => {
      const res = await HttpRequest<RoleType>({
        uri: `/ChatRole/time?chatId=${get().currentChatId}&userId=${
          get().currentUserId
        }&lastActivity=${get().messages[get().messages.length - 1].date}`,
        method: RESTMethod.Get,
      });
      if (res.code == "error") {
        set({ errorMessage: res.error.message });
      } else {
        set({
          currentRole: res.data.role,
          success: true,
        });
      }
    },
  };
};
