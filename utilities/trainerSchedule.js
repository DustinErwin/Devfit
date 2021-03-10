//This function will send an object with trainers name and the classes being taught by the trainer user
module.exports = function (trainer, classes) {
  const classBundle = [];

  classes.forEach((unit) => {
    //Object to be sent to UI
    const reqClass = {
      id: unit._id,
      class_name: unit.class_name,
      day: unit.day,
      start_time: unit.start_time,
      current_size: unit.current_size,
      max_size: unit.max_size,
      trainer_id: unit.trainer_id,
    };

    classBundle.push(reqClass);
  });

  return classBundle;
};
