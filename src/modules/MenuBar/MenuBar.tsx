import { Avatar, Button } from "@mui/material";
import "./MenuBar.scss";
import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  return (
    <Button
      onClick={() => {
        console.log(isAuthenticated);
        if (!isAuthenticated) {
          loginWithRedirect();
        } else {
          console.log(user);
          console.log(user?.picture);
        }
      }}
    >
      <Avatar
        src={isAuthenticated ? user?.picture : "profile.jpg"}
        className="UserPhoto"
        slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      ></Avatar>
    </Button>
  );
};

export default MenuBar;
