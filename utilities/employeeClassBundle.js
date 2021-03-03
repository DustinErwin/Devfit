//This function will build the object to populate the schedule for employees
module.exports = function (classes, currentUser, trainers) {
  let classBundle = [];

  //Get user name and add it as the first index
  const userName = currentUser.first_name;
  classBundle.push({ userName: userName });

  //Loop to match trainer with class and build object for each class
  classes.forEach((unit) => {
    const activeTrainer = trainers.filter(
      (trainer) =>
        JSON.stringify(trainer._id) === JSON.stringify(unit.trainer_id)
    );

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
  return classBundle;
};
