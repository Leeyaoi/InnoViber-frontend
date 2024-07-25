import { Grid } from "@mui/material";
import ChatListModule from "../../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../../modules/ChatModule/ChatModule";
import MenuBar from "../../../modules/MenuBar/MenuBar";
import "./SmallLaptop.scss";

const SmallLaptop = () => {
  return (
    <Grid container className="Container" columns={48}>
      <Grid item xs={3}>
        <MenuBar />
      </Grid>
      <Grid item xs={12}>
        <ChatListModule />
      </Grid>
      <Grid item xs={33}>
        <ChatModule />
      </Grid>
    </Grid>
  );
};

export default SmallLaptop;
