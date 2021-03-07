import React from "react";
import ScheduleColumn from "../components/scheduleColumn/scheduleColumn";
import add from "date-fns/add";
import { format } from "date-fns";

//This function generates the day or week and dates for the 7 columns on the weekly schedule.
//It doesn't need any inputs. Just place in jsx with  { }.
function RenderScheduleHeadings() {
  const weekLength = [0, 1, 2, 3, 4, 5, 6];

  return weekLength.map((nothing, i) => {
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
      <ScheduleColumn dayOfWeek={dayOfWeek} todaysDate={calendarDate} key={i} id={dayOfWeek} />
    );
  });
}

export default RenderScheduleHeadings;
