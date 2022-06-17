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
              className="button"
              type="submit"
              onClick={async (e) => {
                e.preventDefault();

                const response = await login(email, password);

                if (response.message) {
                  alert(response.message);
                } else {
                  localStorage.setItem("token", response.jwt);

                  if (response.jwt && response.details.role === "employee") {
                    navigate("/employee-goals", {
                      state: {
                        name: response.details.user.name,
                        role: response.details.role,
                        id: response.details.user.id,
                      },
                    });
                  } else if (
                    response.jwt &&
                    response.details.role === "admin"
                  ) {
                    navigate("/admin-goals", {
                      state: {
                        name: response.details.user.name,
                        role: response.details.role,
                        id: response.details.user.id,
                        gdo: response.gdo,
                      },
                    });
                  } else {
                    navigate("/super-admin-goals", {
                      state: {
                        name: response.details.user.name,
                        role: response.details.role,
                        id: response.details.user.id,
                      },
                    });
                  }
                }
              }}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="button"
              onClick={async (e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              SignUp
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
