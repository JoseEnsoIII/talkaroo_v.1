import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiBook, FiDollarSign, FiActivity } from "react-icons/fi";
import AdminSidebar from "../Admin-Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";
// Add new styled components
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
  background-color: ${props => props.color};
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

const RecentActivityTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
`;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: 0,
    newUsers: 0,
    courses: 0,
    revenue: 0,
    userGrowth: [],
    recentUsers: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch users data
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
  
        // Calculate new users (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsers = usersData.filter(user => 
          new Date(user.created_at) >= thirtyDaysAgo
        ).length;
  
        // Transform users data for table
        const recentUsers = usersData.map(user => ({
          id: user.id,
          name: [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username,
          email: user.email,
          joined: user.created_at,
          enrolled: !!user.enrolled_course_name,
          enrolled_course_name: user.enrolled_course_name || 'N/A'
        })).sort((a, b) => new Date(b.joined) - new Date(a.joined));
  
        setDashboardData(prev => ({
          ...prev,
          users: usersData.length,
          newUsers,
          recentUsers
        }));
  
      } catch (error) {
        console.error('Error fetching data:', error);
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
            <CardIcon color="#4a90e2">
              <FiUsers />
            </CardIcon>
            <CardContent>
              <CardTitle>Total Users</CardTitle>
              <CardValue>{dashboardData.users.toLocaleString()}</CardValue>
            </CardContent>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardIcon color="#50e3c2">
              <FiActivity />
            </CardIcon>
            <CardContent>
              <CardTitle>New Users (30d)</CardTitle>
              <CardValue>+{dashboardData.newUsers.toLocaleString()}</CardValue>
            </CardContent>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardIcon color="#f5a623">
              <FiBook />
            </CardIcon>
            <CardContent>
              <CardTitle>Courses Offered</CardTitle>
              <CardValue>{dashboardData.courses}</CardValue>
            </CardContent>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardIcon color="#7ed321">
              <FiDollarSign />
            </CardIcon>
            <CardContent>
              <CardTitle>Revenue (30d)</CardTitle>
              <CardValue>${dashboardData.revenue.toLocaleString()}</CardValue>
            </CardContent>
          </AnalyticsCard>
        </AnalyticsGrid>

        <ChartContainer>
          <h3>User Growth</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={dashboardData.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#4a90e2" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <ChartContainer>
  <h3>New Enrollees</h3>
  <RecentActivityTable>
  <TableHeader>
    <tr>
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Join Date</TableCell>
      <TableCell>Enrollment Status</TableCell>
      <TableCell>Enrolled Course</TableCell>
    </tr>
  </TableHeader>
  <tbody>
    {dashboardData.recentUsers.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
        <TableCell>{user.enrolled ? 'Enrolled' : 'Not Enrolled'}</TableCell>
        <TableCell>{user.enrolled_course_name}</TableCell>
      </TableRow>
    ))}
  </tbody>
</RecentActivityTable>
</ChartContainer>


      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;