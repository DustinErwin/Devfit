import React, { useState, useEffect, useContext, useRef } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Row from "react-bootstrap/Row";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox.js";
import LeftColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxLeftCol";
import RightColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxRightCol";
import Container from "react-bootstrap/Container";
import ManagerSchedule from "../../components/managerComponents/managerSchedule/managerSchedule";
import UserContext from "../../utilities/userContext";
import add from "date-fns/add";
import { format } from "date-fns";
import Modal from "react-bootstrap/Modal";
import DevBtn from "../../components/commonComponents/devButton/devButton";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./styles.css";

/* TODO 
1. Finish ability to add member by text 
2. Try to add autofill 
3. Try to replace addMember State with refHook 
4. Pull Moday to it's own component 
5. add ability for manager to create class 
6. Add Ability for manager to delete class 

*/



function ManagerPage() {
  //grab user from context
  const user = useContext(UserContext) || [];
  //Modal states
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  //holding place to add member to roster
  const [addMember, setAddMember] = useState("");
  //class Schedule Data
  const [classSchedule, setClassSchedule] = useState();


  const [classRoster, setClassRoster] = useState({
    classId: "",
    memberRoster: []
  });

  const [allMembers, setAllMembers] = useState({
  })


  //on page load...
  useEffect(() => {
    fetchallTrainers();
    fetchScheduleData();
    fetchAllMembers();
    // eslint-disable-next-line
  }, [user]);

  //grabs a list of all members for input options options
  function fetchAllMembers(){
 
      fetch("/api/manager/memberList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
         setAllMembers(res)
        });
    }
  
  //if i put this in fetchSchedule Data, it doesn't work. needs to be global. review this later.
  const weekLength = [1, 2, 3, 4, 5, 6, 7];

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
    fetch(`/api/employee/604e1eaf43670c6c98a2a3db/classes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const stateArray = [];
        // eslint-disable-next-line
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
  }

  //fetch classes roster then pop up a modal
  function fetchClassRoster(e) {
    const id = e.target.id;
   
    fetch(`/api/class/${id}/roster`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
     
       const memberRoster = res


       setClassRoster({memberRoster: memberRoster, classId: id})
      
  
        handleShow();
      });
  }

  function removeMember(e) {
    const idObject = { memberid: e.target.id, id: classRoster.classId };

    fetch("/api/manager/removeFromClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(idObject),
    }).then(() => {
      fetchClassRoster(e);
    });
  }

//manager adds member in roster modal
  function handleAddMember(e) {
 
    const memberObject = {
     memberid : addMember,
      id: classRoster.classId
    }

    console.log(memberObject)

    fetch("/api/manager/addToClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json",
      },
      body: JSON.stringify(memberObject),
    }).then((req, res) => {
    
    })
  
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
      <ManagerSchedule
        classSchedule={classSchedule}
        fetchClassRoster={fetchClassRoster}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Roster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {classRoster.memberRoster.map((item, i) => {
      
            return (
              <Row>
                <Col key={i} className="roster-item mb-3">
                  {" "}
                  <span role="img" aria-label="Boxing Glove">
                    🥊
                  </span>{" "}
                  {item[0]}
                </Col>
                <Col>
                  {" "}
                  <DevBtn
                    styleClass="btn-red roster-btn "
                    onClick={(e) => removeMember(e)}
                    id={item[1]}
                  >
                    Remove
                  </DevBtn>{" "}
                </Col>
              </Row>
            );
          })}
          <Row>
            <Col xs={8}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend></InputGroup.Prepend>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setAddMember(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col>
              <DevBtn styleClass="btn-red" onClick={handleAddMember}>
                Add Member
              </DevBtn>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <DevBtn styleClass="btn-red" onClick={handleClose}>
            Close
          </DevBtn>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}

export default ManagerPage;
