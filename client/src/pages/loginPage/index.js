import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import AuthenticationButton from "../../components/authenticationButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";
import UserContext from "../../utilities/userContext";

function LoginPage() {
  const [userInfo, setUserInfo] = useState();
  const [userRole, setUserRole] = useState(null);
  // const [isAuthenticated, setisAuthenticated] = useState(false)

  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const { email } = user;

      fetch(`/api/user/${email}`)
        .then((response) => response.json())
        .then((currentUser) => {
          setUserInfo({ ...userInfo, currentUser });
          if (currentUser) {
            setUserRole(<Redirect to={`/${currentUser.role}`} />);
          } else {
            setUserRole(<Redirect to={`/registration`} />);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <UserContext.Provider value={userInfo}>
        <Header />
        <AuthenticationButton />
        {userRole ? userRole : null}
        <ContentWrapper>
          This container should contain the 4 boxes of info on sign up page.
        </ContentWrapper>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default LoginPage;
