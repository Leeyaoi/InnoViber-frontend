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
  const { setCurrentUser, loading, token, setConnection, getMessage } =
    useGlobalStore();

  const joinChat = async (userName: string, userId: string, chatId: string) => {
    const connection = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_API_HUB + "/chatHub", {
        headers: {
          Authorization: token,
        },
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    connection.on(
      "RecieveAdminMessage",
      (userName: string, message: MessageType) => {
        console.log(userName);
        console.log(message);
      }
    );
    connection.on(
      "RecieveMessage",
      (userName: string, message: MessageType) => {
        console.log(userName);
        getMessage(message);
        console.log("got it");
      }
    );
    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, userId, chatId });
      console.log(connection);

      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("reseting store");
    if (!isAuthenticated) {
      resetGlobalStore();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("setting current user");
    if (!loading) {
      setCurrentUser(user!);
    }
  }, [loading, user]);
  return (
    <Grid container className="Container" columns={24}>
      <Grid item xs={1}>
        <MenuBar />
      </Grid>
      <Grid item xs={6}>
        <ChatListModule joinChat={joinChat} />
      </Grid>
      <Grid item xs={17}>
        <ChatModule />
      </Grid>
    </Grid>
  );
};

export default MainPage;
