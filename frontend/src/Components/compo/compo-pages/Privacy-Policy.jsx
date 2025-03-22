import React from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaDatabase, FaUserLock } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <Container>
      <Header>
        <Title>Privacy Policy</Title>
        <LastUpdated>Last Updated: January 1, 2024</LastUpdated>
      </Header>

      <Content>
        <Section>
          <SectionTitle>
            <FaShieldAlt className="icon" />
            Introduction
          </SectionTitle>
          <Text>
            Your privacy is important to us. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our services.
          </Text>
        </Section>

        <Section>
          <SectionTitle>
            <FaDatabase className="icon" />
            Data Collection
          </SectionTitle>
          <Text>
            We may collect personal information that you voluntarily provide to us, including:
            <List>
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Usage data and analytics</li>
            </List>
          </Text>
        </Section>

        <Section>
          <SectionTitle>
            <FaUserLock className="icon" />
            Data Protection
          </SectionTitle>
          <Text>
            We implement security measures including:
            <List>
              <li>SSL/TLS encryption</li>
              <li>Regular security audits</li>
              <li>Access controls</li>
              <li>Data anonymization where possible</li>
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
            <CookieTable>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {cookieData.map((cookie, index) => (
                  <tr key={index}>
                    <td>{cookie.purpose}</td>
                    <td>{cookie.description}</td>
                  </tr>
                ))}
              </tbody>
            </CookieTable>
          </Text>
        </Section>

        <ContactSection>
          <h3>Contact Us</h3>
          <p>For privacy-related questions, contact us at:</p>
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LastUpdated = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const Content = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .icon {
    color: #3498db;
  }
`;

const Text = styled.p`
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
`;

const CookieTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  overflow-x: auto;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const ContactSection = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 2rem;
`;

const ContactInfo = styled.div`
  font-weight: 600;
  color: #3498db;
  margin-top: 0.5rem;
  font-size: 1.1rem;
`;

export default PrivacyPolicy;