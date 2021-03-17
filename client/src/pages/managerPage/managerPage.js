import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox.js";
import LeftColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxLeftCol";
import RightColumn from "../../components/managerComponents/managerInfoBoxColumns/mInfoBoxRightCol";
import ManagerSchedule from "../../components/managerComponents/managerSchedule/managerSchedule";
import {renderSchedule} from "../../utilities/renderSchedule"
import UserContext from "../../utilities/userContext";
import add from "date-fns/add";
import { format } from "date-fns";
import "./styles.css";
import {
  getMembersApi,
  getTrainersApi,
  postTrainerApi,
  terminateTrainerApi,
  renderScheduleApi,
  fetchClassRosterApi,
  removeMemberApi,
  addToClassApi,
} from "../../utilities/managerAPI/managerAPI.js";

function ManagerPage() {
  //grab user from context, allow empty array before data arrives
  const user = useContext(UserContext);
  //all existing members
  const [allMembers, setAllMembers] = useState([{ id: "", fullName: "" }]);
  //all existing trainers
  const [allTrainers, setAllTrainers] = useState([
    { _id: "", email: "", first_name: "", last_name: "", gender: "" },
  ]);
  //holds info for a single class
  const [selectedClass, setselectedClass] = useState("id");
  //toggles the right column between "addTrainer" and "trainerInfo"
  const [toggleRightCol, setToggleRightCol] = useState("addTrainer");
  //holds all info from add-trainer form
  const [selectedTrainer, setSelectedTrainer] = useState({
    firstName: "",
    lastName: "",
    gender: "M",
    email: "",
    phone: "",
    id: "",
  });
  //sets info from trainer hire form to state
  const updateTrainerInfo = (e) => {
    const { name, value } = e.target;
    setSelectedTrainer({
      ...selectedTrainer,
      [name]: value,
    });
  };
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
    test();
    getAllMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  // //whenver the class Roster updates, update schedule to reflect spots left change
  // useEffect(() => {
  //   renderSchedule();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [classRoster]);

  //get all members, then set them to AllMembersState
  const getAllMembers = async () => {
    const membersArray = await getMembersApi();
    setAllMembers(membersArray);
  };

  //get all trainers and set them to the allTrainers state
  const getAllTrainers = async () => {
    const trainers = await getTrainersApi();
    setAllTrainers(trainers);
  };

  //on View button click, set Chosen Trainer to  viewTrainer state
  const trainerSelect = (e) => {
    const chosenTrainerId = e.target.id;

    //search this trainers id against all trainers to get all
    const chosenTrainer = allTrainers.filter((item) => {
      return item._id === chosenTrainerId;
    });

    setSelectedTrainer(chosenTrainer[0]);

    setToggleRightCol("viewTrainer");
  };

  //on click, change right column to add-trainer render
  function toggleAddTrainer() {
    setToggleRightCol("addTrainer");
  }

  //post request to hire a new trainer
  const handleHireNewTrainer = async () => {
    const dataObject = {
      first_name: selectedTrainer.firstName,
      last_name: selectedTrainer.lastName,
      gender: selectedTrainer.gender || "M",
      phone: selectedTrainer.phone,
      email: selectedTrainer.email,
      role: "employee",
    };
    //add Trainer in DB
    await postTrainerApi(dataObject);
    //update page with trainers
    getAllTrainers();
    //reset selected trainer for data integrity
    setSelectedTrainer({});
  };

  //Delete request to terminate employee
  const terminateTrainer = async () => {
    console.log("terminate", selectedTrainer);
    await terminateTrainerApi(selectedTrainer._id);
    getAllTrainers();
    setSelectedTrainer({});
  };

  /*---------------------------------------- Schedule Functions--------------------------------------------- */
  //get schedule data then render schedule
  const test = async () => {
    const scheduleData = await renderScheduleApi(user._id);
    const stateArray = await renderSchedule(scheduleData);

    setClassSchedule(stateArray);
  };

  //fetch classes roster then pop up a modal
  const fetchClassRoster = async (classId) => {
    const classRoster = await fetchClassRosterApi(classId);
    setClassRoster(classRoster);
  };

  //Remove member from class
  const removeMember = async (e) => {
    const idObject = { memberid: e.target.id, id: selectedClass };
    await removeMemberApi(idObject);
    fetchClassRoster(selectedClass);
  };

  //manager adds member in roster modal
  const addMemberToClass = async () => {
    //check all members against the member typed into input box, and return chosen member
    const validateName = allMembers.some(item => item.fullName === selectedMember)
    
    if (!validateName){} 
    else {


const filteredMember = allMembers
      .filter((item) => {
        return selectedMember === item.fullName;
      })
      .pop();

    const objectId = {
      memberid: filteredMember.id,
      id: selectedClass,
    };

    await addToClassApi(objectId);

    fetchClassRoster(selectedClass);
  }
  };

  function handleRosterClick(e) {
    setselectedClass(e.target.id);
    //passing in the id directly because setselectedClass updates too slowly
    fetchClassRoster(e.target.id);

    handleShow();
    console.log(classSchedule)
  }

  return (
    <>
      <Header />

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
            updateTrainerInfo={(e) => updateTrainerInfo(e)}
            terminateTrainer={() => terminateTrainer()}
          />
        }
      ></UserInfoBox>
   
      <ManagerSchedule
        classSchedule={classSchedule}
        fetchClassRoster={fetchClassRoster}
        handleRosterClick={(e) => handleRosterClick(e)}
        classRoster={classRoster}
        setSelectedMember={setSelectedMember}
        allMembers={allMembers}
        addMemberToClass={() => addMemberToClass()}
        show={show}
        handleClose={handleClose}
        removeMember={(e) => removeMember(e)}
      />

      <Footer />
    </>
  );
}

export default ManagerPage;
