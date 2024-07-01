import ChatComponent from "../../components/ChatComponent/ChatComponent";
import SearchBar from "../../UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useEffect, useState } from "react";
import "./ChatListModule.scss";
import ShortChatType from "../../../types/ShortChatType";
import client from "../../../api/BaseAxiosInstance";

const ChatListModule = () => {
  const [selectedIndex, SetSelectedIndex] = useState(-1);
  const [chatList, SetChatList] = useState([] as ShortChatType[]);

  useEffect(() => {
    client.get("/Chat").then((response) => {
      SetChatList(response.data);
    });
  });

  return (
    <>
      <ul className="MainPage_ChatList">
        <SearchBar placeholder="Search chat" />
        <AddChatComponent />
        {chatList.map((item, index) => {
          return (
            <li
              className={selectedIndex === index ? "active" : ""}
              onClick={() => SetSelectedIndex(index)}
              key={item.id}
            >
              <ChatComponent chatName={item.name} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChatListModule;
