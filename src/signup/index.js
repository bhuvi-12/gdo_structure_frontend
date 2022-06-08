import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import addUser from "./api";

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
  }

  return (
    <div>
      <form>
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
          onClick={(e) => {
            addUsertoDB();
            alert("user added successfully");
            navigate(-1);
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
