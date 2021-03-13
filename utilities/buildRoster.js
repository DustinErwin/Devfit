//This function builds the roster for trainer to see
module.exports = function (members, selectedClass) {
  const classRoster = [];
  const currentRosterIds = selectedClass.roster;
  members.forEach((member) => {
 
    const isMember = currentRosterIds.includes(`${member._id}`);

    if (isMember) {
      const memberInfo = `${member.first_name} ${member.last_name} ${member._id}`;

      classRoster.push(memberInfo);
    }
  });

  return classRoster;
};
