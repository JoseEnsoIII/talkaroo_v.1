import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  
    const handleStorageChange = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <NavContainer>
      <Logo to="/"><img src="/images/talkaroo.png" alt="Chat Icon" /></Logo>

      <NavLinks>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/vocabulary">Vocabulary</NavLink>
        <NavLink to="/grammar">Grammar</NavLink>
        <NavLink to="/practice">Practice</NavLink>
        <NavLink to="/community">Community</NavLink>
        <NavLink to="/Talkaroo-AI">AI Chat</NavLink>
        <NavLink to="/about-us">About Us</NavLink>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </NavLinks>

      <UserSection>
        {isLoggedIn ? (
          <UserMenu>
            <UserIcon onClick={() => setShowDropdown(!showDropdown)}>
              <FaUserCircle size={28} />
            </UserIcon>
            {showDropdown && (
              <Dropdown>
                {/* Mobile-only dropdown links */}
                <MobileDropdownLinks>
                  <DropdownLink to="/courses">Courses</DropdownLink>
                  <DropdownLink to="/vocabulary">Vocabulary</DropdownLink>
                  <DropdownLink to="/grammar">Grammar</DropdownLink>
                  <DropdownLink to="/practice">Practice</DropdownLink>
                  <DropdownLink to="/community">Community</DropdownLink>
                  <DropdownLink to="/Talkaroo-AI">AI Chat</DropdownLink>
                  <DropdownLink to="/about-us">About Us</DropdownLink>
                  <DropdownLink to="/contact-us">Contact Us</DropdownLink>
                </MobileDropdownLinks>
                <DropdownLink to="/dashboard">Profile</DropdownLink>
                <DropdownLink to="/dashboard/notification">Notifications</DropdownLink>
                <DropdownLink to="/dashboard/settings">Settings</DropdownLink>
                <DropdownButton onClick={handleLogout}>Logout</DropdownButton>
              </Dropdown>
            )}
          </UserMenu>
        ) : (
          <AuthContainer>
            <LoginLink to="/login">Login</LoginLink>
            <SignUpLink to="/signup">Sign Up</SignUpLink>
          </AuthContainer>
        )}
      </UserSection>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;

  img {
    height: 100px; /* Adjust this value based on your navbar height */
    width: auto;
  }

  @media (max-width: 768px) {
    img {
      height: 40px; /* Adjust for mobile view */
    }
  }
`;


const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #475569;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #6366f1;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const LoginLink = styled(Link)`
  color: #475569;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: #6366f1;
  }
`;

const SignUpLink = styled(Link)`
  background: #6366f1;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserMenu = styled.div`
  position: relative;
  cursor: pointer;
`;

const UserIcon = styled.div`
  color: #475569;
  transition: color 0.3s ease;

  &:hover {
    color: #6366f1;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 150px;
  z-index: 100;
`;

const MobileDropdownLinks = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: #475569;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #f8fafc;
    color: #6366f1;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  text-align: left;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8fafc;
    color: #ef4444;
  }
`;

export default Navbar;
