import React, { useState, useEffect } from "react";
import add from "date-fns/add";
import { format } from "date-fns";
import ScheduleClass from "../scheduleClass";
import ScheduleColumn from "../scheduleColumn";
import Row from "react-bootstrap/Row";

function ScheduleContainer() {
  //Declare an array 7 in length for the weekLength.map function that creates 7 columns
  const weekLength = [0, 1, 2, 3, 4, 5, 6];

  const [mondaySchedule, setMondaySchedule] = useState({});
  const [tuesdaySchedule, setTuesdaySchedule] = useState([""]);
  const [wednesdaySchedule, setWednesdaySchedule] = useState([""]);
  const [thursdaySchedule, setThursdaySchedule] = useState([""]);
  const [fridaySchedule, setFridaySchedule] = useState([""]);
  const [saturdaySchedule, setSaturdaySchedule] = useState([""]);
  const [sundaySchedule, setSundaySchedule] = useState([""]);

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
      .then((res) => {});
  }, []);

  return (
    <>
      <Row>
        {weekLength.map((nothing, i) => {
          const addDay = add(new Date(), {
            years: 0,
            months: 0,
            weeks: 0,
            days: i,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });

          let calendarDate = format(addDay, "LLL, do");
          let dayOfWeek = format(addDay, "EEEE");

          return (
            <ScheduleColumn
              dayOfWeek={dayOfWeek}
              todaysDate={calendarDate}
              key={i}
              id={dayOfWeek}
            >
              <ScheduleClass
                fitClassName={thursdaySchedule.class_name}
                classTime={thursdaySchedule.start_time}
                classTrainer={thursdaySchedule.trainer_name}
              />
            </ScheduleColumn>
          );
        })}
      </Row>
    </>
  );
}

export default ScheduleContainer;
