import React from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaDatabase, FaUserLock } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <Container>

      <Content> <Title>Privacy Policy</Title>
        <LastUpdated>Last Updated: MArch 28, 2025</LastUpdated>
        <Section>
          <SectionTitle>
            <IconWrapper><FaShieldAlt /></IconWrapper>
            Introduction
          </SectionTitle>
          <Text>
            Your privacy is important to us. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our services.
          </Text>
        </Section>

        <Section>
          <SectionTitle>
            <IconWrapper><FaDatabase /></IconWrapper>
            Data Collection
          </SectionTitle>
          <Text>
            We may collect personal information that you voluntarily provide to us, including:
            <List>
              <ListItem>Name and contact information</ListItem>
              <ListItem>Account credentials</ListItem>
              <ListItem>Payment information</ListItem>
              <ListItem>Usage data and analytics</ListItem>
            </List>
          </Text>
        </Section>

        <Section>
          <SectionTitle>
            <IconWrapper><FaUserLock /></IconWrapper>
            Data Protection
          </SectionTitle>
          <Text>
            We implement security measures including:
            <List>
              <ListItem>SSL/TLS encryption</ListItem>
              <ListItem>Regular security audits</ListItem>
              <ListItem>Access controls</ListItem>
              <ListItem>Data anonymization where possible</ListItem>
            </List>
          </Text>
        </Section>

        <Section>
          <SectionTitle>Third-Party Services</SectionTitle>
          <Text>
            We may use third-party services that collect information used to identify you. 
            Refer to their privacy policies for details on their practices.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Cookies</SectionTitle>
          <Text>
            We use cookies and similar tracking technologies to:
            <CookieTableContainer>
              <CookieTable>
                <thead>
                  <tr>
                    <TableHeader>Purpose</TableHeader>
                    <TableHeader>Description</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {cookieData.map((cookie, index) => (
                    <tr key={index}>
                      <TableData>{cookie.purpose}</TableData>
                      <TableData>{cookie.description}</TableData>
                    </tr>
                  ))}
                </tbody>
              </CookieTable>
            </CookieTableContainer>
          </Text>
        </Section>

        <ContactSection>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactText>For privacy-related questions, contact us at:</ContactText>
          <ContactInfo>privacy@company.com</ContactInfo>
        </ContactSection>
      </Content>
    </Container>
  );
};

const cookieData = [
  { purpose: 'Authentication', description: 'Recognize logged-in users' },
  { purpose: 'Preferences', description: 'Store user settings' },
  { purpose: 'Analytics', description: 'Understand service usage' },
];

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;


const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const LastUpdated = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Content = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const IconWrapper = styled.span`
  color: #3498db;
  font-size: 1.2rem;
  min-width: 30px;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Text = styled.p`
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;

  @media (max-width: 480px) {
    padding-left: 1rem;
  }
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CookieTableContainer = styled.div`
  overflow-x: auto;
  margin: 1.5rem 0;
`;

const CookieTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;

  @media (max-width: 768px) {
    min-width: 350px;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #eee;
  background-color: #f8f9fa;
  font-weight: 600;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const ContactSection = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ContactText = styled.p`
  color: #555;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ContactInfo = styled.div`
  font-weight: 600;
  color: #3498db;
  font-size: 1.1rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export default PrivacyPolicy;