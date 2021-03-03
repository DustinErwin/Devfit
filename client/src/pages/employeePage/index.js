import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";

function EmployeePage() {
  return (
    <>
      <Header />
      <ContentWrapper>This Wrapper the two boxes for employees.</ContentWrapper>

      <ContentWrapper>This Wrapper contains the schedule</ContentWrapper>
      <Footer />
    </>
  );
}

export default EmployeePage;
