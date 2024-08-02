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
  const [role, setRole] = useState<UserRoles>(roleObj.role);
  const { changeRole } = useGlobalStore();

  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as unknown as UserRoles);
  };

  const handleClick = () => {
    roleObj.role = role as UserRoles;
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
          value={role as unknown as string}
          onChange={handleChange}
        >
          <MenuItem value={UserRoles.Member}>Member</MenuItem>
          <MenuItem value={UserRoles.Owner}>Owner</MenuItem>
          <MenuItem value={UserRoles.Admin}>Admin</MenuItem>
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
