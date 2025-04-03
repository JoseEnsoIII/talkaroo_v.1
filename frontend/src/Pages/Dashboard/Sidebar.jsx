// src/components/UserSidebar.js
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  NotificationOutlined,
  BookOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const SidebarContainer = styled(Sider)`
  background: linear-gradient(195deg, #1890ff, #0050b3) !important;
  min-height: 100vh;
  box-shadow: 4px 0 10px -3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transform: ${props => (props.collapsed ? 'translateX(-100%)' : 'translateX(0)')};
    height: 100vh;
    width: 250px !important;
    max-width: 100vw;
  }

  .ant-menu {
    background: transparent;
    color: rgba(255, 255, 255, 0.9);
    border-right: none;
  }

  .ant-menu-item {
    margin: 8px 16px !important;
    border-radius: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.15) !important;
    }

    &::after {
      display: none !important;
    }
  }

  .ant-menu-item-selected {
    background: rgba(255, 255, 255, 0.25) !important;
    font-weight: 500;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h1 {
    color: white;
    margin: 0;
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    width: 100%;
    transition: opacity 0.3s ease;
  }
`;

const HamburgerButton = styled.button`
  position: fixed;
  left: ${props => (props.collapsed ? '20px' : 'calc(100% - 60px)')};
  top: 20px;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.9) !important;
  border: none;
  border-radius: 50%;
  color: #1890ff !important;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  display: ${props => (props.hidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: white !important;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const UserSidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-collapse when mobile detected
      setCollapsed(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleTouchStart = (e) => {
    const touch = e.targetTouches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const distanceX = touch.clientX - touchStartX;
    const distanceY = Math.abs(touch.clientY - touchStartY);
    const minSwipeDistance = 50;

    if (Math.abs(distanceX) > distanceY && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0 && collapsed) {
        setCollapsed(false);
      } else if (distanceX < 0 && !collapsed) {
        setCollapsed(true);
      }
    }
  };

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', onClick: () => navigate('/dashboard') },
    { key: 'profile', icon: <UserOutlined />, label: 'Profile', onClick: () => navigate('/dashboard/profile') },
    { key: 'notifications', icon: <NotificationOutlined />, label: 'Notifications', onClick: () => navigate('/dashboard/notification') },
    { key: 'courses', icon: <BookOutlined />, label: 'My Courses', onClick: () => navigate('/dashboard/my-courses') },
    { key: 'certificates', icon: <FileTextOutlined />, label: 'Certificates', onClick: () => navigate('/dashboard/certificate') },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings', onClick: () => navigate('/dashboard/settings') },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Log Out', onClick: handleLogout, style: { position: 'absolute', bottom: 20, width: 'calc(100% - 32px)' } }
  ];

  return (
    <>
     <HamburgerButton
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
        hidden={!isMobile}
      >
        {collapsed ? <MenuOutlined /> : <CloseOutlined />}
      </HamburgerButton>

      <SidebarContainer
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        collapsible
        trigger={null}
      >
        <LogoContainer>
          <a href='/'><h1>{!collapsed && 'Talkaroo'}</h1></a>
        </LogoContainer>
        <Menu theme="dark" mode="inline" items={menuItems} selectable={false} />
      </SidebarContainer>
    </>
  );
};

export default UserSidebar;