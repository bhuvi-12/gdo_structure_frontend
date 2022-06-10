import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAdmins } from "./api";
import DisplayGoals from "./displayGoals";
import getEmployeesOfAdmin from "./api2";

const SuperAdminGoals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  });

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
      <h4 className="mt-3">Welcome {location.state.name} Super-Admin</h4>

      <DisplayGoals
        name={location.state.name}
        id={location.state.id}
        role={location.state.role}
      />

      <h4 className="my-4">All the Admins</h4>
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
                className="button2"
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
                className="button2"
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

      <h4 className="my-4">Employees of Selected Admin</h4>
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
                className="button2"
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
      className="button3"
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
