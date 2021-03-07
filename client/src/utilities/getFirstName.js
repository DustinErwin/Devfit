

function getFirstName(name) {
  const splitName = name.split(" ");
  const firstName = splitName[0];
  return firstName;
}

export default getFirstName