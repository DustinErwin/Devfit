import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import AuthenticationButton from "../../components/authenticationButton";

function LoginPage() {
  return (
    <>
      <Header />
      <AuthenticationButton />
      <ContentWrapper>
        This container should contain the 4 boxes of info on sign up page.
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default LoginPage;
