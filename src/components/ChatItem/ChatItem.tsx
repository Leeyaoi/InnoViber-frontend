import "./ChatItem.scss";
import { Avatar, Typography } from "@mui/material";

interface Props {
  chatName?: string;
  lastMessage?: string;
}

const ChatItem = ({
  chatName = "Default Chat",
  lastMessage = "Be first to write",
}: Props) => {
  return (
    <div className="MainPage_ChatList_ChatItem">
      <Avatar src="\profile.jpg" />
      <div className="MainPage_ChatList_ChatItem_ChatInfo">
        <Typography variant="h2">{chatName}</Typography>
        <Typography>{lastMessage}</Typography>
      </div>
    </div>
  );
};

export default ChatItem;
