import { StateCreator } from "zustand";
import { sliceResetFns } from "./GlobalStore";
import { RESTMethod } from "../shared/types/MethodEnum";
import { HttpRequest } from "../api/GenericApi";

export interface RoleSlice {
  loading: boolean;
  success: boolean;
  errorMessage: string;
  createRole: (role: RoleType) => void;
}

const InitialRoleSlice = {
  loading: false,
  success: true,
  errorMessage: "",
};

export const RoleStore: StateCreator<RoleSlice> = (set) => {
  sliceResetFns.add(() => {
    set(InitialRoleSlice);
  });
  return {
    ...InitialRoleSlice,

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
  };
};
