import Grid from "@mui/material/Grid";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../modules/ChatModule/ChatModule";
import "./MainPage.scss";
import MenuBar from "../../modules/MenuBar/MenuBar";
import { useAuth0 } from "@auth0/auth0-react";
import { resetGlobalStore, useGlobalStore } from "../../state/GlobalStore";
import { useEffect } from "react";

const MainPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setCurrentUser, isExists, createUser, loading } = useGlobalStore();

  useEffect(() => {
    if (!isAuthenticated) {
      resetGlobalStore();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    async function ensureUserCreated() {
      const exists = await isExists(user);
      if (!exists) {
        createUser(user);
      }
    }
    ensureUserCreated();
  }, [createUser, isAuthenticated, isExists, user]);

  useEffect(() => {
    if (!loading) {
      setCurrentUser(user!);
    }
  }, [loading, setCurrentUser, user]);
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
