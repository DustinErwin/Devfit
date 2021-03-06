import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import MemberInfoBox from "../../components/memberInfoBox";
import MeetYourTrainerBox from "../../components/meetYourTrainerBox";
import Row from "react-bootstrap/Row";
import RenderScheduleHeadings from "../../components/scheduleColumn";

function MemberPage() {
  return (
    <>
      <Header />
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
