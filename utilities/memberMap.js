//This function will send a list of all members enrolled in the gym to the manager
module.exports = function (members) {
  const memberList = [];
  members.map((member) => {
    const oneMember = {
      id: member._id,
      fullName: `${member.first_name} ${member.last_name}`,
    };
    memberList.push(oneMember);
  });
  return memberList;
};
