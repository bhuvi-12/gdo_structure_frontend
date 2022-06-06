async function getGoals(role, id, month) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `/user/goals?id=${id}&role=${role}&month=${month}`,
    requestOptions
  ).then((response) => response.json());
}

export default getGoals;
