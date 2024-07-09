import Grid from "@mui/material/Grid";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../modules/ChatModule/ChatModule";
import "./MainPage.scss";
import MenuBar from "../../modules/MenuBar/MenuBar";

const MainPage = () => {
  return (
    <Grid container className="Container">
      <Grid item xs={0.5}>
        <MenuBar />
      </Grid>
      <Grid item xs={3}>
        <ChatListModule />
      </Grid>
      <Grid item xs={8.5}>
        <ChatModule />
      </Grid>
    </Grid>
  );
};

export default MainPage;
