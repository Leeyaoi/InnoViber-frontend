import ChatType from "../../shared/types/ChatType";
import "./ChatHeader.scss";
import { Avatar, Typography, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MenuButton from "../../shared/UI/MenuButton/MenuButton";

interface Props {
  chat: ChatType;
  setCurrentChatId: (id: string) => void;
  deleteChat: (id: string) => void;
}

const ChatHeader = ({ chat, setCurrentChatId, deleteChat }: Props) => {
  return (
    <div>
      <div className="MainPage_ChatModule_Header">
        <div className="MainPage_ChatModule_MainData">
          <IconButton
            id="MainPage_ChatModule_Header_ArrowButton"
            onClick={() => {
              setCurrentChatId("");
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
                setCurrentChatId("");
                deleteChat(chat.id);
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
