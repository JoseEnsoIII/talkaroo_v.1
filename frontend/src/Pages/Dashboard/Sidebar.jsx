// src/components/Sidebar.js
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SidebarContainer = styled.div`
  width: 250px;
  background-color:#1890ff;
  color: white;
  padding: 1rem;
  min-height: 100vh;
`;

const MenuItem = styled.div`
  padding: 0.8rem;
  cursor: pointer;
  border-radius: 4px;
  color:black;
  &:hover {
    background-color:rgb(255, 255, 255);
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <SidebarContainer>
      <h2>{userRole === 'admin' ? 'Admin Panel' : ''}</h2>
      {userRole === 'admin' ? (
        <>
          <MenuItem onClick={() => navigate('/admin')}>Dashboard</MenuItem>
          <MenuItem onClick={() => navigate('/profile/notification')}>Notifications</MenuItem>
          <MenuItem onClick={() => navigate('/dashboard/users')}>Users</MenuItem>
          <MenuItem onClick={() => navigate('/dashboard/courses')}>Courses</MenuItem>
          <MenuItem onClick={() => navigate('/dashboard/settings')}>Settings</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => navigate('/profile')}>Dashboard</MenuItem>
          <MenuItem onClick={() => navigate('/profile/profile')}>Profile</MenuItem>
          <MenuItem onClick={() => navigate('/profile/notification')}>Notifications</MenuItem>
          <MenuItem onClick={() => navigate('/profile/courses')}>My Courses</MenuItem>
          <MenuItem onClick={() => navigate('/profile/settings')}>Certificates</MenuItem>
          <MenuItem onClick={() => navigate('/profile/settings')}>Settings</MenuItem>
        </>
      )}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
