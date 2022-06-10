import React, { useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import DisplayGoals from "./displayGoals";

const EmployeeGoals = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  });

  return (
    <div>
      <h4 className="mt-3">Welcome {location.state.name} Employee</h4>
      <DisplayGoals
        name={location.state.name}
        id={location.state.id}
        role={location.state.role}
      />

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

export default EmployeeGoals;
