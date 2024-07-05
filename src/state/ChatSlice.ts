import { create } from 'zustand'
import ShortChatType from '../shared/types/ShortChatType';
import { HttpRequest } from '../shared/helpers/GenericApi';
import { RESTMethod } from '../shared/types/MethodEnum';
import { AxiosResponse } from 'axios';

interface ChatSlice {
    loading: boolean,
    success: boolean,
    errorMessage: string,
    chats: ShortChatType[],
    currentChatId: string,
    currentChat: ShortChatType | undefined,
    setCurrentChatId: (id: string) => void,
    fetchChats: () => void,
    createChat: (ChatName: string) => void,
    deleteChat: (id: string) => void,
    getChatById: (id: string) => void,
  }

export const useChatState = create<ChatSlice>((set, get) => ({
    loading: false,
    success: false,
    errorMessage: "",
    chats: [],
    currentChatId: "",
    currentChat: undefined,
    setCurrentChatId: (id: string) => { set({ currentChatId: id, currentChat: undefined }) },
    fetchChats: async () => {
        set({ loading: true });
        try {
            const res = await HttpRequest({ uri: "/Chat", method: RESTMethod.Get }) as AxiosResponse<unknown, unknown>;
            set({ success: true, chats: res.data as ShortChatType[], loading: false });
        } catch (error) {
            set({ errorMessage: error as string, loading: false })
        }        
    },
    createChat: async (ChatName: string) => {
        set({ loading: true });
        try {
            const res = await HttpRequest({
                uri: "/Chat", method: RESTMethod.Post,
                item: { name: ChatName }
            }) as AxiosResponse<ShortChatType, unknown>;
            set({ success: true, chats: [...get().chats, res.data], loading: false });
        } catch (error) {
            set({ errorMessage: error as string, loading: false })
        }       
    },
    deleteChat: async (id: string) => {
        set({ loading: true });
        try {
            await HttpRequest({uri: "/Chat", method: RESTMethod.Delete, id: id});
            get().fetchChats();
        } catch (error) {
            set({ errorMessage: error as string, loading: false })
        }
    },
    getChatById: async (id: string) => {
        set({ loading: true });
        try {
            const res = await HttpRequest({
                uri: "/Chat",
                method: RESTMethod.GetById, id: id
            }) as AxiosResponse<ShortChatType, unknown>;
            if (!get().chats.find(chat => chat.id === id)) {
                set({ chats: [...get().chats, res.data]})
            }
            set({currentChat: res.data})
        } catch (error) {
            set({ errorMessage: error as string, loading: false })
        }
    },
}));