async function getEmployeesOfAdmin(id){
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return fetch(
      `/users/gdo?id=${id}`,
      requestOptions
    ).then((response) => response.json());
  }

export default getEmployeesOfAdmin;