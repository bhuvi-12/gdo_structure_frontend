async function getGoals(role, id, month) {
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(
    `/user/goals?id=${id}&role=${role}&month=${month}`,
    requestOptions
  );
  return await response.json();
}

export default getGoals;
