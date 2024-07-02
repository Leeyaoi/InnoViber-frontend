import { Container } from "@mui/material";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <Container className="Container">
      <ChatListModule />
    </Container>
  );
};

export default MainPage;
