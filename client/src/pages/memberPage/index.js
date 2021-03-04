import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import MemberInfoBox from "../../components/memberInfoBox";
import MeetYourTrainerBox from "../../components/meetYourTrainerBox";
import Row from "react-bootstrap/Row";
import renderDates from "../../utilities/dateUtils"


function MemberPage() {
  //weekLength creates an array so map iterates once per week day
  const [weekLength, setWeekLength] = useState([1, 2, 3, 4, 5, 6, 7]);

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
        <Row>
          { renderDates()
       }
        </Row>
      </ContentWrapper>

      <Footer />
    </>
  );
}

export default MemberPage;
