import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { IconButton, TextField } from "@mui/material";
import "./CreateMessageComponent.scss";

const CreateMessageComponent = () => {
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
        />
      </div>
      <IconButton onClick={() => {}}>
        <SendRoundedIcon />
      </IconButton>
    </div>
  );
};

export default CreateMessageComponent;
