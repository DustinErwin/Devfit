//This function will remove a member from the selected class
module.exports = function (selectedClass, memberid) {
  const newRoster = [];
  const oldRoster = selectedClass.roster;
  //Rewrites roster to NOT include the user
  oldRoster.map((member) => {
    if (JSON.stringify(member) !== JSON.stringify(memberid)) {
      newRoster.push(member);
    }
  });
  const newClassSize = newRoster.length;

  const classUpdate = {
    roster: newRoster,
    current_size: newClassSize,
  };

  return classUpdate;
};
