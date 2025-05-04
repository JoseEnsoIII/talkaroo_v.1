import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const EntryNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavContainer>
        <Logo to="/">
          <img src="/images/talkaroo.png" alt="Talkaroo Logo" />
        </Logo>

        <NavLinks isOpen={isOpen}>
        <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/about-us">About Us</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
          <MobileAuthButton to="/login">Login</MobileAuthButton>
        </NavLinks>

        <AuthButton to="/login">Login</AuthButton>
        
        <Hamburger onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </Hamburger>
      </NavContainer>

      <MobileMenu isOpen={isOpen}>
      <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
        <MobileNavLink to="/courses" onClick={toggleMenu}>Courses</MobileNavLink>
        <MobileNavLink to="/about-us" onClick={toggleMenu}>About Us</MobileNavLink>
        <MobileNavLink to="/contact-us" onClick={toggleMenu}>Contact Us</MobileNavLink>
        <MobileAuthButton to="/login" onClick={toggleMenu}>Login</MobileAuthButton>
      </MobileMenu>
    </>
  );
};

const NavContainer = styled.nav`
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(Link)`
  img {
    height: 100%;
    max-height:90px;
    width: auto;
  }

  @media (max-width: 768px) {
    img {
      height: 40px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem;

  &:hover {
    color: #6366f1;
  }
`;

const AuthButton = styled(Link)`
  background: #6366f1;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  color: #475569;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  background: white;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  }
`;

const MobileNavLink = styled(Link)`
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.3s ease;

  &:hover {
    color: #6366f1;
    background: #f8fafc;
  }
`;

const MobileAuthButton = styled(Link)`
  background: #6366f1;
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  margin-top: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

export default EntryNavbar;