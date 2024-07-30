import "./MainPage.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { resetGlobalStore, useGlobalStore } from "../../state/GlobalStore";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import Laptop from "./Laptop/Laptop";
import Tablet from "./Tablet/Tablet";
import Mobile from "./Mobile/Mobile";
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

  const tablet = useMediaQuery("(max-width:768px)");
  const mobile = useMediaQuery("(max-width:600px)");

  if (currentUserId == "") {
    return <UnauthorizedPage />;
  }

  if (mobile) {
    return <Mobile />;
  }

  if (tablet) {
    return <Tablet />;
  }

  return <Laptop />;
};

export default MainPage;
