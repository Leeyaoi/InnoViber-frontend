import { Typography } from "@mui/material";
import "./UsersMessage.scss";
import MessageType from "../../shared/types/MessageType";
import TimeStatusIndicator from "../../shared/UI/TimeStatusIndicator/TimeStatusIndicator";

interface Props {
  message: MessageType;
}

const UsersMessage = ({ message }: Props) => {
  return (
    <div className="Message_Box">
      <div className="Message users_message">
        <Typography>{message.text}</Typography>
        <TimeStatusIndicator date={message.date} status={message.status} />
      </div>
    </div>
  );
};

export default UsersMessage;
