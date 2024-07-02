import ChatComponent from "../../components/ChatComponent/ChatComponent";
import SearchBar from "../../shared/UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useEffect, useState } from "react";
import "./ChatListModule.scss";
import ShortChatType from "../../shared/types/ShortChatType";
import client from "../../shared/api/BaseAxiosInstance";
import { List, ListItem } from "@mui/material";

const ChatListModule = () => {
  const [selectedIndex, SetSelectedIndex] = useState(-1);
  const [chatList, SetChatList] = useState([] as ShortChatType[]);
  const [filteredChatList, SetFilteredChatList] = useState(
    [] as ShortChatType[]
  );

  useEffect(() => {
    const fetch = async () => {
      await client
        .get("/Chat")
        .then((response) => {
          SetChatList(response.data);
          return response;
        })
        .then((response) => {
          SetFilteredChatList(response.data);
        });
    };

    fetch();
  }, []);

  return (
    <>
      <List className="MainPage_ChatList">
        <SearchBar
          placeholder="Search chat"
          list={chatList}
          SetSearchResults={SetFilteredChatList}
        />
        <AddChatComponent />
        {filteredChatList.map((item, index) => (
          <ListItem
            className={selectedIndex === index ? "activeItem" : ""}
            onClick={() => SetSelectedIndex(index)}
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
