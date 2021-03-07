import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import ScheduleContainer from "../../components/scheduleContainer"


function EmployeePage() {
  const [schedule, setSchedule] = useState(['temp argument to stop bug'])

  useEffect(() => {
    fetch("/api/employee/6041105aad06d732a00f6be4/classes", {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then((res) => {  setSchedule(res)})
  }, [])

  
  return (
    <>
      <Header />
      <ContentWrapper>This Wrapper the two boxes for employees.</ContentWrapper>
      <ScheduleContainer />
      <Footer />
    </>
  );
}

export default EmployeePage;
