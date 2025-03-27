import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [message, setMessage] = useState("");

  // Fetch user details
  useEffect(() => {
    const storedUser = localStorage.getItem(`user_${id}`);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      axios.get(`https://reqres.in/api/users/${id}`)
        .then((response) => {
          setUser(response.data.data); // Fetch user details
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [id]);

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://reqres.in/api/users/${id}`, user)
      .then(() => {
        setMessage("User updated successfully!");

        // Manually store updates in local storage
        localStorage.setItem(`user_${id}`, JSON.stringify(user));

        setTimeout(() => navigate("/users"), 1000); // Redirect after update
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          required
        />
        <button type="submit">Update</button>
      </form>

      <button onClick={() => navigate("/users")} className="back">Back</button>
    </div>
  );
};

export default EditUser;
