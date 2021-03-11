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

Hire new Trainer: 
1. Change Hire Trainer to Add Trainer --
2. Create toggleRightColumn State --
2b. Create Ternary --
3. Hire Trainer onClick creates new Card with Form  --
4. Add Hire Trainer Button
5.  Hire Trainer Buttons onClick grabs form data and sends it to handleHire Trainer function on manager
6. handleHire sends fetch and updates page 


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
  const [viewedTrainer, setViewedTrainer] = useState("hi"); //holds the info used to view a single trainer in right Col
  const [toggleRightCol, setToggleRightCol] = useState("addTrainer"); //toggles the right column between trainer info and add trainer
  const [trainerHire, setTrainerHire] = useState({
    firstName: "",
    lastName: "",
    gender: "M",
    email: "",
    phone: "",
  });

  const user = useContext(UserContext);

  //sets info from trainer hire form to state
  const hireTrainerInfo = (e) => {
    const { name, value } = e.target;
    setTrainerHire({
      ...trainerHire,
      [name]: value,
    });
  };




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
      })
  }


  //fetch post request to hire a new trainer
  function handleHireNewTrainer() {
    const dataObject = {
      first_name: trainerHire.firstName,
      last_name: trainerHire.lastName, 
      gender: trainerHire.gender, 
      phone: trainerHire.phone, 
      email: trainerHire.email,
      role: "employee"
    }
    console.log(dataObject)
    fetch("/api/manager/addEmployee", {
      method: "POST",
      body: JSON.stringify(dataObject),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchallTrainers()
      }).catch(error => {throw(error)})
  }

  //Delete request to terminate employee
  function handleTerminateEmployee() {
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
    setViewedTrainer(chosenTrainer);
    setToggleRightCol("viewTrainer");
  }

  //Add Trainer on click toggles right col to add trainer state
  function toggleAddTrainer() {
    setToggleRightCol("addTrainer");
  }

  return (
    <>
      <Header />
      <Container>
        <UserInfoBox
          colLeft={
            <LeftColumn
              allTrainers={allTrainers}
              handleViewedTrainer={(e) => handleViewedTrainer(e)}
              toggleAddTrainer={() => toggleAddTrainer()}
            />
          }
          colRight={
            <RightColumn
              viewedTrainer={viewedTrainer}
              toggleRightCol={toggleRightCol}
              handleHireNewTrainer={() => handleHireNewTrainer()}
              hireTrainerInfo={(e) => hireTrainerInfo(e)}
            />
          }
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
