import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";

function MemberPage() {
  return (
    <>
      <Header />
      <ContentWrapper>This Wrapper the two boxes for Members.</ContentWrapper>

      <ContentWrapper>This Wrapper contains the schedule</ContentWrapper>
      <Footer />
    </>
  );
}

export default MemberPage;
