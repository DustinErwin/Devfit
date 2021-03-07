import React, { useState, useEffect } from "react";
import add from "date-fns/add";
import { format } from "date-fns";
import ScheduleClass from "../scheduleClass";
import ScheduleColumn from "../scheduleColumn";
import { Row, Container } from "react-bootstrap/";
import DevBtn from "../button";

function ScheduleContainer(props) {
  const weekLength = [0, 1, 2, 3, 4, 5, 6];

  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/employee/6041105aad06d732a00f6be4/classes", {
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
  }, []);

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
            {day.classData.map((day) => {
              // Render Logic for button. If employee teaches class, then a delete btn appears to delete class
              let employeesClass;
            userName === day.trainer_name ?  employeesClass=true :  employeesClass=false
              
              return (
                <ScheduleClass
                  fitClassName={day.class_name}
                  classTime={day.start_time}
                  classTrainer={day.trainer_name}
                  spotsLeft = {day.max_size - day.current_size}
                  key={day.start_time}
                >
                    {employeesClass ? <DevBtn styleClass="btn-red">Delete</DevBtn> : null }
                  </ScheduleClass >

              );
            })}
          </ScheduleColumn>
        );
      })}
    </Row>
    </Container >
  );
}

export default ScheduleContainer;
