import Grid from "@mui/material/Grid";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../modules/ChatModule/ChatModule";
import "./MainPage.scss";
import MenuBar from "../../modules/MenuBar/MenuBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalStore } from "../../state/GlobalStore";
import { useEffect } from "react";

const MainPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setCurrentUser, isExists, createUser } = useGlobalStore();
  useEffect(() => {
    setCurrentUser(user!);

    if (!isExists(user)) {
      createUser(user);
    }
  }, [createUser, isAuthenticated, isExists, setCurrentUser, user]);
  return (
    <Grid container className="Container" columns={24}>
      <Grid item xs={1}>
        <MenuBar />
      </Grid>
      <Grid item xs={6}>
        <ChatListModule />
      </Grid>
      <Grid item xs={17}>
        <ChatModule />
      </Grid>
    </Grid>
  );
};

export default MainPage;
