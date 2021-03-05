import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Button as BootstrapButton } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <BootstrapButton className="btn-red" onClick={() => loginWithRedirect()}>
      Log In
    </BootstrapButton>
  );
};

export default LoginButton;
