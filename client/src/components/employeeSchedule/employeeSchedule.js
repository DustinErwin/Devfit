import React, { useState, useEffect } from "react";
import add from "date-fns/add";
import { format } from "date-fns";
import ScheduleClass from "../scheduleClass/scheduleClass";
import ScheduleColumn from "../scheduleColumn/scheduleColumn";
import { Row, Container } from "react-bootstrap/";
import DevBtn from "../button/button";

/*TODO: Fetch is currently Hardcoded. Update to fetch current user's info when login is set up*/

function EmployeeSchedule() {
  const weekLength = [0, 1, 2, 3, 4, 5, 6];

  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");

  //fetches all the information needed to render a schedule and stores it in state.
  function fetchScheduleData() {
    fetch("/api/employee/604551ad344b442bf4250f61/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserName(res[0].userName);
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
    fetch("/api/employee/removeClass/" + event.target.id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => fetchScheduleData());
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
                userName === singleClass.trainer_name
                  ? (employeesClass = true)
                  : (employeesClass = false);

                return (
                  <ScheduleClass
                    fitClassName={singleClass.class_name}
                    classTime={singleClass.start_time}
                    classTrainer={singleClass.trainer_name}
                    spotsLeft={singleClass.max_size - singleClass.current_size}
                    key={singleClass.start_time}
                  >
                    {employeesClass ? (
                      <DevBtn
                        id={singleClass.id}
                        styleClass="btn-red"
                        onClick={handleDelete}
                      >
                        Delete
                      </DevBtn>
                    ) : null}
                  </ScheduleClass>
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
