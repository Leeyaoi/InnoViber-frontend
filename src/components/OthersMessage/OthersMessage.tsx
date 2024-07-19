import { Typography } from "@mui/material";
import "./OthersMessage.scss";
import MessageType from "../../shared/types/MessageType";
import TimeStatusIndicator from "../../shared/UI/TimeStatusIndicator/TimeStatusIndicator";
import { useGlobalStore } from "../../state/GlobalStore";
import { useEffect, useState } from "react";

interface Props {
  message: MessageType;
}

const OthersMessage = ({ message }: Props) => {
  const { getUserById } = useGlobalStore();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    getUserById(message.userId).then((user) => setUserName(user.nickName));
  }, []);
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
