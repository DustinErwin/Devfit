import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ScheduleContainer from "../../components/scheduleContainer/scheduleContainer";
import Container from "react-bootstrap/Container";

function EmployeePage() {

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
