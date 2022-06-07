import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getGoals, deleteGoal } from "./api";

const EmployeeGoals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [goals, setGoals] = useState([]);
  const date = new Date();
  const presentMonth = date.getMonth();
  const [value, setValue] = useState(presentMonth + 1);

  const options = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    async function fetchGoals() {
      const responses = getGoals(location.state.role, location.state.id, value);
      responses.then((response) => setGoals(response.data));
    }
    fetchGoals();
  }, [value, goals]);

  return (
    <div>
      <h4>Welcome {location.state.name} Employee</h4>

      <Dropdown options={options} value={value} onChange={handleChange} />

      <table>
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((item) => (
            <tr key={item.goal.id}>
              <td>{item.goal.goal_name}</td>
              <td>{item.goal.status}</td>
              <td>{item.goal.date.slice(0, 10)}</td>
              <td>
                <button
                  onClick={() => {
                    deleteGoal(item.goal.id);
                  }}
                >
                  Delete Goal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form>
        <button
          onClick={() => {
            navigate("/addgoal", {
              state: { id: location.state.id, role: location.state.role },
            });
          }}
        >
          Click to add a goal
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default EmployeeGoals;
