import { create } from 'zustand'
import ShortChatType from '../types/ShortChatType';
import client from '../helpers/client';

interface ChatSlice {
    loading: boolean,
    success: boolean,
    errorMessage: string,
    chats: ShortChatType[],
    currentChatId: string,
    updateCurrentChat: (id: string) => void,
    fetchChats: () => void,
    createChat: (ChatName: string) => void
  }

export const useChatState = create<ChatSlice>((set, get) => ({
    loading: false,
    success: false,
    errorMessage: "",
    chats: [],
    currentChatId: "",
    updateCurrentChat: (id: string) => { set({ currentChatId: id }) },
    fetchChats: async () => {
        set({ loading: true });
        try {
            const res = await client.get("/Chat");
            if (res.status >= 400) {
                set({ errorMessage: res.statusText, loading: false })
                return;
            }
            set({ success: true, chats: res.data, loading: false });
        } catch (error) {
            set({ errorMessage: error, loading: false })
        }        
    },
    createChat: async (ChatName: string) => {
        set({ loading: true });
        
        try {
            const res = await client.post("/Chat", { name: ChatName });
            if (res.status >= 400) {
                set({ errorMessage: res.statusText, loading: false })
                return;
            }
            set({ success: true, chats: [...get().chats, res.data], loading: false });
        } catch (error) {
            set({ errorMessage: error, loading: false })
        }
    }
}));