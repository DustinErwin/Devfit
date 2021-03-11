import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox.js";
import LeftColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxLeftCol";
import RightColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxRightCol";
import UserContext from "../../utilities/userContext";

/*
Top Area: 
Manager Page


Left Hand Column: 
2. A Hire Traienr Button 
2b. Function on manager page that fetche Posts new trainer data, then calls all trainers from server



Right Hand Column: 
3. A Terminate button that calls the terminateEmployee function 

Schedule 
1. Scheule pulls all classes 
2. Each class has a render button 
3. render button opens a modal  */

function ManagerPage() {
  const [allTrainers, setAllTrainers] = useState([]); //holds an array of all trainers for the manager
  const [viewedTrainer, setViewedTrainer] = useState('hi'); //holds the info used to view a single trainer in right Col

  const user = useContext(UserContext);

  //fetch an Array of all trainers
  useEffect(() => {
    fetchallTrainers();
  }, []);

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

  //Delete request to terminate employee
  function terminateEmployee() {
    fetch(`/api/manager/deleteTrainer/` + `id`, {
      method: "DELETE",
    })
      .then((res) => res.text()) 
      .then((res) => console.log(res, "terminated"));
  }

  //on View button click, set Chosen Traienr to state
  function handleViewedTrainer(e) {
    const chosenTrainerId = e.target.id;

    const chosenTrainer = allTrainers.filter((item) => {
      return item._id === chosenTrainerId;
    });
    setViewedTrainer(chosenTrainer)
  }

  function handleHireTrainer() {
    console.log('clicked')
  }

  return (
    <>
      <Header />
      <Container>
        <UserInfoBox
          colLeft={
            <LeftColumn
              allTrainers={allTrainers}
              handleHireTrainer={() => handleHireTrainer()}
              handleViewedTrainer={(e) => handleViewedTrainer(e)
              }
            />
          }
          colRight={<RightColumn viewedTrainer={viewedTrainer} />}
        ></UserInfoBox>
      </Container>
      <Container>
        <Row></Row>
      </Container>
      <Footer />
    </>
  );
}

export default ManagerPage;
