import { Typography } from "@mui/material";
import "./OthersMessage.scss";

interface Props {
  text: string;
  userName?: string;
}

const OthersMessage = ({ text, userName = "OtherUser" }: Props) => {
  return (
    <div className="OthersMessage_Box">
      <div className="OthersMessage">
        <Typography variant="h6">{userName}</Typography>
        <Typography>{text}</Typography>
      </div>
    </div>
  );
};

export default OthersMessage;
