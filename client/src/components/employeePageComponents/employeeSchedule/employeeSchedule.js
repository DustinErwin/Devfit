import React, { useState, useEffect, useContext } from "react";
import add from "date-fns/add";
import { format } from "date-fns";
import ScheduleClass from "../../commonComponents/scheduleClass/scheduleClass";
import ScheduleColumn from "../../commonComponents/scheduleColumn/scheduleColumn";
import { Row, Container } from "react-bootstrap/";
import DevBtn from "../../commonComponents/devButton/devButton";
import UserContext from "../../../utilities/userContext";
import Col from "react-bootstrap/Col";
import convertTime from "../../../utilities/convertTime"
import "./styles.css"

/*TODO: Fetch is currently Hardcoded. Update to fetch current user's info when login is set up*/

function EmployeeSchedule(props) {
  const userData = props.userData;
  const weekLength = [0, 1, 2, 3, 4, 5, 6];
  const user = useContext(UserContext);
  const [data, setData] = useState([]);

  //fetches all the information needed to render a schedule and stores it in state.
  function fetchScheduleData() {
    fetch("/api/employee/6047aab647549b4658f9e132/classes", {
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
          //Use date-fns to get data for the 7 days of the week
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

          //create an object to store both the fns date data and the current day
          const dataObject = {
            date: calendarDate,
            weekDay: dayOfWeek,
            classData: filteredData,
          };

          //add that object to state
          stateArray.push(dataObject);
        });

        setData(stateArray);
      });
  }

  useEffect(() => {
    //on page load, fetch the schedule data
    fetchScheduleData();
  }, []);

  //when delete btns are clicked, send a delete request, then fetchSchedule data, re-rendering page.
  function handleDelete(event) {
    const id = event.target.id
    fetch("/api/employee/removeClass/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {fetchScheduleData()});
  }

  return (
    <Container fluid>
      <Row>
        {data.map((day) => {
          return (
            <ScheduleColumn
              dayOfWeek={day.weekDay}
              todaysDate={day.date}
              key={day.date}
            >
              {day.classData.map((singleClass) => {
           
                // Render Logic for button. If employee teaches class, then a delete btn appears to delete class
                let employeesClass;
                userData.firstName === singleClass.trainer_name
                  ? (employeesClass = true)
                  : (employeesClass = false);

                  //convert time stamp into readable time 
                  const convertedTime = convertTime(singleClass.start_time)

                return (
              
                  <Row className="m-0 pb-3 pt-3 border-to-bottom-thin scheduleClass border-to-right">
                    <Col className=" col-12 border-teal pb-3 text-center ">
                      <h4 className=" bold text-red">
                        {singleClass.class_name}{" "}
                      </h4>
                      <div>{convertedTime}</div>
                      <div>{singleClass.trainer_name}</div>
                      <div>
                        slots left{" "}
                        {singleClass.max_size - singleClass.current_size}
                      </div>
                    </Col>

                    <Col className=" col-12 border-teal center-btn">
                      <DevBtn styleClass="btn-red " onClick={handleDelete} id={singleClass.id}>Delete </DevBtn>
                    </Col>
                  </Row>
        
                );
              })}
            </ScheduleColumn>
          );
        })}
      </Row>
    </Container>
  );
}

export default EmployeeSchedule;
