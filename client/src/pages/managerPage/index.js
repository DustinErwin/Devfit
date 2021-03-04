import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper"

function ManagerPage() {
  return (
    <>
      <Header />
      <ContentWrapper>This Wrapper the two boxes for Managers.</ContentWrapper>

      <ContentWrapper>This Wrapper contains the schedule</ContentWrapper>
      <Footer />
    </>
  );
}

export default ManagerPage;
