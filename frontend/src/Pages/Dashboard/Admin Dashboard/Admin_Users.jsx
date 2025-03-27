import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FiUsers, FiBook, FiDollarSign, FiActivity } from "react-icons/fi";
import AdminSidebar from "../Admin-Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";
import Pagination from "../../Layout_Components/Pagination";

// Styled components for layout
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AnalyticsCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  height: 400px;
`;

// Styled Components for User Table
const Container = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

// User Management Table Component
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "client" });
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ username: "", email: "", password: "", role: "" });

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

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/users", newUser);
      setNewUser({ username: "", email: "", password: "", role: "client" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUserData({ username: user.username, email: user.email, password: "", role: user.role });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
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
      <Form onSubmit={handleCreateUser}>
        <Input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required />
        <Input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
        <Input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
        <Button type="submit">Add User</Button>
      </Form>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Button onClick={() => handleEditUser(user)}>Edit</Button>
                <Button onClick={() => handleDeleteUser(user.id)} style={{ backgroundColor: "#ff4d4f" }}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

// Admin Dashboard
const AdminUsers = () => {
  return (
    <DashboardContainer>
      <AdminSidebar />
      <Content>
        <DashboardBanner />

        {/* User Management Section */}
        <UserTable />
        <Pagination />
      </Content>
    </DashboardContainer>
  );
};

export default AdminUsers;
