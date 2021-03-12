import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import MemberInfoBox from "../../components/memberPageComponents/memberInfoBox/memberInfoBox";
import MeetYourTrainerBox from "../../components/memberPageComponents/meetYourTrainerBox/TrainerCarousel";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import MemberSchedule from "../../components/memberPageComponents/memberSchedule/memberSchedule";
import { add, format } from "date-fns";
import UserContext from "../../utilities/userContext";

function MemberPage() {
  const user = useContext(UserContext);
  const [userClasses, setUserClasses] = useState([]); //The classes the member is enrolled in the left column info box
  const [classSchedule, setClassSchedule] = useState([]); //all info for each class rendered in schedule
  const weekLength = [0, 1, 2, 3, 4, 5, 6];

  //fetches all the information needed to render a schedule and stores it in state.
  function fetchScheduleData() {
    fetch("/api/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const weekArray = [];
        // eslint-disable-next-line
        weekLength.map((nothing, i) => {
          //Use date-fns to get classSchedule for the 7 days of the week
          const addDay = add(new Date(), {
            years: 0,
            months: 0,
            weeks: 0,
            days: i,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });

          //the date like Jan 23rd
          const calendarDate = format(addDay, "LLL, do");
          //day of week like "Monday"
          const dayOfWeek = format(addDay, "EEEE");

          //Filter the fetch request to only grab classes on the current day weeklength.map is iterating through
          const filteredData = res.filter((r) => {
            return r.day === dayOfWeek;
          });

          //create an object to store both the fns date classSchedule and the current day
          const dayObject = {
            date: calendarDate,
            weekDay: dayOfWeek,
            classData: filteredData,
          };

          //add that object to state
          weekArray.push(dayObject);
        });

        setClassSchedule(weekArray);
      });
  }

  function removeFromClass(classid) {
    let data = { id: classid, memberid: user._id };
    fetch("/api/member/removeFromClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  function addToClass(classid) {
    let data = { id: classid, memberid: user._id };

    fetch("/api/member/addToClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        fecthJoinedClasses();
      });
  }

  function fecthJoinedClasses() {
    fetch(`/api/member/${user._id}/classes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((classesJoined) => {
        setUserClasses([...classesJoined]);
      });
  }

  useEffect(() => {
    fecthJoinedClasses();
    fetchScheduleData();
    // eslint-disable-next-line
  }, [user, userClasses]);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <MemberInfoBox classesJoined={userClasses} />
          <MeetYourTrainerBox />
        </Row>
      </Container>
      <Container>
        <Row>
          <MemberSchedule
            classesJoined={userClasses}
            classSchedule={classSchedule}
            fetchScheduleData={() => fetchScheduleData()}
            joinClass={(e) => addToClass(e)}
            leaveClass={(e) => removeFromClass(e)}
          />
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default MemberPage;
