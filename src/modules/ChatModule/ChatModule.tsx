import { createRef, RefObject, useEffect, useState } from "react";
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
  } = useGlobalStore();

  const [loaded, setIsLoaded] = useState(false);

  const messagesEnd: RefObject<HTMLDivElement> = createRef();

  useEffect(() => {
    console.log("fetching opened chat");
    if (currentChatId != "") {
      getChatById(currentChatId);
    }
  }, [getChatById, currentChatId]);

  useEffect(() => {
    console.log("fetching messages");
    if (currentChatId != "") {
      fetchMessages(currentChatId);
    }
  }, [currentChatId, fetchMessages]);

  useEffect(() => {
    console.log("scroll effect");
    if (loaded) {
      console.log("scrolling");
      console.log(messages);
      messagesEnd.current?.scrollIntoView();
    }
  }, [loaded, messages]);

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
          <div
            id="downDiv"
            ref={messagesEnd}
            onTransitionEnd={() => setIsLoaded(true)}
          ></div>
        </div>
      </div>
      <CreateMessageComponent />
    </div>
  );
};

export default ChatModule;
