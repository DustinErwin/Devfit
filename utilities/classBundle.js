//This function will build the object sent to populate the class schedule for members
module.exports = function (classes, currentUser, trainers) {
  let classesJoined = [];
  let classBundle = [];

  const userName = currentUser.first_name;

  classes.forEach((unit) => {
    const activeTrainer = trainers.filter((trainer) => {
      return JSON.stringify(trainer._id) === JSON.stringify(unit.trainer_id);
    });

    //If roster is not empty then split and search for user's id
    if (unit.roster) {
      const roster = unit.roster;

      roster.filter((participant) => {
        if (JSON.stringify(currentUser._id) === JSON.stringify(participant)) {
          let thisClass = {
            id: JSON.stringify(unit._id),
            class_name: unit.class_name,
            day: unit.day,
            trainer_name: activeTrainer[0].first_name,
            start_time: unit.start_time,
          };
          //Add class to user's joined classes to show in UI
          classesJoined.push(thisClass);
        }
      });
    }

    //Object to be sent to UI
    const reqClass = {
      id: unit.id,
      class_name: unit.class_name,
      day: unit.day,
      start_time: unit.start_time,
      current_size: unit.current_size,
      max_size: unit.max_size,
      trainer_id: unit.trainer_id,
      trainer_name: activeTrainer[0].first_name,
    };

    classBundle.push(reqClass);
  });
  classBundle.push(classesJoined);
  return classBundle;
};
