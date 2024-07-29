import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./AddRoleComponent.scss";
import { useGlobalStore } from "../../state/GlobalStore";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import CreateRoleModal from "../CreateRoleModal/CreateRoleModal";
import { useState } from "react";

interface Props {
  mobile?: boolean;
}

const AddRoleComponent = ({ mobile = false }: Props) => {
  const { toggleOpen } = useGlobalStore();
  const [open, setOpen] = useState(false);

  const handleClick = () => {};
  return (
    <div className="AddRole" onClick={handleClick}>
      {mobile ? (
        <IconButton onClick={toggleOpen}>
          <FormatListBulletedRoundedIcon
            className="Icon"
            id="MainPage_ChatModule_Header_Menu"
          />
        </IconButton>
      ) : (
        <></>
      )}
      <IconButton id="AddRole_Button" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      <Typography className="AddRole_Label">Add user</Typography>
      <CreateRoleModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default AddRoleComponent;
