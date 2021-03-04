import React from "react";
import ScheduleColumn from "../components/scheduleColumn";
import add from "date-fns/add";
import { format } from "date-fns";

//Needs no inputs. Grabs, formats, and returns column dates. Just place in JSK with { } wrap.
function renderDates() {
    const weekLength = [0,1,2,3,4,5,6]

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
      <ScheduleColumn dayOfWeek={dayOfWeek} todaysDate={calendarDate} key={i} />
    );
  });
 
}

export default renderDates 
