import { Container } from "@mui/material";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import BigChatModule from "../../modules/BigChatModule/BigChatModule";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <Container className="Container">
      <ChatListModule />
      <BigChatModule />
    </Container>
  );
};

export default MainPage;
