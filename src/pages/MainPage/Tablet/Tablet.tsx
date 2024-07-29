import { Grid } from "@mui/material";
import ChatListModule from "../../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../../modules/ChatModule/ChatModule";
import MenuBar from "../../../modules/MenuBar/MenuBar";
import { useGlobalStore } from "../../../state/GlobalStore";
import "./Tablet.scss";

const Tablet = () => {
  const { currentChatId } = useGlobalStore();
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
