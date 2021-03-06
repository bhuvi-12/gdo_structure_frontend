import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {getOtherGoals} from "./api";

const EmployeeGoalsEmpty = () => {
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
    async function fetchGoals() {
      const responses = getOtherGoals(location.state.role, location.state.id, value);
      responses.then((response) => setGoals(response.data));
    }
    fetchGoals();
  }, [value]);

  return (
    <div>

        <h4>Goals of Employee {location.state.name}</h4>

        <div className="drop">
        <Dropdown options={options} value={value} onChange={handleChange} />
      </div>

      <div>{
        goals.length?<div><table>
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((item) => (
            <tr key={item.goal.id}>
              <td>{item.goal.goal_name}</td>
              <td>{item.goal.status.status}</td>
              <td>{item.goal.date.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table></div>:<div><h3>No records to show for selected month</h3></div>
        }</div>
      <button className="button3" onClick={()=> navigate(-1)}>Go Back</button>
    </div>
  );
};

export default EmployeeGoalsEmpty;
