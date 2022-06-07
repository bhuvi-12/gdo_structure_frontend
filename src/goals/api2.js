async function getEmployeesOfAdmin(id){
    const requestOptions = {
      method: "GET",
    };
    return fetch(
      `/users/gdo?id=${id}`,
      requestOptions
    ).then((response) => response.json());
  }

export default getEmployeesOfAdmin;