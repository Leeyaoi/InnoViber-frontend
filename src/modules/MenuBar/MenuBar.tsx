import { Avatar } from "@mui/material";
import "./MenuBar.scss";
import { useAuth0 } from "@auth0/auth0-react";
import MenuButton from "../../shared/UI/MenuButton/MenuButton";

const MenuBar = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <>
      <Avatar
        src={isAuthenticated ? user?.picture : "profile.jpg"}
        className="UserPhoto"
        slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      ></Avatar>
      <MenuButton
        id="MainPage_MenuBar_LoginMenu"
        options={
          isAuthenticated
            ? [
                {
                  name: "Log out",
                  task: logout,
                },
              ]
            : [
                {
                  name: "Login",
                  task: loginWithRedirect,
                },
              ]
        }
      />
    </>
  );
};

export default MenuBar;
