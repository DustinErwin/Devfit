import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import AuthenticationButton from "../../components/authenticationButton";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox.js";
import LeftColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxLeftCol";
import RightColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxRightCol";
import UserContext from "../../utilities/userContext";

/*
Top Area: 
Manager Page

1. Add Manager Info Box 
2. a function that grabs current trainers and stores them in Current Trainers State
3. a trainerInfo State that holds first, last, gender, email, and phone number of Trainer
4. a currentTrainer function that grabs that info and stores it in state, then gets passed to left hand column
5. A state that holds text "trainerInfo or hireNewTrainer for right column render"
6. a terminateEmployee function that deletes that employee and their classes

Left Hand Column: 
1. A header that displays current trainerse 
2. a map that display all trainer names 
3. A view button with a click that calls the currentTrainer function

Right Hand Column: 
1. A heading called Trainer's Information
2. A rendered li map of each trainer's name and other info from trainerInfo state 
3. A Terminate button that calls the terminateEmployee function 

Schedule 
1. Scheule pulls all classes 
2. Each class has a render button 
3. render button opens a modal  */

function ManagerPage() {
  const [allTrainers, setAllTrainers] = useState([]); //holds an array of all trainers for the manager

  const user = useContext(UserContext);

  //fetch grabs all trainers and sets them to the allTrainers array
  function fetchallTrainers() {
    fetch("/api/manager/trainers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((trainerArray) => {
        setAllTrainers(trainerArray);
      });
  }

  //fetch an Array of all trainers
  useEffect(() => {
    fetchallTrainers();
  }, []);

  return (
    <>
      <Header />
      <AuthenticationButton />
      <Container>This Wrapper the two boxes for Managers.</Container>
      <UserInfoBox
        colLeft={<LeftColumn allTrainers={allTrainers} />}
        colRight={<RightColumn />}
      ></UserInfoBox>
      <Container>
        <Row></Row>
      </Container>
      <Footer />
    </>
  );
}

export default ManagerPage;
