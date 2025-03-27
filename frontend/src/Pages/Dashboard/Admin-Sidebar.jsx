// src/components/AdminSidebar.js
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    NotificationOutlined,
    BookOutlined,
    SettingOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const SidebarContainer = styled(Sider)`
  background: linear-gradient(195deg, #1890ff, #0050b3) !important;
  min-height: 100vh;
  box-shadow: 4px 0 10px -3px rgba(0, 0, 0, 0.1);

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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h1 {
    color: white;
    margin: 0;
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    width: 100%;
  }
`;

const AdminSidebar = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const menuItems = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', onClick: () => navigate('/admin') },
        { key: 'users', icon: <UserOutlined />, label: 'Users', onClick: () => navigate('/admin/users') },
        { key: 'courses', icon: <BookOutlined />, label: 'Courses', onClick: () => navigate('/admin/courses') },
        { key: 'course-activities', icon: <BookOutlined />, label: 'Courses Activities', onClick: () => navigate('/admin/course-activities') },
        { key: 'notifications', icon: <NotificationOutlined />, label: 'Notifications', onClick: () => navigate('/admin/notification') },
        { key: 'feedback', icon: <BookOutlined />, label: 'Feedback', onClick: () => navigate('/admin/feedback') },
        { key: 'blog', icon: <BookOutlined />, label: 'Blog', onClick: () => navigate('/admin/blog') },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings', onClick: () => navigate('/admin/settings') },
        { key: 'logout', icon: <LogoutOutlined />, label: 'Log Out', onClick: handleLogout, style: { position: 'absolute', bottom: 20, width: 'calc(100% - 32px)' } }
    ];

    return (
        <SidebarContainer collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <LogoContainer>
                <a href='/'><h1>{!collapsed && 'Talkaroo Admin'}</h1></a>
            </LogoContainer>
            <Menu theme="dark" mode="inline" items={menuItems} selectable={false} />
        </SidebarContainer>
    );
};

export default AdminSidebar;
