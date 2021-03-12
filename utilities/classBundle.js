//This function will build the object sent to populate the class schedule for members
module.exports = function (classes, trainers) {
  let classBundle = [];

  classes.forEach((unit) => {
    const activeTrainer = trainers.filter((trainer) => {
      return JSON.stringify(trainer._id) === JSON.stringify(unit.trainer_id);
    });

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
