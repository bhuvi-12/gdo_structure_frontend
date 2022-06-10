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
    addGoal(formData.goalName, formData.status, location.state.id, location.state.role);
  }

  return (
    <div>
        <div className="goaladd">
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

        <button className="button3"
          onClick={(e) => {
            addGoalToDB();
            alert("goal added successfully");
            navigate(-1);
            e.preventDefault();
          }}
        >
          Submit
        </button>
        </div>
    </div>
  );
};

export default AddGoals;
