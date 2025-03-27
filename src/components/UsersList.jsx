import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${page}`)
      .then((response) => {
        const fetchedUsers = response.data.data;

        // Check if any users were updated locally
        const updatedUsers = fetchedUsers.map((user) => {
          const storedUser = localStorage.getItem(`user_${user.id}`);
          return storedUser ? JSON.parse(storedUser) : user;
        });

        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [page]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Delete user function
  const handleDelete = (id) => {
    axios.delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>
      
      {/* Logout Button */}
      <button onClick={handleLogout} className="logout">Logout</button>

      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img src={user.avatar} alt={user.first_name} />
          <p>{user.first_name} {user.last_name}</p>
          
          {/* Edit and Delete Buttons */}
          <button onClick={() => navigate(`/edit/${user.id}`)} className="edit">Edit</button>
          <button onClick={() => handleDelete(user.id)} className="delete">Delete</button>
        </div>
      ))}

      {/* Pagination Buttons */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UsersList;
