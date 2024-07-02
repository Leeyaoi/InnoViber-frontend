import ChatComponent from "../../components/ChatComponent/ChatComponent";
import "./ChatListModule.scss";

const ChatListModule = () => {
  return (
    <ul className="MainPage_ChatList">
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
  );
};

export default ChatListModule;
