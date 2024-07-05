import ShortChatType from "../../shared/types/ShortChatType";
import "./BigChatHeader.scss";
import { Avatar, Typography, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MenuUIItem from "../../shared/UI/MenuUIItem/MenuUIItem";

interface Props {
  chat: ShortChatType;
  updateCurrentChat: (id: string) => void;
  deleteChat: (id: string) => void;
}

const BigChatHeader = ({ chat, updateCurrentChat, deleteChat }: Props) => {
  return (
    <div className="MainPage_BigChatModule_Header">
      <div className="MainPage_BigChatModule_MainData">
        <IconButton
          className="MainPage_BigChatModule_Header_ArrowButton"
          onClick={() => {
            updateCurrentChat("");
          }}
        >
          <ArrowBackRoundedIcon className="MainPage_BigChatModule_Header_Arrow" />
        </IconButton>
        <Avatar
          className="MainPage_BigChatModule_Header_Avatar"
          src="\profile.jpg"
        />
        <Typography className="MainPage_BigChatModule_Header_Name" variant="h1">
          {chat.name}
        </Typography>
      </div>
      <MenuUIItem
        className="MainPage_BigChatModule_Header_Menu"
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

export default BigChatHeader;
