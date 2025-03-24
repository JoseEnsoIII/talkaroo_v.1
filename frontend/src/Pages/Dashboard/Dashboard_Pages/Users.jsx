import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 2rem;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #1890ff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #40a9ff;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 0.75rem;
  background-color: #f4f4f4;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
`;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "client", // default role
  });
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/users", newUser);
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: "client",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Set up edit mode for a user
  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUserData({
      username: user.username,
      email: user.email,
      password: "", // start with blank so admin can enter a new password if desired
      role: user.role,
    });
  };

  // Update the edited user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      // Send updated data; backend should check if editUserData.password is empty
      await axios.put(`http://localhost:5001/api/users/${editUserId}`, editUserData);
      setEditUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Container>
      <Heading>User Management</Heading>

      {/* Create User Form */}
      <Form onSubmit={handleCreateUser}>
        <Input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Role (client/admin)"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
        />
        <Button type="submit">Add User</Button>
      </Form>

      {/* Users Table */}
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Password</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>
                {editUserId === user.id ? (
                  <Input
                    type="text"
                    value={editUserData.username}
                    onChange={(e) =>
                      setEditUserData({ ...editUserData, username: e.target.value })
                    }
                  />
                ) : (
                  user.username
                )}
              </Td>
              <Td>
                {editUserId === user.id ? (
                  <Input
                    type="email"
                    value={editUserData.email}
                    onChange={(e) =>
                      setEditUserData({ ...editUserData, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </Td>
              <Td>
                {editUserId === user.id ? (
                  <Input
                    type="text"
                    value={editUserData.role}
                    onChange={(e) =>
                      setEditUserData({ ...editUserData, role: e.target.value })
                    }
                  />
                ) : (
                  user.role
                )}
              </Td>
              <Td>
                {editUserId === user.id ? (
                  <Input
                    type="password"
                    placeholder="New Password (leave blank to keep current)"
                    value={editUserData.password}
                    onChange={(e) =>
                      setEditUserData({ ...editUserData, password: e.target.value })
                    }
                  />
                ) : (
                  user.password
                )}
              </Td>
              <Td>
                {editUserId === user.id ? (
                  <>
                    <Button onClick={handleUpdateUser}>Save</Button>
                    <Button onClick={() => setEditUserId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditUser(user)}>Edit</Button>
                    <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                  </>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserTable;
