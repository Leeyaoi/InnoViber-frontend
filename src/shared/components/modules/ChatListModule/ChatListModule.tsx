import ChatComponent from "../../components/ChatComponent/ChatComponent";
import SearchBar from "../../UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import { useState } from "react";
import "./ChatListModule.scss";

const ChatListModule = () => {
  const [selectedIndex, SetSelectedIndex] = useState(-1);

  return (
    <>
      <ul className="MainPage_ChatList">
        <SearchBar placeholder="Search chat" />
        <AddChatComponent />
        <li
          className={selectedIndex === 0 ? "active" : ""}
          onClick={() => SetSelectedIndex(0)}
        >
          <ChatComponent />
        </li>
        <li
          className={selectedIndex === 1 ? "active" : ""}
          onClick={() => SetSelectedIndex(1)}
        >
          <ChatComponent />
        </li>
        <li
          className={selectedIndex === 2 ? "active" : ""}
          onClick={() => SetSelectedIndex(2)}
        >
          <ChatComponent />
        </li>
      </ul>
    </>
  );
};

export default ChatListModule;
