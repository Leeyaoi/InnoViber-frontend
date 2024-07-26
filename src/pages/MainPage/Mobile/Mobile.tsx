import { Grid } from "@mui/material";
import ChatListModule from "../../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../../modules/ChatModule/ChatModule";
import MenuBar from "../../../modules/MenuBar/MenuBar";
import "./Mobile.scss";
import { useGlobalStore } from "../../../state/GlobalStore";
import RoleListModule from "../../../modules/RoleListModule/RoleListModule";

const Mobile = () => {
  const { currentChatId, open } = useGlobalStore();
  if (currentChatId == "") {
    return (
      <Grid container className="Container">
        <Grid item xs={2}>
          <MenuBar />
        </Grid>
        <Grid item xs={10}>
          <ChatListModule />
        </Grid>
      </Grid>
    );
  }

  if (open) {
    return (
      <Grid container className="Container">
        <Grid item xs={12}>
          <RoleListModule mobile={true} />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container className="Container">
      <Grid item xs={12}>
        <ChatModule />
      </Grid>
    </Grid>
  );
};

export default Mobile;
