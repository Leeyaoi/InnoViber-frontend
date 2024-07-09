import { createRef, RefObject, useEffect } from "react";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import { useGlobalStore } from "../../state/GlobalStore";
import "./ChatModule.scss";
import { Typography } from "@mui/material";
import CreateMessageComponent from "../../components/CreateMessageComponent/CreateMessageComponent";
import UsersMessage from "../../components/UsersMessage/UsersMessage";
import OthersMessage from "../../components/OthersMessage/OthersMessage";

const ChatModule = () => {
  const {
    currentChatId,
    currentChat,
    setCurrentChatId,
    getChatById,
    deleteChat,
    messages,
    fetchMessages,
    currentUserId,
  } = useGlobalStore((state) => ({
    currentChatId: state.currentChatId,
    currentChat: state.currentChat,
    setCurrentChatId: state.setCurrentChatId,
    getChatById: state.getChatById,
    deleteChat: state.deleteChat,
    messages: state.messages,
    fetchMessages: state.fetchMessages,
    currentUserId: state.currentUserId,
  }));

  const messagesEnd: RefObject<HTMLDivElement> = createRef();

  useEffect(() => {
    if (currentChatId != "") {
      getChatById(currentChatId);
    }
  }, [getChatById, currentChatId]);

  useEffect(() => {
    if (currentChatId != "") {
      fetchMessages(currentChatId);
    }
  }, [currentChatId, fetchMessages]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEnd]);

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
      <ChatHeader
        chat={currentChat}
        setCurrentChatId={setCurrentChatId}
        deleteChat={deleteChat}
      />
      <div className="ChatBackground" id="Chat_is_opened_bg">
        <div className="Messages_List">
          {messages.map((item) => {
            if (item.userId != currentUserId) {
              return <OthersMessage message={item} key={item.id} />;
            } else {
              return <UsersMessage message={item} key={item.id} />;
            }
          })}
          <div ref={messagesEnd}></div>
        </div>
      </div>
      <CreateMessageComponent />
    </div>
  );
};

export default ChatModule;
