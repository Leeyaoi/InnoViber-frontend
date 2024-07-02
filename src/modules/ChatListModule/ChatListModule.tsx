import ChatComponent from "../../components/ChatComponent/ChatComponent";
import SearchBar from "../../shared/UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useEffect } from "react";
import "./ChatListModule.scss";
import { List, ListItem } from "@mui/material";
import { useChatState } from "../../shared/states/ChatStates";

const ChatListModule = () => {
  const selectedIndex = useChatState((state) => state.currentItem);
  const SetSelectedIndex = useChatState((state) => state.updateCurrentChat);
  const chatList = useChatState((state) => state.data);
  const filteredChatList = useChatState((state) => state.filteredData);
  const SetFilteredChatList = useChatState((state) => state.setFilteredData);
  const fetch = useChatState((state) => state.execute);

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
        {filteredChatList.map((item) => (
          <ListItem
            className={selectedIndex === item.id ? "activeItem" : ""}
            onClick={() => SetSelectedIndex(item.id)}
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
