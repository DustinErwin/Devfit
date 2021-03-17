export const getScheduleData = () => {
  const result = fetch("/api/class/classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return result;
};

export const removeMemberFromClass = (data) => {
  const result = fetch("/api/member/removeFromClass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return result;
};

export const addMemberToClass = (data) => {
  const result = fetch("/api/member/addToClass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  return result;
};

export const memberJoinedClasses = (id) => {
  const result = fetch(`/api/member/${id}/classes`, {}).then((res) =>
    res.json()
  );

  return result;
};
