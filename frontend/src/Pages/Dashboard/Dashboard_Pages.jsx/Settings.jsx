import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // For redirection
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FiUsers, FiBook, FiDollarSign, FiActivity } from "react-icons/fi";
import Sidebar from "../Sidebar";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
`;

const Header = styled.header`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT auth
        if (!token) {
          navigate("/login"); // Redirect to login if not authenticated
          return;
        }

        const response = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        setUser(userData);

        // Fetch dashboard data based on role
        const dashboardResponse = await fetch(
          userData.role === "admin" ? "/api/admin-dashboard" : "/api/client-dashboard"
        );

        if (!dashboardResponse.ok) throw new Error("Failed to fetch dashboard data");

        const dashboardData = await dashboardResponse.json();
        setDashboardData(dashboardData);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user || !dashboardData) {
    return <p>Loading...</p>; // Show loading state while fetching
  }

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <Header>
          <h1>{user.role === "admin" ? "Admin Dashboard" : "Client Dashboard"}</h1>
        </Header>
        <p>Welcome, {user.first_name}!</p>

        {/* Render different content based on role */}
        {user.role === "admin" ? (
          <div>
            <h2>Admin Analytics</h2>
            <p>Total Users: {dashboardData.totalUsers}</p>
            <p>Total Revenue: ${dashboardData.revenue}</p>
          </div>
        ) : (
          <div>
            <h2>Client Overview</h2>
            <p>Your Purchases: {dashboardData.purchases}</p>
            <p>Subscription Status: {dashboardData.subscription}</p>
          </div>
        )}
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;
