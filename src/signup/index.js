import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addUser from "./api";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    qualification: "",
    role: "employee",
    gdo: "gdo1",
  });

  async function addUsertoDB() {
    var regName = /^[a-zA-Z]+[a-zA-Z]$/;
    var regMail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    var regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var regTel = /^[0-9]{10}$/;

    if (
      regName.test(formData.name) &&
      regMail.test(formData.email) &&
      regPass.test(formData.password) &&
      regTel.test(formData.mobile)
    ) {
      if (
        (formData.role === "super_admin" && formData.gdo === "gdo") ||
        (formData.role === "admin" && formData.gdo !== "gdo") ||
        (formData.role === "employee" && formData.gdo !== "gdo")
      ) {
        const responses = addUser(
          formData.name,
          formData.email,
          formData.password,
          formData.mobile,
          formData.qualification,
          formData.role,
          formData.gdo
        );
        console.log(responses);
        alert("user added successfully");
        navigate(-1);
      } else {
        alert("super_admin should have only GDO ");
      }
    } else {
      alert(
        "format of name, email, password, mobile should be correct & shouldn't be empty"
      );
    }
  }

  return (
    <div>
      <form>
        <h3>Sign Up Form</h3>
        <label htmlFor="username">User Name</label>
        <input
          value={formData.name}
          type="text"
          name="username"
          id="username"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          value={formData.email}
          type="email"
          name="email"
          id="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          value={formData.password}
          type="password"
          name="password"
          id="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <br />

        <label htmlFor="mobile">Mobile</label>
        <input
          value={formData.mobile}
          type="tel"
          name="mobile"
          id="mobile"
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        <br />

        <label htmlFor="qualification">Qualification</label>
        <input
          value={formData.qualification}
          type="text"
          name="qualification"
          id="qualification"
          onChange={(e) =>
            setFormData({ ...formData, qualification: e.target.value })
          }
        />
        <br />

        <label htmlFor="role">Role</label>
        <select
          value={formData.role}
          type="dropdown"
          name="role"
          id="role"
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="employee">employee</option>
          <option value="admin">admin</option>
          <option value="super_admin">super admin</option>
        </select>
        <br />

        <label htmlFor="gdo">GDO</label>
        <select
          value={formData.gdo}
          type="dropdown"
          name="gdo"
          id="gdo"
          onChange={(e) => setFormData({ ...formData, gdo: e.target.value })}
        >
          <option value="gdo1">GDO 1</option>
          <option value="gdo2">GDO 2</option>
          <option value="gdo3">GDO 3</option>
          <option value="gdo4">GDO 4</option>
          <option value="gdo">GDO</option>
        </select>
        <br />

        <button
          className="button"
          onClick={(e) => {
            addUsertoDB();
            e.preventDefault();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
