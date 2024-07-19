import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { IconButton, TextField } from "@mui/material";
import "./CreateMessageComponent.scss";
import { useGlobalStore } from "../../state/GlobalStore";
import { useState } from "react";

const CreateMessageComponent = () => {
  const { currentChatId, currentUserId, createMessage } = useGlobalStore();

  const [messageText, setMessageText] = useState("");

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessageText(event.target.value);
  };

  const handleClick = () => {
    console.log("clicked!");
    createMessage(currentChatId, currentUserId, messageText);
    console.log("created");
    setMessageText("");
    console.log("cleared");
  };

  return (
    <div id="CreateMessageComponent">
      <IconButton onClick={() => {}}>
        <AttachFileRoundedIcon />
      </IconButton>
      <div className="CreateMessageComponent_Input_Box">
        <TextField
          fullWidth
          autoFocus
          multiline
          maxRows={1}
          id="outlined-multiline-flexible"
          className="CreateMessageComponent_Input"
          variant="outlined"
          placeholder="Write message"
          onChange={handleTextInputChange}
          value={messageText}
        />
      </div>
      <IconButton onClick={handleClick}>
        <SendRoundedIcon />
      </IconButton>
    </div>
  );
};

export default CreateMessageComponent;
