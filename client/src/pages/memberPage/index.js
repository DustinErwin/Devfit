import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import MemberInfoBox from "../../components/memberInfoBox";
import MeetYourTrainerBox from "../../components/meetYourTrainerBox";
import Row from "react-bootstrap/Row";
import RenderScheduleHeadings from "../../utilities/render-schedule-headings";
import AuthenticationButton from "../../components/authenticationButton";

function MemberPage() {
  return (
    <>
      <Header />
      <AuthenticationButton />
      <ContentWrapper>
        <Row>
          <MemberInfoBox />
          <MeetYourTrainerBox />
        </Row>
      </ContentWrapper>

      <ContentWrapper>
        <Row>{RenderScheduleHeadings()}</Row>
      </ContentWrapper>

      <Footer />
    </>
  );
}

export default MemberPage;
