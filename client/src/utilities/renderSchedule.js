import { add, format } from "date-fns";

export const renderSchedule = (res) => {
  const weekLength = [0, 1, 2, 3, 4, 5, 6];
  const stateArray = [];
  // eslint-disable-next-line
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
  return stateArray;
};
