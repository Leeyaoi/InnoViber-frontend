import { Avatar } from "@mui/material";
import "./MenuBar.scss";
import { useAuth0 } from "@auth0/auth0-react";
import MenuButton from "../../shared/UI/MenuButton/MenuButton";
import { resetGlobalStore, useGlobalStore } from "../../state/GlobalStore";
import { useState } from "react";
import ProfileModal from "../../components/ProfileModal/ProfileModal";

const MenuBar = () => {
  const { isAuthenticated, logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const { currentUser } = useGlobalStore();

  return (
    <>
      <Avatar
        src={isAuthenticated ? currentUser?.userPhoto : "profile.jpg"}
        id="UserPhoto"
        slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      ></Avatar>
      <MenuButton
        id="MainPage_MenuBar_LoginMenu"
        options={[
          {
            name: "Log out",
            task: () => {
              logout();
              resetGlobalStore();
            },
          },
          {
            name: "Profile",
            task: () => {
              setOpen(true);
            },
          },
        ]}
      />
      <ProfileModal open={open} setOpen={setOpen} user={currentUser} />
    </>
  );
};

export default MenuBar;
