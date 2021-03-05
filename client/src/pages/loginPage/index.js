import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import AuthenticationButton from "../../components/authenticationButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";

function LoginPage() {
  // const [state, setState] = useState("member");

  const { isAuthenticated } = useAuth0();
  // const { user } = useAuth0();
  // const { email } = user;

  const loginRedirect = () => {
    if (isAuthenticated) {
      // fetch(`api/member/${email}`)
      //  .then(response => response.json())
      //  .then(data => setState({...state, data}));
      switch ("manager") {
        case "member":
          return <Redirect to="/member" />;
        case "employee":
          return <Redirect to="/employee" />;
        case "manager":
          return <Redirect to="/manager" />;
        default:
          return;
      }
    }
  };

  return (
    <>
      <Header />
      <AuthenticationButton />
      {loginRedirect()}
      <ContentWrapper>
        This container should contain the 4 boxes of info on sign up page.
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default LoginPage;
