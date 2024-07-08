import { Typography } from "@mui/material";
import "./UsersMessage.scss";

interface Props {
  text: string;
}

const UsersMessage = ({ text }: Props) => {
  return (
    <div className="UsersMessage_Box">
      <div className="UsersMessage">
        <Typography>{text}</Typography>
      </div>
    </div>
  );
};

export default UsersMessage;
