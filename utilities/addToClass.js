module.exports = function (selectedClass, memberid) {
  let isAlreadyEnrolled = false;

  //Pulls class roster and checks if user is already joined
  const oldRoster = selectedClass.roster;
  oldRoster.forEach((member) => {
    if (JSON.stringify(memberid) === JSON.stringify(member)) {
      isAlreadyEnrolled = true;
    }
  });

  if (!isAlreadyEnrolled) {
    //Adds user to roster and updates class size
    oldRoster.push(memberid);
    const newClassSize = oldRoster.length;
    const newRosterJoined = oldRoster;

    const classUpdate = {
      roster: newRosterJoined,
      current_size: newClassSize,
    };
    return classUpdate;
  } else {
    // Our error should go here
    return console.log("Member enrolled");
  }
};
