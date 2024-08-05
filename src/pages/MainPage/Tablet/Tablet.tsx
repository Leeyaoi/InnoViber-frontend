import { Grid } from "@mui/material";
import ChatListModule from "../../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../../modules/ChatModule/ChatModule";
import MenuBar from "../../../modules/MenuBar/MenuBar";
import { useGlobalStore } from "../../../state/GlobalStore";
import "./Tablet.scss";
import RoleListModule from "../../../modules/RoleListModule/RoleListModule";

const Tablet = () => {
  const { currentChatId, open } = useGlobalStore();
  if (currentChatId == "") {
    return (
      <Grid container className="Container">
        <Grid item xs={1}>
          <MenuBar />
        </Grid>
        <Grid item xs={11}>
          <ChatListModule />
        </Grid>
      </Grid>
    );
  }
  if (open) {
    return (
      <Grid container className="Container">
        <Grid item xs={1}>
          <MenuBar />
        </Grid>
        <Grid item xs={6}>
          <ChatModule />
        </Grid>
        <Grid item xs={5}>
          <RoleListModule />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container className="Container">
      <Grid item xs={1}>
        <MenuBar />
      </Grid>
      <Grid item xs={11}>
        <ChatModule />
      </Grid>
    </Grid>
  );
};
export default Tablet;
