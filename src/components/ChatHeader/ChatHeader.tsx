import ShortChatType from "../../shared/types/ShortChatType";
import "./ChatHeader.scss";
import { Avatar, Typography, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MenuButton from "../../shared/UI/MenuButton/MenuButton";

interface Props {
  chat: ShortChatType;
  updateCurrentChat: (id: string) => void;
  deleteChat: (id: string) => void;
}

const ChatHeader = ({ chat, updateCurrentChat, deleteChat }: Props) => {
  return (
    <div className="MainPage_ChatModule_Header">
      <div className="MainPage_ChatModule_MainData">
        <IconButton
          id="MainPage_ChatModule_Header_ArrowButton"
          onClick={() => {
            updateCurrentChat("");
          }}
        >
          <ArrowBackRoundedIcon id="MainPage_ChatModule_Header_Arrow" />
        </IconButton>
        <Avatar id="MainPage_ChatModule_Header_Avatar" src="\profile.jpg" />
        <Typography id="MainPage_ChatModule_Header_Name" variant="h1">
          {chat.name}
        </Typography>
      </div>
      <MenuButton
        id="MainPage_ChatModule_Header_Menu"
        options={[
          {
            name: "Delete",
            task: () => {
              updateCurrentChat("");
              deleteChat(chat.id);
            },
          },
        ]}
      />
    </div>
  );
};

export default ChatHeader;
