import Grid from "@mui/material/Grid";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../modules/ChatModule/ChatModule";
import "./MainPage.scss";
import MenuBar from "../../modules/MenuBar/MenuBar";
import { GetToken } from "../../shared/helpers/client";

const MainPage = () => {
  GetToken();
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
