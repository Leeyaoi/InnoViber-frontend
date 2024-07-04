import ChatComponent from "../../components/ChatComponent/ChatComponent";
import SearchBar from "../../shared/UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useEffect } from "react";
import "./ChatListModule.scss";
import { List, ListItem } from "@mui/material";
import { useChatState } from "../../shared/states/ChatStates";
import ShortChatType from "../../shared/types/ShortChatType";

const ChatListModule = () => {
  const [selectedChat, SetSelectedChat] = useChatState((state) => [
    state.currentChat,
    state.updateCurrentChat,
  ]);
  const [filteredChatList, SetFilteredChatList] = useChatState((state) => [
    state.filteredChats,
    state.setFilteredChats,
  ]);
  const chatList = useChatState((state) => state.chats);
  const fetch = useChatState((state) => state.fetchChats);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <List className="MainPage_ChatList">
        <SearchBar
          placeholder="Search chat"
          list={chatList}
          SetSearchResults={SetFilteredChatList}
        />
        <AddChatComponent />
        {filteredChatList.map((item: ShortChatType) => (
          <ListItem
            className={selectedChat === item.id ? "activeItem" : ""}
            onClick={() => SetSelectedChat(item.id)}
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
