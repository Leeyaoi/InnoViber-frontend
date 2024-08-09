import ChatType from "../../shared/types/ChatType";
import { useGlobalStore } from "../../state/GlobalStore";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import "./ChatItem.scss";
import { Avatar, Typography } from "@mui/material";
import { MessageStatus } from "../../shared/types/MessageStatus";

interface Props {
  chat?: ChatType;
}

const ChatItem = ({ chat }: Props) => {
  const { currentUserId, messages } = useGlobalStore();

  const hasNewMessages = () => {
    const lastMessage = chat?.lastMessage;
    
    if (
      !lastMessage ||
      lastMessage.chatId !== chat.id ||
      lastMessage.userId === currentUserId ||
      messages.findIndex((m) => m.id === lastMessage.id) >= 0 ||
      lastActivity === null
    ) {
      return false;
    }

    if (lastMessage.status === MessageStatus.Delivered) {
      return true;
    }

    return chat?.lastActivity && chat.lastActivity < lastMessage.date;
  };

  return (
    <div className="MainPage_ChatList_ChatItem">
      <Avatar src="\profile.jpg" />
      <div className="MainPage_ChatList_ChatItem_ChatInfo">
        <Typography variant="h2">{chat?.name}</Typography>
        <Typography>
          {chat?.lastMessage.userId == currentUserId ? "You: " : "Other user: "}{" "}
          {chat?.lastMessage.text
            ? chat?.lastMessage.text?.slice(0, 17)
            : "Be first to write"}
        </Typography>
      </div>
      {hasNewMessages() ? <CircleRoundedIcon id="ChatItemIndicator" /> : <></>}
    </div>
  );
};

export default ChatItem;
