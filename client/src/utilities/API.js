//--------------------------------Manager Apis-------------------------------------------
//gets all members
export const getMembersApi = () => {
  const result = fetch("/api/manager/memberList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((members) => members.json());

  return result;
};

//gets all trainers
export const getTrainersApi = () => {
  const result = fetch("/api/manager/trainers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((trainers) => trainers.json());

  return result;
};

//Post New Employee
export const postTrainerApi = (dataObject) => {
  fetch("/api/manager/addEmployee", {
    method: "POST",
    body: JSON.stringify(dataObject),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};

//Delete Employee from DB
export const terminateTrainerApi = (trainerId) => {
  fetch(`/api/manager/deleteTrainer/` + trainerId, {
    method: "DELETE",
  }).then((res) => res.json());
};

//take user_id to grab schedule
export const renderScheduleApi = (userId) => {
  const result = fetch(`/api/employee/${userId}/classes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return result;
};

//take classId to get roster
export const fetchClassRosterApi = (classId) => {
  const result = fetch(`/api/class/${classId}/roster`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return result;
};

// take in userId and classId as an object to remove member from class
export const removeMemberApi = (idObject) => {
  const result = fetch("/api/manager/removeFromClass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(idObject),
  });
  return result;
};
// take in userID and ClassId as an object to add member to class
export const addToClassApi = (idObject) => {
  const result = fetch("/api/manager/addToClass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(idObject),
  });
  return result;
};
