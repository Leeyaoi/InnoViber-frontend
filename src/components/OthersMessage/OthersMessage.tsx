import { Typography } from "@mui/material";
import "./OthersMessage.scss";
import MessageType from "../../shared/types/MessageType";
import TimeStatusIndicator from "../../shared/UI/TimeStatusIndicator/TimeStatusIndicator";

interface Props {
  message: MessageType;
  userName?: string;
}

const OthersMessage = ({ message, userName = "OtherUser" }: Props) => {
  return (
    <div className="Message_Box">
      <div className="Message others_message">
        <Typography variant="h6">{userName}</Typography>
        <Typography>{message.text}</Typography>
        <TimeStatusIndicator
          date={message.date}
          status={message.status}
          reverse={true}
        />
      </div>
    </div>
  );
};

export default OthersMessage;
