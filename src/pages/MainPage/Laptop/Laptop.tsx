import { Grid } from "@mui/material";
import ChatListModule from "../../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../../modules/ChatModule/ChatModule";
import MenuBar from "../../../modules/MenuBar/MenuBar";
import "./Laptop.scss";

const Laptop = () => {
  return (
    <Grid container className="Container" columns={48}>
      <Grid item xs={3} lg={2}>
        <MenuBar />
      </Grid>
      <Grid item xs={12} lg={12}>
        <ChatListModule />
      </Grid>
      <Grid item xs={33} lg={34}>
        <ChatModule />
      </Grid>
    </Grid>
  );
};

export default Laptop;
