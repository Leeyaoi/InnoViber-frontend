import ChatComponent from "../../components/ChatComponent/ChatComponent";
import SearchBar from "../../shared/UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useEffect, useState } from "react";
import "./ChatListModule.scss";
import { List, ListItem } from "@mui/material";
import { useChatState } from "../../shared/state/ChatSlice";
import ShortChatType from "../../shared/types/ShortChatType";

const ChatListModule = () => {
  const { currentChatId, updateCurrentChat, chats, fetchChats } = useChatState(
    (state) => ({
      currentChatId: state.currentChatId,
      updateCurrentChat: state.updateCurrentChat,
      chats: state.chats,
      fetchChats: state.fetchChats,
    })
  );

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const [filteredChatList, SetFilteredChatList] =
    useState<ShortChatType[]>(chats);

  return (
    <>
      <List className="MainPage_ChatList">
        <SearchBar
          placeholder="Search chat"
          list={chats}
          SetSearchResults={SetFilteredChatList}
        />
        <AddChatComponent />
        {filteredChatList.map((item) => (
          <ListItem
            className={currentChatId === item.id ? "activeItem" : ""}
            onClick={() => updateCurrentChat(item.id)}
            key={item.id}
          >
            <ChatComponent chatName={item.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ChatListModule;
