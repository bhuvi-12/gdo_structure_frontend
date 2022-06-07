import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addGoal } from "./api";

const AddGoals = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    goalName: "",
    status: "completed",
  });

  async function addGoalToDB(){
    const responses = addGoal(formData.goalName, formData.status, location.state.id, location.state.role);
    console.log(responses);
  }

  return (
    <div>
        <label htmlFor="goalName">Goal</label>
        <input
          value={formData.goalName}
          type="text"
          name="goalName"
          id="goalName"
          onChange={(e) =>
            setFormData({ ...formData, goalName: e.target.value })
          }
        />
        <br />

        <label htmlFor="status">Status</label>
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
          }}
        >
          Submit
        </button>
    </div>
  );
};

export default AddGoals;
