import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getEmployeesOfAdmin from "./api2";
import DisplayGoals from "./displayGoals";

const AdminGoals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployeesOfAdmin() {
      const responses = getEmployeesOfAdmin(location.state.id);
      responses.then((response) => setEmployees(response.data));
    }
    fetchEmployeesOfAdmin();
  }, []);

  return (
    <div>
      <h4 className="mt-3">Welcome {location.state.name} Admin</h4>

      <DisplayGoals
        name={location.state.name}
        id={location.state.id}
        role={location.state.role}
      />

      <h4 className="my-3">Employees of the {location.state.gdo}</h4>
      <table className="my-4">
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

export default AdminGoals;
