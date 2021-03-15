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
