export const employeeAddClass = (classData) => {
  const result = fetch("/api/employee/addClass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  }).then((response) => response.text());

  return result;
};

export const employeeRemoveClass = (id) => {
  const result = fetch(`/api/employee/removeClass/${id}`, {
    method: "DELETE",
  }).then((res) => res.text());

  return result;
};

export const employeeTrainingSchedule = (id) => {
  const result = fetch(`/api/employee/${id}/schedule`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return result;
};

export const updateClassRoster = (classId) => {
  const result = fetch(`/api/class/${classId}/roster`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((currentRoster) => currentRoster.json());
  return result;
};
