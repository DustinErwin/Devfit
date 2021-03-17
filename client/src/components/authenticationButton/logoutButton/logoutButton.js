import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button as BootstrapButton } from "react-bootstrap";
import IsShoppingContext from "../../../utilities/isShoppingContext";
import UserLogged from "../../../utilities/userLogged";

const LogoutButton = () => {
  const { setIsShopping } = useContext(IsShoppingContext);
  const { setUserLogged } = useContext(UserLogged);
  const { logout } = useAuth0();
  return (
    <BootstrapButton
      className="btn-dark"
      onClick={() => {
        setUserLogged(false);
        setIsShopping(false);
        logout({
          returnTo: window.location.origin,
        });
      }}
    >
      Log Out
    </BootstrapButton>
  );
};

export default LogoutButton;
