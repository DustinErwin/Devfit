//This function builds the roster for trainer to see
module.exports = function (members, selectedClass) {
  const classRoster = [];
  const currentRosterIds = selectedClass.roster;
  members.forEach((member) => {
    const isMember = currentRosterIds.includes(`${member._id}`);

    if (isMember) {
      const memberName = `${member.first_name} ${member.last_name}`;

      classRoster.push([memberName, member._id]);
    }
  });
  return classRoster;
};
