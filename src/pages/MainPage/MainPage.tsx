import Grid from "@mui/material/Grid";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../modules/ChatModule/ChatModule";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <Grid container className="Container">
      <Grid item xs={3}>
        <ChatListModule />
      </Grid>
      <Grid item xs={9}>
        <ChatModule />
      </Grid>
    </Grid>
  );
};

export default MainPage;
