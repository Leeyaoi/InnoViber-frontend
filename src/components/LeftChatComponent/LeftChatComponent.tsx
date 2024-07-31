import { Button } from "@mui/material";
import { useGlobalStore } from "../../state/GlobalStore";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./LeftChatComponent.scss";

const LeftChatComponent = () => {
  const { deleteRole, setCurrentChatId, roles, currentUserId, close } =
    useGlobalStore();
  const handleExit = () => {
    const role =
      roles.find((r) => r.userId == currentUserId) ?? ({} as RoleType);
    deleteRole(role);
    setCurrentChatId("");
    close();
  };
  return (
    <div id="LeftChatComponent">
      <Button
        variant="contained"
        color="error"
        onClick={handleExit}
        startIcon={<CloseRoundedIcon />}
        id="LeftChatComponent_Button"
      >
        Leave chat
      </Button>
    </div>
  );
};

export default LeftChatComponent;
