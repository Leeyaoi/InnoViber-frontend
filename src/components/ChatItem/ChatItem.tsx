import ChatType from "../../shared/types/ChatType";
import { useGlobalStore } from "../../state/GlobalStore";
import "./ChatItem.scss";
import { Avatar, Typography } from "@mui/material";

interface Props {
  chat?: ChatType;
}

const ChatItem = ({ chat }: Props) => {
  const { currentUserId } = useGlobalStore();
  return (
    <div className="MainPage_ChatList_ChatItem">
      <Avatar src="\profile.jpg" />
      <div className="MainPage_ChatList_ChatItem_ChatInfo">
        <Typography variant="h2">{chat?.name}</Typography>
        <Typography>
          {chat?.lastMessageUserId == currentUserId ? "You: " : "Other user: "}{" "}
          {chat?.lastMessageText
            ? chat?.lastMessageText?.slice(0, 17)
            : "Be first to write"}
        </Typography>
      </div>
    </div>
  );
};

export default ChatItem;
