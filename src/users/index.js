import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  });

  return (
    <div>
      <h3>User Goals</h3>
    </div>
  );
};

export default Users;
