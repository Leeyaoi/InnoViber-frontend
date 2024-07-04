import axios from 'axios';
import { create } from 'zustand'
import ShortChatType from '../types/ShortChatType';

interface ChatSlice {
    loading: boolean,
    success: boolean,
    error: string,
    chats: ShortChatType[],
    currentChat: string,
    filteredChats: ShortChatType[],
    setFilteredChats: (data: ShortChatType[]) => void,
    updateCurrentChat: (id: string) => void,
    fetchChats: () => void,
    createChat: (ChatName: string) => void
  }

export const useChatState = create<ChatSlice>((set, get) => ({
    loading: false,
    success: false,
    error: "",
    chats: [],
    currentChat: "",
    filteredChats: [],
    setFilteredChats: (data: ShortChatType[]) => {set({filteredChats: data })},
    updateCurrentChat: (id: string) => { set({ currentChat: id }) },
    fetchChats: async () => {
        set({ loading: true });
            
        const res = await axios.get("https://localhost:7060/api/Chat");

        if (res.status >= 400) {
            set({ error: res.statusText })
            return;
        }

        set({ success: true, chats: res.data, filteredChats: res.data });
        
    },
    createChat: async (ChatName: string) => {
        set({ loading: true });
            
        const res = await axios.post("https://localhost:7060/api/Chat", { name: ChatName });
            
        if (res.status >= 400) {
            set({ error: res.statusText })
            return;
        }
            
        set({ success: true, chats: [...get().chats, res.data] });
    }
}));