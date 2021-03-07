import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ScheduleContainer from "../../components/scheduleContainer/scheduleContainer";
import Container from "react-bootstrap/Container";
import TrainerCarousel from "../../components/trainerCarousel/TrainerCarousel"

function EmployeePage() {

  return (
    <>
      <Header />
      <Container>
      <TrainerCarousel />
      </Container>
      <ScheduleContainer />
      <Footer />
    </>
  );
}

export default EmployeePage;
