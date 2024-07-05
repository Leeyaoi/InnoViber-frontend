import ChatItem from "../../components/ChatItem/ChatItem";
import SearchBar from "../../shared/UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useEffect, useState } from "react";
import "./ChatListModule.scss";
import { List, ListItem } from "@mui/material";
import { useChatState } from "../../state/ChatSlice";
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

  const [filteredChatList, SetFilteredChatList] =
    useState<ShortChatType[]>(chats);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    SetFilteredChatList(chats);
  }, [chats]);

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
            <ChatItem chatName={item.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ChatListModule;
