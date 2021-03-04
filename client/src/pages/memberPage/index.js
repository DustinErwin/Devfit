import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import MemberInfoBox from "../../components/memberInfoBox";
import MeetYourTrainerBox from "../../components/meetYourTrainerBox";
import Row from "react-bootstrap/Row";
import ScheduleColumn from "../../components/scheduleColumn";
import { format } from "date-fns/";

function MemberPage() {
  let test = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const date = new Date();

  const dayOfWeek = format(date, "EEEE");
  const todaysDate = format(date, "MMM do");

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
      {test.map((item) => {
        return <ScheduleColumn />
      })}
      </Row>
      </ContentWrapper>
      
      <Footer />
    </>
  );
}

export default MemberPage;
