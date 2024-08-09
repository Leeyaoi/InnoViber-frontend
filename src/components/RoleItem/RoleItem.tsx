import { Avatar, Typography } from "@mui/material";
import { UserRoles } from "../../shared/types/UserRolesEnum";
import { UserType } from "../../shared/types/UserType";
import "./RoleItem.scss";
import { useGlobalStore } from "../../state/GlobalStore";
import MenuButton from "../../shared/UI/MenuButton/MenuButton";
import { useState } from "react";
import ChangeRoleModal from "../ChangeRoleModal/ChangeRoleModal";
import ProfileModal from "../ProfileModal/ProfileModal";

interface Props {
  user: UserType;
  role: RoleType;
}

const RoleItem = ({ user, role }: Props) => {
  const { deleteRole, currentRole, currentUserId } = useGlobalStore();
  const [open, setOpen] = useState(false);
  const [openProfile, setProfileOpen] = useState(false);

  const isUserCorrect = () => {
    return (
      currentRole !== UserRoles.Member &&
      typeof user !== "undefined" &&
      user.auth0Id != currentUserId
    );
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
        task: () => {
          setOpen(true);
        },
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
        onClick={() => setProfileOpen(true)}
      />
      <div className="RoleItem_UserInfo">
        <Typography variant="h2">{user?.name}</Typography>
        {UserRoles[role.role]}
      </div>
      {isUserCorrect() ? (
        <>
          <MenuButton options={getOptions()} id="UserRoleMenu" />
          <ChangeRoleModal open={open} setOpen={setOpen} roleObj={role} />
        </>
      ) : (
        <></>
      )}
      <ProfileModal open={openProfile} setOpen={setProfileOpen} user={user} />
    </div>
  );
};

export default RoleItem;
