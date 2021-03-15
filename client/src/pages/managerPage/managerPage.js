import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox.js";
import LeftColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxLeftCol";
import RightColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxRightCol";
import Container from "react-bootstrap/Container";
import ManagerSchedule from "../../components/managerComponents/managerSchedule/managerSchedule";
import UserContext from "../../utilities/userContext";
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
  //all existing trainers
  const [allTrainers, setAllTrainers] = useState([]);
  //holds info for a single trainer to display in trainer information
  const [viewedTrainer, setViewedTrainer] = useState("");
  //holds info for a single class to display roster information
  const [viewedClass, setViewedClass] = useState("");
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
  const [classSchedule, setClassSchedule] = useState([]);

  const [classRoster, setClassRoster] = useState([]);

  const [allMembers, setAllMembers] = useState([]);

  //Modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //on page load...
  useEffect(() => {
    fetchallTrainers();
    fetchScheduleData();
    getAllMembers();
    // eslint-disable-next-line
  }, [user]);

  //grabs a list of all members for input options 
  function getAllMembers() {
    fetch("/api/manager/memberList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAllMembers(res);
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
  function fetchClassRoster(id) {
    const classId = id;
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
    const idObject = { memberid: e.target.id, id: viewedClass };

    fetch("/api/manager/removeFromClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(idObject),
    }).then(() => {
      fetchClassRoster(viewedClass);
    });
  }

  //manager adds member in roster modal
  function handleAddMember(e) {
    //check all members against the member typed into input box, and return chosen member without an array
    const filteredMember = allMembers
      .filter((item) => {
        return addMember === item.fullName;
      })
      .pop();

    const memberObject = {
      memberid: filteredMember.id,
      id: viewedClass,
    };

    fetch("/api/manager/addToClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(memberObject),
    }).then((req, res) => {
      fetchClassRoster(viewedClass);
    });
  }

  function handleRosterClick(e) {
    setViewedClass(e.target.id);
    //passing in the id directly because setViewedClass updates too slowly
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
        handleRosterClick={(e) => handleRosterClick(e)}
        classRoster={classRoster}
        setAddMember={setAddMember}
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
