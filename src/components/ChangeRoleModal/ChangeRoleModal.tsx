import {
  Modal,
  Typography,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./ChangeRoleModal.scss";
import { useState } from "react";
import { UserRoles } from "../../shared/types/UserRolesEnum";
import { useGlobalStore } from "../../state/GlobalStore";

interface Props {
  open: boolean;
  setOpen: (o: boolean) => void;
  roleObj: RoleType;
}

const ChangeRoleModal = ({ open, setOpen, roleObj }: Props) => {
  const [role, setRole] = useState("");
  const { changeRole } = useGlobalStore();

  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const getRole = () => {
    switch (role) {
      case "0":
        return UserRoles.Member;
      case "1":
        return UserRoles.Owner;
      default:
        return UserRoles.Admin;
    }
  };

  const handleClick = () => {
    roleObj.role = getRole();
    changeRole(roleObj);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="ChangeRoleModal_bg">
      <div className="ChangeRoleModal">
        <Typography id="ChangeRoleModal_Label" variant="h1">
          Select user's role
        </Typography>
        <Select
          id="ChangeRoleModal-select"
          value={role}
          onChange={handleChange}
        >
          <MenuItem value="0">Member</MenuItem>
          <MenuItem value="1">Owner</MenuItem>
          <MenuItem value="2">Admin</MenuItem>
        </Select>
        <Button
          variant="outlined"
          id="ChangeRoleModal_Button"
          onClick={handleClick}
        >
          Change role
        </Button>
      </div>
    </Modal>
  );
};

export default ChangeRoleModal;
