import ChatItem from "../../components/ChatItem/ChatItem";
import SearchBar from "../../shared/UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useEffect, useState } from "react";
import "./ChatListModule.scss";
import { List, ListItem } from "@mui/material";
import { useGlobalStore } from "../../state/GlobalStore";
import ChatType from "../../shared/types/ChatType";

const ChatListModule = () => {
  const {
    currentChatId,
    setCurrentChatId,
    chats,
    fetchChats,
    currentUserId,
    resetMessages,
  } = useGlobalStore();

  const [filteredChatList, SetFilteredChatList] = useState<ChatType[]>(chats);

  useEffect(() => {
    if (currentUserId != "") {
      console.log("fetching chats");
      fetchChats();
    }
  }, [currentUserId, fetchChats]);

  useEffect(() => {
    console.log("setting filtered chats");
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
        <div className="MainPage_ChatItems">
          <AddChatComponent />
          {filteredChatList.map((item) => (
            <ListItem
              className={currentChatId === item.id ? "activeItem" : ""}
              onClick={() => {
                if (currentChatId !== item.id) {
                  resetMessages();
                  setCurrentChatId(item.id);
                }
              }}
              key={item.id}
            >
              <ChatItem chat={item} />
            </ListItem>
          ))}
        </div>
      </List>
    </>
  );
};

export default ChatListModule;
