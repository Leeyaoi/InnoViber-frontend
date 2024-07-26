import { useEffect } from "react";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import { useGlobalStore } from "../../state/GlobalStore";
import "./ChatModule.scss";
import { Typography } from "@mui/material";
import CreateMessageComponent from "../../components/CreateMessageComponent/CreateMessageComponent";
import MessagesList from "../../components/MessagesList/MessagesList";

const ChatModule = () => {
  const { currentChatId, currentChat, setCurrentChatId, getChatById } =
    useGlobalStore();

  useEffect(() => {
    if (currentChatId != "") {
      getChatById(currentChatId);
    }
  }, [getChatById, currentChatId]);

  if (typeof currentChat == "undefined") {
    return (
      <div className="ChatBackground">
        <div className="ImgBlur">
          <Typography variant="h1" id="SelectChatSuggestion">
            Select a chat
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="ChatModule">
      <ChatHeader chat={currentChat} setCurrentChatId={setCurrentChatId} />
      <div className="ChatBackground" id="Chat_is_opened_bg">
        <MessagesList />
      </div>
      <CreateMessageComponent />
    </div>
  );
};

export default ChatModule;
