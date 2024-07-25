import Button from "@mui/material/Button/Button";
import "./UnauthorizedPage.scss";
import { useAuth0 } from "@auth0/auth0-react";

const UnauthorizedPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="UnauthorizedPage">
      <div className="ImgBlur">
        <Button
          id="Login_btn"
          variant="contained"
          size="large"
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
