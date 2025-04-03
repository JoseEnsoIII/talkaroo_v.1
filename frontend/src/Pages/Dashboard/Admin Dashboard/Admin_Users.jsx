import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FiUsers, FiBook, FiDollarSign, FiActivity } from "react-icons/fi";
import AdminSidebar from "../Admin-Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";
import Pagination from "../../Layout_Components/Pagination";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
height:100vh;
  width: 100%;
  max-width: 100vw;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 100%;
  font-size: 0.8rem;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 0.5rem;
  background-color: #f4f4f4;
  font-size: 0.8rem;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
`;

const Button = styled.button`
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  background-color: #1890ff;
  color: white;
  cursor: pointer;
  font-size: 0.7rem;
  &:hover {
    background-color: #40a9ff;
  }
`;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Heading>User Management</Heading>
      <div style={{ overflowX: "auto" }}>
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Course</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.enrolled_course_name}</Td>
                <Td>
                  <Button>Edit</Button>
                  <Button style={{ backgroundColor: "#ff4d4f", marginLeft: "0.3rem" }}>Delete</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} />
    </Container>
  );
};

const AdminUsers = () => {
  return (
    <DashboardContainer>
      <AdminSidebar />
      <Content>
        <DashboardBanner />
        <UserTable />
      </Content>
    </DashboardContainer>
  );
};

export default AdminUsers;
