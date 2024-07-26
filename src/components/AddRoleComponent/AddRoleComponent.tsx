import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./AddRoleComponent.scss";
import { useGlobalStore } from "../../state/GlobalStore";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";

interface Props {
  mobile?: boolean;
}

const AddRoleComponent = ({ mobile = false }: Props) => {
  const { toggleOpen } = useGlobalStore();

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
      <IconButton id="AddRole_Button">
        <AddIcon />
      </IconButton>
      <Typography className="AddRole_Label">Add user</Typography>
    </div>
  );
};

export default AddRoleComponent;
