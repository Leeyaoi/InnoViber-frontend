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
    if (typeof chat?.lastMessage == "undefined") {
      return false;
    }
    if (chat?.lastMessage.chatId != chat.id) {
      return false;
    }
    if (chat?.lastMessage.userId == currentUserId) {
      return false;
    }
    if (chat?.lastMessage.status == MessageStatus.Delivered) {
      return true;
    }
    if (chat?.lastActivity === null) {
      return false;
    }
    if (messages.findIndex((m) => m.id == chat.lastMessage.id) >= 0) {
      return false;
    }
    return chat?.lastActivity < chat?.lastMessage.date;
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
