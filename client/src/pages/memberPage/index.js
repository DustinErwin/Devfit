import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import MemberInfoBox from "../../components/memberInfoBox";
import MeetYourTrainerBox from "../../components/meetYourTrainerBox";
import Row from "react-bootstrap/Row";
import renderDates from "../../utilities/dateUtils";

const data = fetch()

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
        <Row>{renderDates()}</Row>
      </ContentWrapper>

      <Footer />
    </>
  );
}

export default MemberPage;
