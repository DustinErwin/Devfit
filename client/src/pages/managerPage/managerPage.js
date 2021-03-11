import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox.js";
import LeftColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxLeftCol";
import RightColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxRightCol";
import ManagerSchedule from "../../components/managerComponents/managerSchedule/managerSchedule"
import UserContext from "../../utilities/userContext";
import add from "date-fns/add";
import { format } from "date-fns";

/*
Top Area: 
Manager Page


Right Hand Column: 
3. Test that deleting a trainer also deletes their classes. 

Schedule 
1. Scheule pulls all classes 
2. Each class has a render button 
3. render button opens a modal  */

function ManagerPage() {
  //grab user from context 
  const user = useContext(UserContext);
  //all existing trainers
  const [allTrainers, setAllTrainers] = useState([]);

  //holds info for a single trainer to display in trainer information
  const [viewedTrainer, setViewedTrainer] = useState("placeHolder");

  //toggles the right column between trainer info and add trainer
  const [toggleRightCol, setToggleRightCol] = useState("");

  //holds all info from add-trainer form
  const [trainerHire, setTrainerHire] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
  });

  //class Schedule Data 
  const [classSchedule, setClassSchedule] = useState()

  //on page load...
  useEffect(() => {
    fetchallTrainers();
    fetchScheduleData();
  }, [user]);

  //if i put this in fetchSchedule Data, it doesn't work. needs to be global. review this later. 
  const weekLength = [1,2,3,4,5,6,7]

  //fetch all trainers and set them to the allTrainers state
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

  //on View button click, set Chosen Trainer to  viewTrainer state
  function handleViewedTrainer(e) {
    const chosenTrainerId = e.target.id;

    const chosenTrainer = allTrainers.filter((item) => {
      return item._id === chosenTrainerId;
    });

    const chosenTrainerNoArray = chosenTrainer[0];

    setViewedTrainer(chosenTrainerNoArray);
    setToggleRightCol("viewTrainer");
  }

  //on click, change right column to add-trainer render
  function toggleAddTrainer() {
    setToggleRightCol("addTrainer");
  }

  //sets info from trainer hire form to state
  const hireTrainerInfo = (e) => {
    const { name, value } = e.target;
    setTrainerHire({
      ...trainerHire,
      [name]: value,
    });
  };

  //post request to hire a new trainer
  function handleHireNewTrainer() {
    const dataObject = {
      first_name: trainerHire.firstName,
      last_name: trainerHire.lastName,
      gender: trainerHire.gender,
      phone: trainerHire.phone,
      email: trainerHire.email,
      role: "employee",
    };
    console.log(dataObject);
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
        fetchallTrainers();
        setViewedTrainer({
          firstName: "",
          lastName: "",
          gender: "M",
          email: "",
          phone: "",
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  //Delete request to terminate employee
  function terminateTrainer() {
    const id = viewedTrainer._id;
    fetch(`/api/manager/deleteTrainer/` + id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        fetchallTrainers();
        setViewedTrainer({
          firstName: "",
          lastName: "",
          gender: "M",
          email: "",
          phone: "",
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  /*---------------------------------------- Schedule Functions--------------------------------------------- */

 //fetches all the information needed to render a schedule and stores it in state.
 function fetchScheduleData() {

 fetch("/api/employee/6047aab647549b4658f9e131/classes", {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     Accept: "application/json",
   },
 })
   .then((res) => res.json())
   .then((res) => {
    console.log(res)
     const stateArray = [];
     weekLength.map((nothing, i) => {
       //Use date-fns to get classSchedule for the 7 days of the week
       const addDay = add(new Date(), {
         years: 0,
         months: 0,
         weeks: 0,
         days: i,
         hours: 0,
         minutes: 0,
         seconds: 0,
       });

       //the date written as Jan 23rd
       const calendarDate = format(addDay, "LLL, do");
       //day of week written as "Monday"
       const dayOfWeek = format(addDay, "EEEE");

       //Filter the fetch request to only grab classes on the current day weeklength.map is iterating through
       const filteredData = res.filter((r) => {
         return r.day === dayOfWeek;
       });

       //create an object to store both the fns date classSchedule and the current day
       const dataObject = {
         date: calendarDate,
         weekDay: dayOfWeek,
         classData: filteredData,
       };

       //add that object to state
       stateArray.push(dataObject);
     });
     
     setClassSchedule(stateArray);
   });

   console.log(classSchedule, 'class schedule')
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
              terminateTrainer={() => terminateTrainer()}
            />
          }
        ></UserInfoBox>
      </Container>
       <ManagerSchedule classSchedule={classSchedule} />
      <Footer />
    </>
  );
}

export default ManagerPage;
