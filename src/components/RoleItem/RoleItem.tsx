import { Avatar, Typography } from "@mui/material";
import { UserRoles } from "../../shared/types/UserRolesEnum";
import { UserType } from "../../shared/types/UserType";
import "./RoleItem.scss";
import { useGlobalStore } from "../../state/GlobalStore";
import MenuButton from "../../shared/UI/MenuButton/MenuButton";

interface Props {
  user: UserType;
  role: RoleType;
}

const RoleItem = ({ user, role }: Props) => {
  const { deleteRole, currentRole, currentUserId } = useGlobalStore();
  const getRoleName = () => {
    switch (role.role) {
      case UserRoles.Admin:
        return "Admin";
      case UserRoles.Owner:
        return "Owner";
      default:
        return "Member";
    }
  };

  const getOptions = () => {
    return [
      {
        name: "Kick user",
        task: () => {
          deleteRole(role);
        },
      },
      {
        name: "Change role",
        task: () => {},
      },
    ];
  };

  return (
    <div className="RoleItem">
      <Avatar
        src={
          typeof user !== "undefined" ? user.userPhoto : "../../../profile.jpg"
        }
        slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      />
      <div className="RoleItem_UserInfo">
        <Typography variant="h2">{user?.name}</Typography>
        {getRoleName()}
      </div>
      {currentRole !== UserRoles.Member &&
      typeof user !== "undefined" &&
      user.auth0Id != currentUserId ? (
        <MenuButton options={getOptions()} id="UserRoleMenu" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoleItem;
