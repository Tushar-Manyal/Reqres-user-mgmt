import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";
import "./styles.css";


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* If user is logged in, go to Users List; otherwise, show Login page */}
        <Route path="/" element={token ? <Navigate to="/users" /> : <Login setToken={setToken} />} />
        
        {/* Users List Page (Only accessible if logged in) */}
        <Route path="/users" element={token ? <UsersList token={token} /> : <Navigate to="/" />} />

        {/* Edit User Page (Only accessible if logged in) */}
        <Route path="/edit/:id" element={token ? <EditUser token={token} /> : <Navigate to="/" />} />

        {/* Default route for unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;




