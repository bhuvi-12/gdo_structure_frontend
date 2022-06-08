import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "./api";
import "./index.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  return (
    <div>
      <h1>Goals</h1>
      <form>
        <ul>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </li>
          <li>
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();

                const response = await login(email, password);
                localStorage.setItem("token", response.jwt);

                if (response.jwt && response.details[0].role === "employee") {
                  navigate("/employee-goals",{state:{name:response.details[0].name, role:response.details[0].role, id:response.details[0].id}});
                }
                else if(response.jwt && response.details[0].role === "admin"){
                  navigate("/admin-goals",{state:{name:response.details[0].name, role:response.details[0].role, id:response.details[0].id, gdo:response.details[0].gdo}});
                }
                else{
                  navigate("/super-admin-goals",{state:{name:response.details[0].name, role:response.details[0].role, id:response.details[0].id}});
                }
              }}
            >
              Login
            </button>
          </li>
          <li>
              <button onClick={async (e) => {
                e.preventDefault();
                navigate("/signup");
              }}>
                SignUp
              </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
