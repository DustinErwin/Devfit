import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import ScheduleContainer from "../../components/employeePageComponents/employeeSchedule/employeeSchedule";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox";
import UserContext from "../../utilities/userContext";
import RightColumn from "../../components/employeePageComponents/userInfoBoxColumns/InfoBoxRightColumn";
import LeftColumn from "../../components/employeePageComponents/userInfoBoxColumns/infoBoxLeftColumns";

function EmployeePage() {
  const user = useContext(UserContext);

  const [userData, setUserData] = useState("");
  const [userClasses, setUserClasses] = useState([]);
  const [toggleRoster, setToggleRoster] = useState(true);
  const [classRoster, setClassRoster] = useState("");

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
        setClassRoster(res);
      });
  }

  //grabs userName and class schedule to populate schedule
  function fetchUserData() {
    // fetch("/api/employee/" + user._id + "/schedule", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    const res = [
      {
        id: "6046653df074fb3b2831dcac",
        class_name: "Zumba",
        day: "Thursday",
        start_time: "09:00:00",
        current_size: 0,
        max_size: 12,
        trainer_id: "6046653df074fb3b2831dca7",
        trainer_name: "Aarav",
      },
      {
        id: "6046653df074fb3b2831dcae",
        class_name: "Barbell Blast",
        day: "Monday",
        start_time: "17:00:00",
        current_size: 1,
        max_size: 14,
        trainer_id: "6046653df074fb3b2831dca9",
        trainer_name: "Abeer",
      },
    ];
    const classesTaught = res.length;

    const classesArray = [...res];

    setUserClasses(classesArray);
    setUserData({
      firstName: "Ethan",
      numClassesTaught: classesTaught,

      // });
    });
  }

  useEffect(() => {
    //on page load, fetch the schedule data
    fetchUserData();
  }, []);

  function handleRoster(e) {
    // const classId = e.target.id;
    // fetchClassRoster(classId);
    console.log("clicked");
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
        colRight={<RightColumn />}
      ></UserInfoBox>
      <ScheduleContainer />
      <Footer />
    </>
  );
}

export default EmployeePage;
