import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ScheduleContainer from "../../components/employeeSchedule/employeeSchedule";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import TrainerInfoBox from "../../components/trainerInfoBox/trainerInfoBox"
import './styles.css'


function EmployeePage() {

  return (
    <>
      <Header />
      <Container>
        <TrainerInfoBox />
      </Container>
      <ScheduleContainer />
      <Footer />
    </>
  );
}

export default EmployeePage;
