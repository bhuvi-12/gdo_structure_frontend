import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateGoal } from "./api";

const EditGoals = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    goalName: location.state.goal_name,
    status: location.state.status,
  });

  async function addGoalToDB(){
    updateGoal(formData.goalName, formData.status, location.state.id);
  }

  return (
    <div>
        <label htmlFor="goalName">Change Goal</label>
        <input
          value={formData.goalName}
          type="text"
          name="goalName"
          id="goalName"
          placeholder="change the goal name"
          onChange={(e) =>
            setFormData({ ...formData, goalName: e.target.value })
          }
        />
        <br />

        <label htmlFor="status">Change Status</label>
        <select
          value={formData.status}
          type="dropdown"
          name="status"
          id="status"
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="completed">completed</option>
          <option value="pending">pending</option>
          <option value="failed">failed</option>
        </select>

        <button
          onClick={() => {
            addGoalToDB();
            alert("goal added successfully");
            navigate(-1);
          }}
        >
          Submit
        </button>
    </div>
  );
};

export default EditGoals;
