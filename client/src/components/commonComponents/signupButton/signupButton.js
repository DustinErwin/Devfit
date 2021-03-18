import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Button as BootstrapButton } from "react-bootstrap";

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <BootstrapButton
      className="btn-dark"
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
    >
      Sign Up
    </BootstrapButton>
  );
};

export default SignUpButton;
