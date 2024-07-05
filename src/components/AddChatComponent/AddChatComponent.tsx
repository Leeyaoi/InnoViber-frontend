import "./AddChatComponent.scss";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddChatFormComponent from "../AddChatFormComponent/AddChatFormComponent";
import { useState } from "react";

const AddChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="MainPage_ChatList_AddChat" onClick={handleClick}>
      <IconButton className="MainPage_ChatList_AddChat_Button">
        <AddIcon />
      </IconButton>
      <Typography className="MainPage_ChatList_AddChat_Label">
        Add chat
      </Typography>
      <AddChatFormComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default AddChatComponent;
