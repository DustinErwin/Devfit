import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import MemberInfoBox from "../../components/memberInfoBox";
import MeetYourTrainerBox from "../../components/meetYourTrainerBox";
import Row from "react-bootstrap/Row";
import ScheduleColumn from "../../components/scheduleColumn";
import add from "date-fns/add";
import { format } from "date-fns";

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
          {
          weekLength.map((nothing, i) => {
            const addDay = add(new Date(), {
              years: 0,
              months: 0,
              weeks: 0,
              days: i,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });

            let calendarDate = format(addDay, "LLL, do");
            let dayOfWeek = format(addDay, "EEEE");

            return (
              <ScheduleColumn
                dayOfWeek={dayOfWeek}
                todaysDate={calendarDate}
                key={i}
              />
            );
          })}
        </Row>
      </ContentWrapper>

      <Footer />
    </>
  );
}

export default MemberPage;
