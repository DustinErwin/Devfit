import React from 'react'
import add from "date-fns/add";
import { format } from "date-fns";
import {useState } from 'react'


/* Currently fetches data for an employee and returns all the info needed to render schedule, includees dates an classes. 
TODO: Update this to be a function that takes in 2 arguments. The userType, which will be employee, manager, or member, and the id
This will allow it to be reused for member, employee, and manager schedule fetching" */ 

function FetchScheduleData () {
    const weekLength = [0, 1, 2, 3, 4, 5, 6];

  
    fetch("/api/employee/604535745002f81404eddca5/classes", {
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

export default FetchScheduleData