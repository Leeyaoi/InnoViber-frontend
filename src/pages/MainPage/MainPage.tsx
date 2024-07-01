import { Container } from "@mui/material";
import ChatListModule from "../../shared/components/modules/ChatListModule/ChatListModule";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <Container sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
      <ChatListModule />
    </Container>
  );
};

export default MainPage;
