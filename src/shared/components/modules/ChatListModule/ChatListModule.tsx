import ChatComponent from "../../components/ChatComponent/ChatComponent";
import SearchBar from "../../UI/SearchBar/SearchBar";
import "./ChatListModule.scss";

const ChatListModule = () => {
  return (
    <>
      <ul className="MainPage_ChatList">
        <SearchBar />
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
