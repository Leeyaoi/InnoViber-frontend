import ChatType from "../../shared/types/ChatType";
import "./ChatHeader.scss";
import { Avatar, Typography, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { useGlobalStore } from "../../state/GlobalStore";

interface Props {
  chat: ChatType;
  setCurrentChatId: (id: string) => void;
}

const ChatHeader = ({ chat, setCurrentChatId }: Props) => {
  const { toggleOpen, close } = useGlobalStore();
  return (
    <div>
      <div className="MainPage_ChatModule_Header">
        <div className="MainPage_ChatModule_MainData">
          <IconButton
            id="MainPage_ChatModule_Header_ArrowButton"
            onClick={() => {
              setCurrentChatId("");
              close();
            }}
          >
            <ArrowBackRoundedIcon id="MainPage_ChatModule_Header_Arrow" />
          </IconButton>
          <Avatar id="MainPage_ChatModule_Header_Avatar" src="\profile.jpg" />
          <Typography id="MainPage_ChatModule_Header_Name" variant="h1">
            {chat.name}
          </Typography>
        </div>
        <IconButton onClick={toggleOpen}>
          <FormatListBulletedRoundedIcon
            className="Icon"
            id="MainPage_ChatModule_Header_Menu"
          />
        </IconButton>
      </div>
    </div>
  );
};
export default ChatHeader;
