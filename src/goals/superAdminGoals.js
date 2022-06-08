import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getGoals, getAdmins, deleteGoal } from "./api";
import getEmployeesOfAdmin from "./api2";

const SuperAdminGoals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [goals, setGoals] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
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
  }, [value]);

  useEffect(() => {
    async function fetchAdmins() {
      const responses = getAdmins();
      responses.then((response) => setAdmins(response.data));
    }

    fetchAdmins();
  }, []);

  async function fetchEmployeesOfAdmin(id) {
    const responses = getEmployeesOfAdmin(id);
    responses.then((response) => setEmployees(response.data));
  }

  return (
    <div>
      <h4>Welcome {location.state.name} Super-Admin</h4>

      <Dropdown options={options} value={value} onChange={handleChange} />

      <table>
        <thead>
          <tr>
            <th>Gaol Name</th>
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
              <td>{item.goal.status}</td>
              <td>{item.goal.date.slice(0, 10)}</td>
              <td>
                <button
                  onClick={() => {
                    deleteGoal(item.goal.id);
                    window.location.reload();
                  }}
                >
                  Delete Goal
                </button>
              </td>
              <td>
                <button onClick={() => {
                  navigate("/editgoal",{state:{id:item.goal.id, gaol_name:item.goal.goal_name, status:item.goal.status}});
                }}>
                  Edit Goal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {
          navigate("/addgoal", {
            state: { id: location.state.id, role: location.state.role },
          });
        }}
      >
        Click to add a goal
      </button>

      <h4>All the Admins</h4>
      <table>
        <thead>
          <tr>
            <th>Admin Name</th>
            <th>Goals</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>
                <button
                  onClick={() => {
                    navigate("/goals", {
                      state: { id: admin.id, name: admin.name, role: "admin" },
                    });
                  }}
                >
                  Goals{" "}
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    fetchEmployeesOfAdmin(admin.id);
                  }}
                >
                  Click Here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Employees of Selected Admin</h4>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>
                <button
                  onClick={() => {
                    navigate("/goals", {
                      state: {
                        id: employee.id,
                        name: employee.name,
                        role: "employee",
                      },
                    });
                  }}
                >
                  Goals{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default SuperAdminGoals;
