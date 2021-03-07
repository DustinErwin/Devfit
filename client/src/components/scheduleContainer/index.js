import React, { useState, useEffect } from "react";
import add from "date-fns/add";
import { format } from "date-fns";
import ScheduleClass from "../scheduleClass";
import ScheduleColumn from "../scheduleColumn";
import { Row, Col } from "react-bootstrap/";

function ScheduleContainerTest(props) {
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
        const test = [];
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
          test.push(dataObject);
        });

        setData(test);
      });
  }, []);
  console.log(data);
  console.log(data.length);

  return (
    <Row>
      {data.map((day) => {
        return (
          <ScheduleColumn
            dayOfWeek={day.weekDay}
            todaysDate={day.date}
            key={day.date}
          >
            {day.classData.map((day) => {
              return (
                <ScheduleClass
                  fitClassName={day.class_name}
                  classTime={day.start_time}
                  classTrainer={day.trainer_name}
                  spotsLeft = {day.max_size - day.current_size}
                />
              );
            })}
          </ScheduleColumn>
        );
      })}
    </Row>
  );
}

export default ScheduleContainerTest;
