import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import EmployeeSchedule from "../../components/employeePageComponents/employeeSchedule/employeeSchedule";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox";
import UserContext from "../../utilities/userContext";
import RightColumn from "../../components/employeePageComponents/employeeInfoBoxColumns/eInfoBoxRightColumn";
import LeftColumn from "../../components/employeePageComponents/employeeInfoBoxColumns/einfoBoxLeftColumn";
import add from "date-fns/add";
import { format } from "date-fns";

/*ToDO: 
 
4. Style Right Column Roster 
*/

function EmployeePage() {
  const user = useContext(UserContext);
  const [userData, setUserData] = useState(""); //The uesr name and id
  const [userClasses, setUserClasses] = useState([]); //The classes the trainer is teaching in the left column info box
  const [classRoster, setClassRoster] = useState(""); //holds which members are in a particular class
  const [rightColDisplay, setRightColDisplay] = useState("addClass"); // a toggle that switches between roster and add/class
  const [classSchedule, setClassSchedule] = useState([]); //all info for each class rendered in schedule
  const weekLength = [0, 1, 2, 3, 4, 5, 6];

  //update all dynamic info on the page once user info is grabbed from context
  useEffect(() => {
    fetchScheduleData();
    fetchTrainerData();
  }, [user._id]);

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

  function updateRoster(e) {
    const classId = e.target.id;
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
            rosterList={classRoster || []}
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
