import "./AddChatComponent.scss";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddChatComponent = () => {
  return (
    <div className="MainPage_ChatList_AddChat">
      <IconButton
        sx={{
          border: "1px solid primary.light",
          color: "primary.light",
          bgcolor: "primary.dark",
        }}
      >
        <AddIcon />
      </IconButton>
      <Typography sx={{ ml: "2rem" }}>Add chat</Typography>
    </div>
  );
};

export default AddChatComponent;
