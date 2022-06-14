async function addUser(
  name,
  email,
  password,
  mobile,
  qualification,
  role,
  gdo
) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      qualification: qualification,
      role: role,
      gdo: gdo,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  };
  return fetch(`/users/users`, requestOptions).then((response) =>
    response.json()
  );
}

async function checkAdmins(role, gdo) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return fetch(`users/gdo-admit?role=${role}&gdo=${gdo}`, requestOptions).then(
    (response) => response.json()
  );
}

export { addUser, checkAdmins };
