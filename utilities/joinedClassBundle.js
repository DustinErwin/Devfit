//This function will build the object sent to populate the class schedule for members
module.exports = function (classes, currentUser) {
  let classesJoined = [];
  classes.forEach((unit) => {
    if (unit.roster) {
      const roster = unit.roster;

      roster.filter((participant) => {
        if (JSON.stringify(currentUser._id) === JSON.stringify(participant)) {
          let thisClass = {
            id: JSON.stringify(unit._id),
            class_name: unit.class_name,
            day: unit.day,
            start_time: unit.start_time,
          };
          //Add class to user's joined classes to show in UI
          classesJoined.push(thisClass);
        }
      });
    }
  });

  return classesJoined;
};
