import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import EmployeeSchedule from "../../components/employeePageComponents/employeeSchedule/employeeSchedule";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox";
import UserContext from "../../utilities/userContext";
import RightColumn from "../../components/employeePageComponents/employeeInfoBoxColumns/eInfoBoxRightColumn";
import LeftColumn from "../../components/employeePageComponents/employeeInfoBoxColumns/einfoBoxLeftColumn";
import { renderScheduleApi } from "../../utilities/managerAPI/managerAPI";
import { renderSchedule } from "../../utilities/renderSchedule";
import {
  employeeTrainingSchedule,
  updateClassRoster,
} from "../../utilities/employeeAPI/employeeAPI";

function EmployeePage() {
  const user = useContext(UserContext);
  const [userData, setUserData] = useState(""); //The uesr name and id
  const [userClasses, setUserClasses] = useState([]); //The classes the trainer is teaching in the left column info box
  const [classRoster, setClassRoster] = useState(""); //holds which members are in a particular class
  const [rightColDisplay, setRightColDisplay] = useState("addClass"); // a toggle that switches between roster and add/class
  const [classSchedule, setClassSchedule] = useState([]); //all info for each class rendered in schedule

  //update all dynamic info on the page once user info is grabbed from context
  useEffect(() => {
    fetchScheduleData();
    fetchTrainerData();
    // eslint-disable-next-line
  }, [user._id]);

  //fetches all the information needed to render a schedule and stores it in state.
  function fetchScheduleData() {
    renderScheduleApi(user._id).then((res) => {
      const stateArray = renderSchedule(res);

      setClassSchedule(stateArray);
    });
  }

  //grabs userName and class schedule to populate schedule
  function fetchTrainerData() {
    employeeTrainingSchedule(user._id).then((res) => {
      const classesTaught = res.length;

      const classesArray = [...res];
      setUserClasses(classesArray);

      setUserData({
        firstName: user.firstName,
        numClassesTaught: classesTaught,
      });
    });
  }

  function updateRoster(e) {
    const classId = e.target.id;
    updateClassRoster(classId).then((currentRoster) => {
      console.log(currentRoster);
      setClassRoster(currentRoster);
      setRightColDisplay("roster");
    });
  }

  //updates right column to display the addClass form
  function toggleAddClass() {
    setRightColDisplay("addClass");
  }

  return (
    <>
      <Header />
      <UserInfoBox
        colLeft={
          <LeftColumn
            firstName={user.firstName}
            numClassesTaught={userData.numClassesTaught}
            userClasses={userClasses}
            updateRoster={updateRoster}
            toggleAddClass={toggleAddClass}
          />
        }
        colRight={
          <RightColumn
            rosterList={classRoster}
            displayAddClass={rightColDisplay}
            trainerId={user._id}
            fetchScheduleData={() => fetchScheduleData()}
            fetchTrainerData={() => fetchTrainerData()}
          />
        }
      ></UserInfoBox>
      <EmployeeSchedule
        userData={userData}
        classSchedule={classSchedule}
        fetchScheduleData={() => fetchScheduleData()}
        fetchTrainerData={() => fetchTrainerData()}
      />

      <Footer />
    </>
  );
}

export default EmployeePage;
