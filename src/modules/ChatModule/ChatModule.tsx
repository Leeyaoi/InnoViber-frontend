import { useEffect } from "react";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import { useChatState } from "../../state/ChatSlice";
import "./ChatModule.scss";
import { Typography } from "@mui/material";

const ChatModule = () => {
  const {
    currentChatId,
    currentChat,
    setCurrentChatId,
    getChatById,
    deleteChat,
  } = useChatState((state) => ({
    currentChatId: state.currentChatId,
    currentChat: state.currentChat,
    setCurrentChatId: state.setCurrentChatId,
    getChatById: state.getChatById,
    deleteChat: state.deleteChat,
  }));

  useEffect(() => {
    if (currentChatId != "") {
      getChatById(currentChatId);
    }
  }, [getChatById, currentChatId]);

  if (typeof currentChat == "undefined") {
    return (
      <div className="NotSelectedChat">
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
      <ChatHeader
        chat={currentChat}
        setCurrentChatId={setCurrentChatId}
        deleteChat={deleteChat}
      />
    </div>
  );
};

export default ChatModule;
