import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiBook, FiDollarSign, FiActivity } from "react-icons/fi";
import Sidebar from "../Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
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
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const ChartsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 400px;
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const RecentActivityTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const mockAdminData = {
      users: 2458,
      newUsers: 154,
      courses: 42,
      revenue: 12540.50,
      userGrowth: [
        { month: 'Jan', users: 400 },
        { month: 'Feb', users: 800 },
        { month: 'Mar', users: 1200 },
      ],
      recentUsers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2024-02-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2024-02-14' },
      ]
    };
    setDashboardData(mockAdminData);
  }, []);

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <DashboardBanner />
        <AnalyticsGrid>
          <AnalyticsCard>
            <CardIcon color="#4a90e2"><FiUsers /></CardIcon>
            <div>Users: {dashboardData.users?.toLocaleString()}</div>
          </AnalyticsCard>
          <AnalyticsCard>
            <CardIcon color="#50e3c2"><FiActivity /></CardIcon>
            <div>New Users: {dashboardData.newUsers?.toLocaleString()}</div>
          </AnalyticsCard>
          <AnalyticsCard>
            <CardIcon color="#f5a623"><FiBook /></CardIcon>
            <div>Courses: {dashboardData.courses}</div>
          </AnalyticsCard>
          <AnalyticsCard>
            <CardIcon color="#7ed321"><FiDollarSign /></CardIcon>
            <div>Revenue: ${dashboardData.revenue?.toLocaleString()}</div>
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

          <ChartContainer>
            <h3>Recent Activities</h3>
            <RecentActivityTable>
              <TableHeader>
                <tr>
                  <TableCell>Activity</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Join Date</TableCell>
                </tr>
              </TableHeader>
              <tbody>
                {dashboardData.recentUsers?.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </RecentActivityTable>
          </ChartContainer>
        </ChartsContainer>
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;
