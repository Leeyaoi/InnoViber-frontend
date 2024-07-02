import "./AddChatComponent.scss";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddChatComponent = () => {
  return (
    <div className="MainPage_ChatList_AddChat">
      <IconButton
        className="MainPage_ChatList_AddChat_Button"
        sx={
          {
            //bgcolor: "primary.dark",
          }
        }
      >
        <AddIcon />
      </IconButton>
      <Typography className="MainPage_ChatList_AddChat_Label">
        Add chat
      </Typography>
    </div>
  );
};

export default AddChatComponent;
