import Grid from "@mui/material/Grid";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../modules/ChatModule/ChatModule";
import "./MainPage.scss";
import MenuBar from "../../modules/MenuBar/MenuBar";
import { useAuth0 } from "@auth0/auth0-react";
import { resetGlobalStore, useGlobalStore } from "../../state/GlobalStore";
import { useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import MessageType from "../../shared/types/MessageType";

const MainPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const {
    setCurrentUser,
    loading,
    currentUser,
    token,
    getMessage,
    currentUserId,
    connection,
    setConnection,
  } = useGlobalStore();

  const join = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_API_HUB + "/chatHub", {
        headers: {
          Authorization: token,
        },
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    connection.on("RecieveMessage", (message: MessageType) => {
      getMessage(message);
      console.log("got it");
    });
    try {
      await connection.start();
      await connection.invoke("Join", currentUser.auth0Id);
      console.log(connection);

      setConnection(connection);
    } catch (e) {
      console.log("error: " + e);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("resetting");
      resetGlobalStore();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!loading && currentUser.auth0Id != user?.sub) {
      console.log("setting current user");
      setCurrentUser(user!);
    }
  }, [currentUser.auth0Id, loading, setCurrentUser, user]);

  useEffect(() => {
    if (currentUserId != "" && !("state" in connection)) {
      console.log("joining");
      join();
    }
  }, [connection, currentUserId]);
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
