import { HubConnection } from "@microsoft/signalr";
import { StateCreator } from "zustand";

export interface ConnectionSlice {
  connection: HubConnection;
  setConnection: (conn: HubConnection) => void;
}

export const ConnectionStore: StateCreator<ConnectionSlice> = (set) => {
  return {
    connection: {} as HubConnection,
    setConnection: (conn: HubConnection) => {
      set({ connection: conn });
    },
  };
};
