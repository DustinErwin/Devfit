import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ScheduleContainer from "../../components/employeeSchedule/employeeSchedule";
import Container from "react-bootstrap/Container";
import TrainerInfoBox from "../../components/trainerInfoBox/trainerInfoBox"
import './styles.css'


function EmployeePage() {

  return (
    <>
      <Header />
        <TrainerInfoBox />
      <ScheduleContainer />
      <Footer />
    </>
  );
}

export default EmployeePage;
