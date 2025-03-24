import React from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem 3rem;
`;

const NotificationContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 95%;
  max-width: none; 
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3436;
    margin: 0;
  }

  span {
    background: #4a90e2;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
  }
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid #f0f0f0;

  &:hover {
    background: #f8f9fa;
    transform: translateX(4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

const IconWrapper = styled.div`
  color: ${props => props.type === 'success' ? '#4CAF50' : 
    props.type === 'error' ? '#e74c3c' :
    props.type === 'info' ? '#4a90e2' : '#7f8c8d'};
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  background: ${props => `${props.type === 'success' ? '#4CAF50' : 
    props.type === 'error' ? '#e74c3c' :
    props.type === 'info' ? '#4a90e2' : '#7f8c8d'}15`};
`;

const Message = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    color: #2d3436;
  }

  p {
    margin: 0;
    color: #636e72;
    font-size: 0.875rem;
    line-height: 1.4;
  }
`;

const Time = styled.div`
  font-size: 0.75rem;
  color: #7f8c8d;
  min-width: 80px;
  text-align: right;
`;

const Notifications = () => {
  const [notifications] = React.useState([
    {
      id: 1,
      type: 'success',
      message: 'Your order has been successfully processed',
      date: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      type: 'error',
      message: 'Payment failed. Please check your payment information',
      date: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      type: 'info',
      message: 'New feature available! Check out our latest updates',
      date: new Date(Date.now() - 86400000)
    },
    {
      id: 4,
      type: 'info',
      message: 'Scheduled maintenance will occur tonight at 10 PM',
      date: new Date(Date.now() - 172800000)
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationCircle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return <FaBell />;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <DashboardBanner />
        <NotificationContainer>
          <Title>
            <h1>Notifications</h1>
            <span>{notifications.length} New</span>
          </Title>
          
          {notifications.map(notification => (
            <NotificationItem key={notification.id}>
              <IconWrapper type={notification.type}>
                {getIcon(notification.type)}
              </IconWrapper>
              <Message>
                <h3>{notification.message}</h3>
                <p>{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)} notification</p>
              </Message>
              <Time>
                {formatDistanceToNow(notification.date, { addSuffix: true })}
              </Time>
            </NotificationItem>
          ))}
        </NotificationContainer>
      </Content>
    </DashboardContainer>
  );
};

export default Notifications;