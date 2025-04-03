import React, { useState, useEffect, useRef } from "react";
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
  position: relative;
  z-index: 100;
  transition: border-radius 0.3s ease;

  @media (max-width: 1024px) {
    width: 95%;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    width: 95%;
    margin: 0.5rem auto;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: none;
    border-bottom: 1px solid #eee;
  }

  @media (max-width: 480px) {
    width: 95%;
    border-radius: 2px;
  }

  @media (pointer: coarse) {
    padding: 1rem;
  }
`;

const BannerTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.1rem, 1.5vw + 0.5rem, 1.5rem);
  text-align: left;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60vw;
  line-height: 1.3;

  @media (max-width: 768px) {
    max-width: 50vw;
    font-size: clamp(1rem, 4vw, 1.2rem);
  }

  @media (max-width: 480px) {
    max-width: 60vw;
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationIcon = styled.div`
  font-size: clamp(1.2rem, 1.5vw + 0.5rem, 1.5rem);
  cursor: pointer;
  position: relative;
  color: #2c3e50;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 50%;
  background: ${({ $active }) => $active ? '#f0f4f8' : 'transparent'};

  &:hover {
    color: #1890ff;
    background: #f0f4f8;
  }

  @media (pointer: coarse) {
    padding: 12px;
    min-width: 44px;
    min-height: 44px;
    display: grid;
    place-items: center;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff4757;
  color: white;
  font-size: 0.7rem;
  padding: 2px 5px;
  border-radius: 50%;
  min-width: 18px;
  text-align: center;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.6rem;
    min-width: 16px;
    top: 0;
    right: 0;
  }
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  width: min(320px, 90vw);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  z-index: 1000;
  max-height: 60vh;
  overflow-y: auto;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    top: 40px;
  }

  @media (max-height: 600px) {
    max-height: 50vh;
  }
`;

const NotificationItem = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  background: ${(props) => (props.$unread ? "#f8f9fa" : "white")};
  transition: background 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f1f3f5;
  }
`;

const NotificationLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const NotificationMessage = styled.p`
  margin: 0 0 0.25rem 0;
  font-size: 0.8rem;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NotificationDate = styled.span`
  font-size: 0.7rem;
  color: #868e96;
  display: block;
  margin-top: 0.25rem;
`;

const EmptyState = styled.div`
  padding: 1rem;
  text-align: center;
  color: #868e96;
  font-size: 0.9rem;
`;

const pageTitles = {
  "/dashboard": "Welcome to Your Dashboard",
  "/dashboard/my-courses": "My Courses",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
  "/dashboard/certificate": "Certificate",
  "/dashboard/notification": "Notifications",
  "/admin": "Admin Dashboard",
  "/admin/users": "User Management",
  "/admin/courses": "Course Management",
  "/admin/course-activities": "Course Activities",
  "/admin/notification": "System Notifications",
  "/admin/blog": "Content Management",
  "/admin/feedback": "User Feedback",
  "/admin/settings": "System Settings",
  "/admin/course-activities/vocabs": "Vocabulary Activities",
};

const DashboardBanner = () => {
  const location = useLocation();
  const wrapperRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: "New Course Available", 
      message: "Advanced React Development course is now live!", 
      date: "2024-09-20", 
      read: false 
    },
    { 
      id: 2, 
      title: "System Maintenance Notice", 
      message: "Scheduled maintenance on Saturday, 10:00 PM to 12:00 AM UTC", 
      date: "2024-09-18", 
      read: true 
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <BannerContainer>
      <BannerTitle>{title}</BannerTitle>
      <NotificationWrapper ref={wrapperRef}>
        <NotificationIcon 
          onClick={() => setShowNotifications(!showNotifications)}
          $active={showNotifications}
          aria-label="Notifications"
          role="button"
        >
          <FiBell />
          {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
        </NotificationIcon>
        
        {showNotifications && (
          <NotificationDropdown role="menu">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem 
                  key={notification.id}
                  $unread={!notification.read}
                  role="menuitem"
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
                      {new Date(notification.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </NotificationDate>
                  </NotificationLink>
                </NotificationItem>
              ))
            ) : (
              <EmptyState>No new notifications</EmptyState>
            )}
          </NotificationDropdown>
        )}
      </NotificationWrapper>
    </BannerContainer>
  );
};

export default DashboardBanner;