async function getGoals(role, id, month) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `/goals/goals?month=${month}`,
    requestOptions
  );
  return await response.json();
}

async function getOtherGoals(role, id, month) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `/goals/goals?id=${id}&role=${role}&month=${month}`,
    requestOptions
  );
  return await response.json();
}

async function getAdmins(){
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `/users/admin`,
    requestOptions
  );
  return await response.json();
}

async function addGoal(goalName, status, id, role){
  const requestOptions = {
    method:"POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goal_name:goalName,
      status:status,
      date:new Date(),
      user_id:id,
      createdAt:new Date(),
      updatedAt:new Date()
    }),
  };
  return fetch(`/goals/${role}-goals?user_id=${id}`, requestOptions).then((response) => response.json());
}

async function deleteGoal(id,userId){
  const requestOptions = {
    method:"DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }
  return fetch(`goals/delete?id=${id}&user_id=${userId}`,requestOptions).then((response) => response.json());
}

async function updateGoal(goalName, status, id, userId){
  const requestOptions = {
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      id:id,
      goal_name:goalName,
      status:status,
      updatedAt:new Date()
    }),
  };
  return fetch(`/goals/update?user_id=${userId}`, requestOptions).then((response) => response.json());
}

export {getGoals, getOtherGoals, getAdmins, addGoal, deleteGoal, updateGoal};
