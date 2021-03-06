import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import RenderScheduleHeadings from "../../utilities/render-schedule-headings";
import Row from "react-bootstrap/Row";
import AuthenticationButton from "../../components/authenticationButton";

function ManagerPage() {
  return (
    <>
      <Header />
      <AuthenticationButton />
      <ContentWrapper>This Wrapper the two boxes for Managers.</ContentWrapper>

      <ContentWrapper>
        <Row>{RenderScheduleHeadings()}</Row>
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default ManagerPage;
