import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import DisplayGoals from "./displayGoals";

const EmployeeGoals = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div>{
      localStorage.getItem("token")?<div>
      <h4 className="mt-3">Welcome {state.name} Employee {state.gdo}</h4>
      <DisplayGoals name={state.name} id={state.id} role={state.role} />
      <button
        className="button3"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>:<div><button className="button3" onClick={(e)=> {
      navigate("/login")
    }}>Go to Login Page</button></div>
    }
    </div>
  );
};

export default EmployeeGoals;
