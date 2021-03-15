import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox.js";
import LeftColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxLeftCol";
import RightColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxRightCol";
import Container from "react-bootstrap/Container";
import ManagerSchedule from "../../components/managerComponents/managerSchedule/managerSchedule";
import UserContext from "../../utilities/userContext";
import {testGetAllMembers} from "../../utilities/API.js"
import add from "date-fns/add";
import { format } from "date-fns";
import "./styles.css";

/* TODO
1. slots left updates on add and remove. consider use effect every time roster changes also consider 
fetch roster in a use effect that updates every time roster changes 
2. look closely at condensing states 
3. rename things to follow better patterns, especially handle clicks, etc.*/



function ManagerPage() {


  //grab user from context
  const user = useContext(UserContext) || [];
  //all existing members
  const [allMembers, setAllMembers] = useState([{ id: "", fullName: "" }]);
  //all existing trainers
  const [allTrainers, setAllTrainers] = useState([
    { _id: "", email: "", first_name: "", last_name: "", gender: "" },
  ]);
  //holds info for a single trainer
  const [selectedTrainer, setSelectedTrainer] = useState({
    _id: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
  });
  //holds info for a single class
  const [selectedClass, setselectedClass] = useState("id");
  //toggles the right column between "addTrainer" and "trainerInfo"
  const [toggleRightCol, setToggleRightCol] = useState("addTrainer");
  //holds all info from add-trainer form
  const [trainerHire, setTrainerHire] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
  });
  //holds the input value in the Roster page to add Member
  const [selectedMember, setSelectedMember] = useState("");
  //class Schedule data
  const [classSchedule, setClassSchedule] = useState([]);
  //class roster for a specific class
  const [classRoster, setClassRoster] = useState([
    {
      class_name: "",
      current_size: "",
      day: "",
      id: "",
      max_size: "",
      start_time: "",
      trainer_id: "",
      trainer_name: "",
    },
  ]);

  //Modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //on page load after manger's id and info appears
  useEffect(() => {
    getAllTrainers();
    getScheduleData();
    getAllMembers();
  }, [user]);


  async function getAllMembers  (){
    const membersArray = await testGetAllMembers() 
    setAllMembers(membersArray) }
 
  

  //get all trainers and set them to the allTrainers state
  function getAllTrainers() {
    fetch("/api/manager/trainers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((trainerArray) => trainerArray.json())
      .then((trainerArray) => {
        setAllTrainers(trainerArray);
      });
  }

  //on View button click, set Chosen Trainer to  viewTrainer state
  function trainerSelect(trainersViewBtn) {
    const chosenTrainerId = trainersViewBtn.target.id;

    //search this trainers id against all trainers to get all
    const chosenTrainer = allTrainers.filter((item) => {
      return item._id === chosenTrainerId;
    });
    // remove the arary from filter return
    const chosenTrainerNoArray = chosenTrainer[0];

    setSelectedTrainer(chosenTrainerNoArray);
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
        getAllTrainers();
        setSelectedTrainer({
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
    const id = selectedTrainer._id;
    fetch(`/api/manager/deleteTrainer/` + id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        getAllTrainers();
        setSelectedTrainer({
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
  function getScheduleData() {
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
        [1, 2, 3, 4, 5, 6, 7].map((nothing, i) => {
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
  function fetchClassRoster(classId) {
    fetch(`/api/class/${classId}/roster`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const memberRoster = res;

        setClassRoster(memberRoster);
      });
  }

  function removeMember(e) {
    const idObject = { memberid: e.target.id, id: selectedClass };

    fetch("/api/manager/removeFromClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(idObject),
    }).then(() => {
      fetchClassRoster(selectedClass);
    });
  }

  //manager adds member in roster modal
  function handleAddMember(e) {
    //check all members against the member typed into input box, and return chosen member without an array
    const filteredMember = allMembers
      .filter((item) => {
        return selectedMember === item.fullName;
      })
      .pop();

    const memberObject = {
      memberid: filteredMember.id,
      id: selectedClass,
    };

    fetch("/api/manager/addToClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(memberObject),
    }).then((req, res) => {
      fetchClassRoster(selectedClass);
    });
  }

  function handleRosterClick(e) {
    setselectedClass(e.target.id);
    //passing in the id directly because setselectedClass updates too slowly
    fetchClassRoster(e.target.id);

    handleShow();
  }

  return (
    <>
      <Header />

      <Container>
        <UserInfoBox
          colLeft={
            <LeftColumn
              allTrainers={allTrainers}
              trainerSelect={(e) => trainerSelect(e)}
              toggleAddTrainer={() => toggleAddTrainer()}
            />
          }
          colRight={
            <RightColumn
              selectedTrainer={selectedTrainer}
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
        handleRosterClick={(e) => handleRosterClick(e)}
        classRoster={classRoster}
        setSelectedMember={setSelectedMember}
        allMembers={allMembers}
        handleAddMember={() => handleAddMember()}
        show={show}
        handleClose={handleClose}
        removeMember={(e) => removeMember(e)}
      />

      <Footer />
    </>
  );
}

export default ManagerPage;
