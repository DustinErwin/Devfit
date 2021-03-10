import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import EmployeeSchedule from "../../components/employeePageComponents/employeeSchedule/employeeSchedule";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox";
import UserContext from "../../utilities/userContext";
import RightColumn from "../../components/employeePageComponents/userInfoBoxColumns/InfoBoxRightColumn";
import LeftColumn from "../../components/employeePageComponents/userInfoBoxColumns/infoBoxLeftColumn";
import add from "date-fns/add";
import { format } from "date-fns";

/*ToDO: 
1. Create Add Class Button in Left Column that changes the right column to class Creation 
2. Feed times through the time converter function in utilities for better time 
3. Fix Schedule Headings to be Red 
4. Style Right Column Roster 
5. make classes text dynamically say class if class number is length 1*/

function EmployeePage() {
  const user = useContext(UserContext);
  const [userData, setUserData] = useState(""); //The uesr name and id
  const [userClasses, setUserClasses] = useState([]); //The classes the trainer is teaching in the left column info box
  const [classRoster, setClassRoster] = useState(""); //holds which members are in a particular class
  const [displayAddClass, setDisplayAddClass] = useState(true); // a toggle that switches between roster and add/class
  const [classSchedule, setClassSchedule] = useState([]); //all info for each class rendered in schedule
  const weekLength = [0, 1, 2, 3, 4, 5, 6];

  //fetches all the information needed to render a schedule and stores it in state.
  function fetchScheduleData() {
    fetch("/api/employee/" + user._id + "/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
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

          //the date like Jan 23rd
          const calendarDate = format(addDay, "LLL, do");
          //day of week like "Monday"
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
    fetch("/api/employee/" + user._id + "/schedule", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const classesTaught = res.length;

        const classesArray = [...res];
        setUserClasses(classesArray);

        setUserData({
          firstName: user.firstName,
          numClassesTaught: classesTaught,
        });
      });
  }

  useEffect(() => {
    fetchScheduleData();
    fetchTrainerData();
  }, [user._id]);

  function handleRoster(e, id) {
    const classId = id;
    console.log(classId);
    fetch(`/api/class/${classId}/roster`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const roster = res.shift();
        setClassRoster([roster]);
        console.log(classRoster);
      });
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
            handleRoster={handleRoster}
          />
        }
        colRight={
          <RightColumn
            rosterList={classRoster || []}
            displayAddClass={displayAddClass}
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
