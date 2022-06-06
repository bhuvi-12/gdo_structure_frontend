import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Users from "./users";
import EmployeeGoals from "./goals/employeeGoals";
import AdminGoals from "./goals/adminGoals";
import SuperAdminGoals from "./goals/superAdminGoals";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Users />} />
        <Route path="/employee/goals" element={<EmployeeGoals/>}/>
        <Route path="/admin/goals" element={<AdminGoals/>}/>
        <Route path="/super-admin/goals" element={<SuperAdminGoals/>}/>
      </Routes>
    </>
  );
}

export default App;
