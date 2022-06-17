import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGoals, deleteGoal } from "./api";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const DisplayGoals = (props) => {
  const navigate = useNavigate();
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
      const responses = getGoals(props.role, props.id, value);
      responses.then((response) => setGoals(response.data));
    }
    fetchGoals();
  }, [value]);

  return (
    <div>

      <div className="drop">
        <Dropdown options={options} value={value} onChange={handleChange} />
      </div>

      <table className="my-4">
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((item) => (
            <tr key={item.goal.id}>
              <td>{item.goal.goal_name}</td>
              <td>{item.goal.status.status}</td>
              <td>{item.goal.date.slice(0, 10)}</td>
              <td>
                <button
                className="button2"
                  onClick={() => {
                    deleteGoal(item.goal.id);
                    window.location.reload();
                  }}
                >
                  Delete Goal
                </button>
              </td>
              <td>
                <button
                className="button2"
                  onClick={() => {
                    navigate("/editgoal", {
                      state: {
                        id: item.goal.id,
                        gaol_name: item.goal.goal_name,
                        status: item.goal.status.status,
                      },
                    });
                  }}
                >
                  Edit Goal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
        className="button3"
          onClick={() => {
            navigate("/addgoal", {
              state: { id: props.id, role: props.role },
            });
          }}
        >
          Add a goal
        </button>

      </div>
    </div>
  );
};

export default DisplayGoals;
