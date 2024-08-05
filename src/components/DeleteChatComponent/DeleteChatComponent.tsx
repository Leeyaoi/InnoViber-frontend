import { Button } from "@mui/material";
import { useGlobalStore } from "../../state/GlobalStore";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./DeleteChatComponent.scss";

const DeleteChatComponent = () => {
  const { deleteChat, setCurrentChatId, currentChatId, close } =
    useGlobalStore();
  const handleDelete = () => {
    deleteChat(currentChatId);
    setCurrentChatId("");
    close();
  };
  return (
    <div id="DeleteChatComponent">
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        startIcon={<CloseRoundedIcon />}
        id="DeleteChatComponent_Button"
      >
        Delete chat
      </Button>
    </div>
  );
};

export default DeleteChatComponent;
