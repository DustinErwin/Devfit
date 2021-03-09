import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import ScheduleContainer from "../../components/employeePageComponents/employeeSchedule/employeeSchedule";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox";
import UserContext from "../../utilities/userContext";
import RightColumn from "../../components/employeePageComponents/userInfoBoxColumns/InfoBoxRightColumn";
import LeftColumn from "../../components/employeePageComponents/userInfoBoxColumns/infoBoxLeftColumn";

function EmployeePage() {
  const user = useContext(UserContext);
  const [userData, setUserData] = useState("");
  const [userClasses, setUserClasses] = useState([]);
  const [classRoster, setClassRoster] = useState("");
  const [displayAddClass, setDisplayAddClass] = useState(true)

  //used on Roster btn click. Grabs current class roster and adds it to state so info can be displayed in card
  function fetchClassRoster(id) {
    fetch("/api/class/" + id + "/roster", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let classArray = [...res];
        classArray.pop();
        setClassRoster(classArray);
      });
  }

  //grabs userName and class schedule to populate schedule
  function fetchTrainerData() {
    fetch("/api/employee/6047aab647549b4658f9e132/schedule", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const classesTaught = res.length - 1;

        const classesArray = [...res];
        classesArray.shift();
        setUserClasses(classesArray);
        const splitName = res[0].split(" ");
        const trainerFirstName = splitName[0];

        setUserData({
          firstName: trainerFirstName,
          numClassesTaught: classesTaught,
        });
      });
  }

  useEffect(() => {
    //on page load, fetch the schedule data
    fetchTrainerData();
  }, []);

  function handleRoster(e) {
    const classId = e.target.id;
    fetchClassRoster(classId);
  }
  return (
    <>
      <Header />
      <UserInfoBox
        colLeft={
          <LeftColumn
            firstName={userData.firstName}
            numClassesTaught={userData.numClassesTaught}
            userClasses={userClasses}
            handleRoster={handleRoster}
          />
        }
        colRight={<RightColumn rosterList={classRoster || []} displayAddClass={displayAddClass} />}
      ></UserInfoBox>
      <ScheduleContainer userData={userData} />
      <Footer />
    </>
  );
}

export default EmployeePage;
