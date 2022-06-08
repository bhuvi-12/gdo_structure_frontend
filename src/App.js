import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Users from "./users";
import EmployeeGoals from "./goals/employeeGoals";
import AdminGoals from "./goals/adminGoals";
import SuperAdminGoals from "./goals/superAdminGoals";
import EmployeeGoalsEmpty from "./goals/employeeGoalsEmpty";
import AddGoals from "./goals/addGoals";
import EditGoals from "./goals/editGoals";
import SignUp from "./signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Users />} />
        <Route path="/employee-goals" element={<EmployeeGoals/>}/>
        <Route path="/admin-goals" element={<AdminGoals/>}/>
        <Route path="/super-admin-goals" element={<SuperAdminGoals/>}/>
        <Route path="/goals" element={<EmployeeGoalsEmpty/>}/>
        <Route path="/addgoal" element={<AddGoals/>}/>
        <Route path="/editgoal" element={<EditGoals/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default App;
