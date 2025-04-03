import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiUsers, FiBook, FiDollarSign, FiActivity } from "react-icons/fi";
import AdminSidebar from "../Admin-Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
  width: 100%;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #6c757d;
  font-size: 1rem;
  font-weight: 500;
`;

const CardValue = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
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

const ChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-height: 300px;
`;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: 0,
    newUsers: 0,
    courses: 0,
    revenue: 0,
    userGrowth: [],
    recentUsers: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersResponse = await fetch("/api/dashboard/total-users");
        const usersData = await usersResponse.json();

        const userGrowthResponse = await fetch("/api/dashboard/user-growth");
        const userGrowthData = await userGrowthResponse.json();

        const recentUsersResponse = await fetch("/api/dashboard/recent-users");
        const recentUsersData = await recentUsersResponse.json();

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsers = recentUsersData.filter(
          (user) => new Date(user.created_at) >= thirtyDaysAgo
        ).length;

        setDashboardData({
          users: usersData.totalUsers,
          newUsers,
          userGrowth: userGrowthData,
          recentUsers: recentUsersData,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardContainer>
      <AdminSidebar />
      <Content>
        <DashboardBanner />
        <AnalyticsGrid>
          <AnalyticsCard>
            <CardIcon color="#4a90e2"><FiUsers /></CardIcon>
            <CardContent>
              <CardTitle>Total Users</CardTitle>
              <CardValue>{dashboardData.users.toLocaleString()}</CardValue>
            </CardContent>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardIcon color="#50e3c2"><FiActivity /></CardIcon>
            <CardContent>
              <CardTitle>New Users (30d)</CardTitle>
              <CardValue>+{dashboardData.newUsers.toLocaleString()}</CardValue>
            </CardContent>
          </AnalyticsCard>
        </AnalyticsGrid>

        <ChartsContainer>
          <ChartContainer>
            <h3>Course Tracking</h3>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={dashboardData.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#4a90e2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartsContainer>
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;