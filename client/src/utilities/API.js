//grabs a list of all members for input options


export const testGetAllMembers = () => {
    const result = fetch("/api/manager/memberList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((memberArray) => memberArray.json())
   
      return result 
  }

