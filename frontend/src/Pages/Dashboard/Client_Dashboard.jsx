import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiBook, FiDollarSign, FiActivity, FiBell, FiAward, FiBookOpen, FiClock } from "react-icons/fi";
import Sidebar from "../Dashboard/Sidebar";
import { Link } from 'react-router-dom';
// Styled components


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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const WelcomeMessage = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #2d3748;
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-top: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationLink = styled(Link)`
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
    background: #f1f3f5;
  }
`;

// Keep the NotificationItem styled component as:
const NotificationItem = styled.div`
  padding: 0;
  border-bottom: 1px solid #f8f9fa;
  background: ${props => props.unread ? '#f8f9fa' : 'white'};
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
`;


const NotificationTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  color: #2d3748;
`;

const NotificationMessage = styled.p`
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
`;

const NotificationDate = styled.small`
  color: #adb5bd;
  font-size: 0.75rem;
`;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [clientData, setClientData] = useState({});
  const [username, setUsername] = useState("User");
  const [userRole, setUserRole] = useState("admin");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulating API calls
    const mockAdminData = {
      users: 2458,
      newUsers: 154,
      courses: 42,
      revenue: 12540.50,
      userGrowth: [
        { month: 'Jan', users: 400 },
        { month: 'Feb', users: 800 },
        { month: 'Mar', users: 1200 },
        { month: 'Apr', users: 1600 },
        { month: 'May', users: 2000 },
        { month: 'Jun', users: 2458 },
      ],
      recentUsers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2024-02-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2024-02-14' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joined: '2024-02-13' },
      ]
    };

    const mockClientData = {
      rank: 2458,
      vocabsLearned: 154,
      activeStreak: 42,
      timeSpent: 125,
      progressData: [
        { day: 'Mon', progress: 40 },
        { day: 'Tue', progress: 60 },
        { day: 'Wed', progress: 75 },
        { day: 'Thu', progress: 55 },
        { day: 'Fri', progress: 90 },
        { day: 'Sat', progress: 85 },
      ],
      recentCourses: [
        { id: 1, name: 'Basic Vocabulary', progress: 75 },
        { id: 2, name: 'Business English', progress: 40 },
        { id: 3, name: 'Travel Phrases', progress: 90 },
      ]
    };

    const mockNotifications = [
      { 
        id: 1, 
        title: 'New Achievement!', 
        message: 'You reached 100 vocabulary words!', 
        date: '2024-03-01', 
        read: false
      },
      { 
        id: 2, 
        title: 'Course Update', 
        message: 'New lessons added in Business English', 
        date: '2024-02-28', 
        read: true
      },
    ];
    setDashboardData(mockAdminData);
    setClientData(mockClientData);
    setNotifications(mockNotifications);
    setUsername("John Doe");
    // setUserRole("client"); // Change this to switch between admin/client view
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <Header>
          <WelcomeMessage>Welcome, {username}!</WelcomeMessage>
          <NotificationWrapper>
  <NotificationIcon onClick={() => setShowNotifications(!showNotifications)}>
    <FiBell />
    {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
  </NotificationIcon>
  {showNotifications && (
    <NotificationDropdown>
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id}
          unread={!notification.read}
        >
          <NotificationLink 
            to="/profile/notification"
            onClick={() => {
              markAsRead(notification.id);
              setShowNotifications(false);
            }}
          >
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
            <NotificationDate>
              {new Date(notification.date).toLocaleDateString()}
            </NotificationDate>
          </NotificationLink>
        </NotificationItem>
      ))}
    </NotificationDropdown>
  )}
</NotificationWrapper>
        </Header>

        {userRole === 'admin' ? (
          <>
            <AnalyticsGrid>
              <AnalyticsCard>
                <CardIcon color="#4a90e2">
                  <FiUsers />
                </CardIcon>
                <CardContent>
                  <CardTitle>Course</CardTitle>
                  <CardValue>{dashboardData.users?.toLocaleString()}</CardValue>
                </CardContent>
              </AnalyticsCard>

              <AnalyticsCard>
                <CardIcon color="#50e3c2">
                  <FiActivity />
                </CardIcon>
                <CardContent>
                  <CardTitle>Vocabulary</CardTitle>
                  <CardValue>+{dashboardData.newUsers?.toLocaleString()}/500</CardValue>
                </CardContent>
              </AnalyticsCard>

              <AnalyticsCard>
                <CardIcon color="#f5a623">
                  <FiBook />
                </CardIcon>
                <CardContent>
                  <CardTitle>Courses</CardTitle>
                  <CardValue>{dashboardData.courses}</CardValue>
                </CardContent>
              </AnalyticsCard>

              <AnalyticsCard>
                <CardIcon color="#7ed321">
                  <FiDollarSign />
                </CardIcon>
                <CardContent>
                  <CardTitle>Ranking</CardTitle>
                  <CardValue>${dashboardData.revenue?.toLocaleString()}</CardValue>
                </CardContent>
              </AnalyticsCard>
            </AnalyticsGrid>

            <ChartContainer>
              <h3>Course Tracking</h3>
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
                      <TableCell>
                        {new Date(user.joined).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </RecentActivityTable>
            </ChartContainer>
          </>
        ) : (
          <>
            <AnalyticsGrid>
              <AnalyticsCard>
                <CardIcon color="#4a90e2">
                  <FiAward />
                </CardIcon>
                <CardContent>
                  <CardTitle>Current Rank</CardTitle>
                  <CardValue>#{clientData.rank}</CardValue>
                </CardContent>
              </AnalyticsCard>

              <AnalyticsCard>
                <CardIcon color="#50e3c2">
                  <FiBookOpen />
                </CardIcon>
                <CardContent>
                  <CardTitle>Vocabs Learned</CardTitle>
                  <CardValue>{clientData.vocabsLearned}</CardValue>
                </CardContent>
              </AnalyticsCard>

              <AnalyticsCard>
                <CardIcon color="#f5a623">
                  <FiClock />
                </CardIcon>
                <CardContent>
                  <CardTitle>Active Streak</CardTitle>
                  <CardValue>{clientData.activeStreak} days</CardValue>
                </CardContent>
              </AnalyticsCard>

              <AnalyticsCard>
                <CardIcon color="#7ed321">
                  <FiActivity />
                </CardIcon>
                <CardContent>
                  <CardTitle>Time Spent (h)</CardTitle>
                  <CardValue>{clientData.timeSpent}</CardValue>
                </CardContent>
              </AnalyticsCard>
            </AnalyticsGrid>

            <ChartContainer>
              <h3>Weekly Progress</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={clientData.progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#4a90e2" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer>
              <h3>Course Progress</h3>
              <RecentActivityTable>
                <TableHeader>
                  <tr>
                    <TableCell>Course</TableCell>
                    <TableCell>Progress</TableCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {clientData.recentCourses?.map(course => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.progress}%</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </RecentActivityTable>
            </ChartContainer>
          </>
        )}
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;