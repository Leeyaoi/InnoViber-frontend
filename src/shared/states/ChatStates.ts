import axios from 'axios';
import { create } from 'zustand'
import ShortChatType from '../types/ShortChatType';

interface initialChat {
    loading: boolean,
    success: boolean,
    error: boolean,
    data: ShortChatType[],
    errorData: unknown,
    currentItem: string,
    filteredData: ShortChatType[],
    setFilteredData: (data: ShortChatType[]) => void,
    updateCurrentChat: (id: string) => void,
    execute: () => void,
    addChat: (ChatName: string) => void
  }

export const useChatState = create<initialChat>((set, get) => ({
    loading: false,
    success: false,
    error: false,
    data: [],
    errorData: null,
    currentItem: "",
    filteredData: [],
    setFilteredData: (data: ShortChatType[]) => {set({filteredData: data })},
    updateCurrentChat: (id: string) => { set({ currentItem: id }) },
    execute: async () => {
        set({ loading: true });
        try {
            const res = await axios.get("https://localhost:7060/api/Chat");
            set({ success: true, data: res.data, filteredData: res.data });
            console.log(res);
        } catch (err) {
            console.error("Error in data fetch:", err);
            set({ error: true, errorData: err });
        }
    },
    addChat: async (ChatName: string) => {
        set({ loading: true });
        try {
            const res = await axios.post("https://localhost:7060/api/Chat", { name: ChatName });
            set({ success: true, data: [...get().data, res.data] });
        } catch (err) {
            console.error("Error in data fetch:", err);
            set({ error: true, errorData: err });
        }
    }
}));