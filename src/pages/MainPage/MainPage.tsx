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
  const {
    setCurrentUser,
    loading,
    currentUserId,
    getFirstChatPage,
    getFirstMessagePage,
    currentChatId,
  } = useGlobalStore();

  useEffect(() => {
    const update = async () => {
      await getFirstChatPage();
      if (currentChatId != "") {
        await getFirstMessagePage(currentChatId);
      }
    };

    const intervalId = setInterval(() => {
      update();
    }, 1000 * 5);
    return () => clearInterval(intervalId);
  }, [currentChatId, getFirstChatPage, getFirstMessagePage]);

  useEffect(() => {
    if (!isAuthenticated) {
      resetGlobalStore();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!loading && currentUserId == "") {
      setCurrentUser(user!);
    }
  }, [currentUserId, loading, setCurrentUser, user]);
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
