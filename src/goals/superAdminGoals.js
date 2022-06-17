import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAdmins } from "./api";
import DisplayGoals from "./displayGoals";
import getEmployeesOfAdmin from "./api2";

const SuperAdminGoals = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchAdmins() {
      const responses = getAdmins();
      responses.then((response) => setAdmins(response.data));
    }

    fetchAdmins();
  }, [admins]);

  async function fetchEmployeesOfAdmin(id) {
    const responses = getEmployeesOfAdmin(id);
    responses.then((response) => setEmployees(response.data));
  }

  return (
    <div>
      {localStorage.getItem("token") ? (
        <div>
          <h4 className="mt-3">Welcome {state.name} Super Admin</h4>
          <DisplayGoals name={state.name} id={state.id} role={state.role} />
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
                <tr key={admin.user.id}>
                  <td>{admin.user.name}</td>
                  <td>
                    <button
                      className="button2"
                      onClick={() => {
                        navigate("/goals", {
                          state: {
                            id: admin.user.id,
                            name: admin.user.name,
                            role: "admin",
                          },
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
                        fetchEmployeesOfAdmin(admin.user.id);
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
                <tr key={employee.user.id}>
                  <td>{employee.user.name}</td>
                  <td>
                    <button
                      className="button2"
                      onClick={() => {
                        navigate("/goals", {
                          state: {
                            id: employee.user.id,
                            name: employee.user.name,
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
      ) : (
        <div>
          <button
            className="button3"
            onClick={(e) => {
              navigate("/login");
            }}
          >
            Go to Login Page
          </button>
        </div>
      )}
    </div>
  );
};

export default SuperAdminGoals;
