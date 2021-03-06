import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import RenderScheduleHeadings from "../../components/scheduleColumn";
import Row from "react-bootstrap/Row";
import ScheduleContainerTest from "../../components/scheduleTest"


function EmployeePage() {
  const [schedule, setSchedule] = useState(['temp argument to stop bug'])

  useEffect(() => {
    fetch("/api/employee/6041105aad06d732a00f6be4/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then((res) => {  setSchedule(res)})
  }, [])

  
  return (
    <>
      <Header />
      <AuthenticationButton />
      <ContentWrapper>This Wrapper the two boxes for employees.</ContentWrapper>
      <ScheduleContainerTest />
      <Footer />
    </>
  );
}

export default EmployeePage;
