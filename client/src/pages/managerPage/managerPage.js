import React from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container"
import AuthenticationButton from "../../components/authenticationButton";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox.js"


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
  return (
    <>
      <Header />
      <AuthenticationButton />
      <Container >This Wrapper the two boxes for Managers.</Container>
      <UserInfoBox
        colLeft={
          <LeftColumn
 
          />
        }
        colRight={
          <RightColumn
          />
        }
      ></UserInfoBox>
      <Container>
        <Row></Row>
      </Container>
      <Footer />
    </>
  );
}

export default ManagerPage;
