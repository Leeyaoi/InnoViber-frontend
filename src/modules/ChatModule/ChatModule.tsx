import ChatHeader from "../../components/ChatHeader/ChatHeader";
import { useChatState } from "../../state/ChatSlice";
import "./ChatModule.scss";

const ChatModule = () => {
  const { currentChatId, chats, updateCurrentChat, deleteChat } = useChatState(
    (state) => ({
      currentChatId: state.currentChatId,
      chats: state.chats,
      updateCurrentChat: state.updateCurrentChat,
      deleteChat: state.deleteChat,
    })
  );

  const chat = chats.find((chat) => chat.id === currentChatId);
  if (typeof chat == "undefined") {
    return <></>;
  }
  return (
    <div className="ChatModule">
      <ChatHeader
        chat={chat}
        updateCurrentChat={updateCurrentChat}
        deleteChat={deleteChat}
      />
    </div>
  );
};

export default ChatModule;
