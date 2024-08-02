import { MessageStatus } from "../../types/MessageStatus";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import "./TimeStatusIndicator.scss";
import { Typography } from "@mui/material";

interface Props {
  date: string | number;
  status?: MessageStatus;
  reverse?: boolean;
}

const TimeStatusIndicator = ({
  date,
  status = MessageStatus.Send,
  reverse = false,
}: Props) => {
  const getStatusIcon = () => {
    switch (status) {
      case MessageStatus.Send:
        return <AccessTimeRoundedIcon className="status_icon" />;
      case MessageStatus.Delivered:
        return <CheckRoundedIcon className="status_icon" />;
      default:
        return <DoneAllRoundedIcon className="status_icon" />;
    }
  };
  if (reverse) {
    return (
      <div className="TimeStatusIndicator">
        <Typography variant="h6" className="MessageTime">
          {new Date(date).toLocaleString("by-BR", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </Typography>
      </div>
    );
  } else {
    return (
      <div className="TimeStatusIndicator">
        {getStatusIcon()}
        {"\t"}
        <Typography variant="h6" className="MessageTime">
          {new Date(date).toLocaleString("by-BR", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </Typography>
      </div>
    );
  }
};

export default TimeStatusIndicator;
