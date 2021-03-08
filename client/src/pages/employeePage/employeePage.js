import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ScheduleContainer from "../../components/scheduleContainer/scheduleContainer";
import Container from "react-bootstrap/Container";
import UserContext from "../../utilities/userContext";

function EmployeePage() {
  const [schedule, setSchedule] = useState(["temp argument to stop bug"]);
  const user = useContext(UserContext);

  useEffect(() => {
    fetch(`/api/employee/${user._id}/classes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setSchedule(res);
      });
  }, []);

  return (
    <>
      <Header />
      <Container>This Wrapper the two boxes for employees.</Container>
      <ScheduleContainer />
      <Footer />
    </>
  );
}

export default EmployeePage;
