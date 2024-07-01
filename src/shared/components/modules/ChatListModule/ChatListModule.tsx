import ChatComponent from "../../components/ChatComponent/ChatComponent";
import SearchBar from "../../UI/SearchBar/SearchBar";
import AddChatComponent from "../../components/AddChatComponent/AddChatComponent";
import "./ChatListModule.scss";

const ChatListModule = () => {
  return (
    <>
      <ul className="MainPage_ChatList">
        <SearchBar placeholder="Search chat" />
        <AddChatComponent />
        <li>
          <ChatComponent />
        </li>
        <li>
          <ChatComponent />
        </li>
        <li>
          <ChatComponent />
        </li>
      </ul>
    </>
  );
};

export default ChatListModule;
