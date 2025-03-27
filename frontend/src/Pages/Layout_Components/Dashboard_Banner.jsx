import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";

const BannerContainer = styled.div`
  width: 95%;
  max-width: 100vw;
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin: 1rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  // Remove the color: white here as it was affecting all child elements
`;

const BannerTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  text-align: left;
  color: #2c3e50; // Add text color
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  color: #2c3e50; // Add explicit color
  transition: color 0.2s ease;

  &:hover {
    color: #1890ff;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 50%;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem;
  z-index: 10;
`;

const NotificationItem = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background: ${(props) => (props.unread ? "#f1f1f1" : "white")};
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: block;
`;

const NotificationTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
`;

const NotificationDate = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

const pageTitles = {
  // Client Dashboard
  "/dashboard": "Welcome to Your Dashboard",
  "/dashboard/my-courses": "My Courses",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
  "/dashboard/certificate": "Certificate",
  "/dashboard/notification": "Notifications",

  // Admin Dashboard
  "/admin": "Admin Dashboard",
  "/admin/users": "Admin Users",
  "/admin/courses": "Admin Courses",
  "/admin/course-activities": "Admin Course Activities",
  "/admin/notification": "Admin Notifications",
  "/admin/blog" : "Admin Blogs",
  "/admin/feedback": "Admin Feedback",
  "/admin/settings": "Admin Settings"
};

const DashboardBanner = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Course Available", message: "React Advanced is now live!", date: "2024-09-20", read: false },
    { id: 2, title: "Assignment Due", message: "Submit your project by next week.", date: "2024-09-18", read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <BannerContainer>
      <BannerTitle>{title}</BannerTitle>
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
                  to="/dashboard/notification"
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
    </BannerContainer>
  );
};

export default DashboardBanner;
