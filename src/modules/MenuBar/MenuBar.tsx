import { Avatar, Button } from "@mui/material";
import "./MenuBar.scss";
import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect()}>
      <Avatar src="profile.jpg" className="UserPhoto"></Avatar>
    </Button>
  );
};

export default MenuBar;
