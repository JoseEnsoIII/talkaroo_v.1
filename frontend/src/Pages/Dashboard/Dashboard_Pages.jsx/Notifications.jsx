// NotificationPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FiBell, FiChevronLeft } from 'react-icons/fi';
import Sidebar from '../Sidebar';

// Reuse dashboard layout styles
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
`;

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  color: #2d3748;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #4a5568;
  }
`;

const NotificationList = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const NotificationItem = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #edf2f7;
  background: ${props => props.unread ? '#f8f9fa' : 'white'};
  position: relative;

  &:last-child {
    border-bottom: none;
  }
`;

const UnreadIndicator = styled.div`
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4a90e2;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 1rem;
`;

const NotificationMessage = styled.p`
  margin: 0;
  color: #718096;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const NotificationDate = styled.small`
  display: block;
  margin-top: 0.5rem;
  color: #a0aec0;
  font-size: 0.75rem;
`;

const NotificationPage = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/login");
            return;
          }
      
          // Fetch user data
          const userResponse = await fetch("localhost:5001/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (!userResponse.ok) {
            const text = await userResponse.text();
            throw new Error(`User fetch failed: ${text}`);
          }
          
          const contentType = userResponse.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid response format");
          }
          
          const userData = await userResponse.json();
          setUser(userData);
      
          // Fetch notifications
          const notificationsResponse = await fetch("/api/notifications", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (!notificationsResponse.ok) {
            const text = await notificationsResponse.text();
            throw new Error(`Notifications fetch failed: ${text}`);
          }
          
          const notificationsContentType = notificationsResponse.headers.get("content-type");
          if (!notificationsContentType || !notificationsContentType.includes("application/json")) {
            throw new Error("Invalid notifications response format");
          }
          
          const notificationsData = await notificationsResponse.json();
          setNotifications(notificationsData);
      
        } catch (error) {
          console.error(error);
          localStorage.removeItem("token");
          navigate("/login");
        }
      };

    fetchData();
  }, [navigate]);

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <PageContainer>
          <PageHeader>
            <BackLink to="/dashboard">
              <FiChevronLeft />
              Back to Dashboard
            </BackLink>
            <h1><FiBell /> Notifications</h1>
          </PageHeader>

          <NotificationList>
            {notifications.map(notification => (
              <NotificationItem 
                key={notification.id}
                unread={!notification.read}
                onClick={() => markAsRead(notification.id)}
              >
                {!notification.read && <UnreadIndicator />}
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
                <NotificationDate>
                  {new Date(notification.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </NotificationDate>
              </NotificationItem>
            ))}
          </NotificationList>
        </PageContainer>
      </Content>
    </DashboardContainer>
  );
};

export default NotificationPage;