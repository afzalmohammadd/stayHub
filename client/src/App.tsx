import React from "react";
import LoginPage from "./scenes/loginPage";
import RegisterPage from "./scenes/registerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./scenes/home";
import Login from "./scenesAdmin/login";
import Register from "./scenesAdmin/register";
import AdminDashboard from "./scenesAdmin/adminDashboard";



function App() {
  
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            {/* User */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/SignupPage" element={<RegisterPage />} />

            {/* Admin Side */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
      
        
      
    </div>
  );
}

export default App;
