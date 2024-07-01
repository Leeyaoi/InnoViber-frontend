import "./ChatComponent.scss";
import { Avatar, Typography } from "@mui/material";

interface Props {
  chatName?: string;
  lastMessage?: string;
}

const ChatComponent = ({
  chatName = "Default Chat",
  lastMessage = "Be first to write",
}: Props) => {
  return (
    <div className="MainPage_ChatList_ChatBlock">
      <Avatar src="src\shared\assets\profile.jpg" />
      <div className="MainPage_ChatList_ChatBlock_ChatInfo">
        <Typography variant="h1">{chatName}</Typography>
        <Typography>{lastMessage}</Typography>
      </div>
    </div>
  );
};

export default ChatComponent;
