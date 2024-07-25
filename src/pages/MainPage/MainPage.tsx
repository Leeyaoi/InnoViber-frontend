import Grid from "@mui/material/Grid";
import ChatListModule from "../../modules/ChatListModule/ChatListModule";
import ChatModule from "../../modules/ChatModule/ChatModule";
import "./MainPage.scss";
import MenuBar from "../../modules/MenuBar/MenuBar";
import { useAuth0 } from "@auth0/auth0-react";
import { resetGlobalStore, useGlobalStore } from "../../state/GlobalStore";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import LargeLaptop from "./LargeLaptop/LargeLaptop";
import SmallLaptop from "./SmallLaptop/SmallLaptop";
import Tablet from "./Tablet/Tablet";
import LargeMobile from "./LargeMobile/LargeMobile";
import UnauthorizedPage from "./UnauthorizedPage/UnauthorizedPage";

const MainPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const {
    setCurrentUser,
    loading,
    currentUserId,
    getFirstChatPage,
    getFirstMessagePage,
    currentChatId,
  } = useGlobalStore();

  useEffect(() => {
    const update = async () => {
      await getFirstChatPage();
      if (currentChatId != "") {
        await getFirstMessagePage(currentChatId);
      }
    };

    const intervalId = setInterval(() => {
      update();
    }, 1000 * 10);
    return () => clearInterval(intervalId);
  }, [currentChatId, getFirstChatPage, getFirstMessagePage]);

  useEffect(() => {
    if (!isAuthenticated) {
      resetGlobalStore();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!loading && currentUserId == "") {
      setCurrentUser(user!);
    }
  }, [currentUserId, loading, setCurrentUser, user]);

  const largeLaptop = useMediaQuery("(max-width:1440px)");
  const smallLaptop = useMediaQuery("(max-width:1300px)");
  const tablet = useMediaQuery("(max-width:768px)");
  const largePhone = useMediaQuery("(max-width:600px)");

  if (currentUserId == "") {
    return <UnauthorizedPage />;
  }

  if (largePhone) {
    return <LargeMobile />;
  }

  if (tablet) {
    return <Tablet />;
  }

  if (smallLaptop) {
    return <SmallLaptop />;
  }

  if (largeLaptop) {
    return <LargeLaptop />;
  }
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
