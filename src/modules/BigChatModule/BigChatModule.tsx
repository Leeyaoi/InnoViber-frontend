import BigChatHeader from "../../components/BigChatHeader/BigChatHeader";
import { useChatState } from "../../state/ChatSlice";
import "./BigChatModule.scss";

const BigChatModule = () => {
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
    <BigChatHeader
      chat={chat}
      updateCurrentChat={updateCurrentChat}
      deleteChat={deleteChat}
    />
  );
};

export default BigChatModule;
