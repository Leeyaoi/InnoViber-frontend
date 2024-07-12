import { Avatar } from "@mui/material";
import "./MenuBar.scss";
import { useAuth0 } from "@auth0/auth0-react";
import MenuButton from "../../shared/UI/MenuButton/MenuButton";
import { useGlobalStore } from "../../state/GlobalStore";

const MenuBar = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { setCurrentChatId } = useGlobalStore();

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
                  task: () => {
                    logout();
                    setCurrentChatId("");
                  },
                },
              ]
            : [
                {
                  name: "Login",
                  task: () => {
                    loginWithRedirect();
                    setCurrentChatId("");
                  },
                },
              ]
        }
      />
    </>
  );
};

export default MenuBar;
