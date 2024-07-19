import ChatItem from "../../components/ChatItem/ChatItem";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useEffect, useState } from "react";
import "./ChatListModule.scss";
import { List, ListItem } from "@mui/material";
import { useGlobalStore } from "../../state/GlobalStore";
import ShortChatType from "../../shared/types/ShortChatType";
import SearchBar from "../../shared/UI/SearchBar/SearchBar";

interface Props {
  joinChat: (userName: string, userId: string, chatId: string) => Promise<void>;
}

const ChatListModule = ({ joinChat }: Props) => {
  const {
    currentChatId,
    setCurrentChatId,
    chats,
    fetchChats,
    currentUserId,
    currentUser,
  } = useGlobalStore();

  const [filteredChatList, SetFilteredChatList] =
    useState<ShortChatType[]>(chats);

  useEffect(() => {
    console.log("fetching chats");
    if (currentUserId != "") {
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
                  setCurrentChatId(item.id);
                  console.log("hi");
                  joinChat(currentUser.nickName, currentUserId, item.id);
                }
              }}
              key={item.id}
            >
              <ChatItem chatName={item.name} />
            </ListItem>
          ))}
        </div>
      </List>
    </>
  );
};

export default ChatListModule;
