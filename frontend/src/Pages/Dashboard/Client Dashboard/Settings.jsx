import React from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
`;

const SettingsContainer = styled.div`
  flex: 1;
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SettingsHeader = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 2.5rem;
`;

const SettingsSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  max-width: 500px;
`;

const Label = styled.label`
  display: block;
  color: #636e72;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #6c5ce7;
    outline: none;
  }
`;

const Button = styled.button`
  background: ${props => props.primary ? "#6c5ce7" : "#fff"};
  color: ${props => props.primary ? "#fff" : "#2d3436"};
  border: ${props => !props.primary && "1px solid #dfe6e9"};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 1rem;

  &:hover {
    background: ${props => props.primary ? "#5b4bc4" : "#f8f9fa"};
  }
`;

const DangerButton = styled(Button)`
  background: #ff7675;
  color: white;
  border: none;

  &:hover {
    background: #d63031;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #6c5ce7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 1.5rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #dfe6e9;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #6c5ce7;
  }

  input:checked + span:before {
    transform: translateX(24px);
  }
`;

const SettingsPage = () => {
  return (
    <DashboardContainer>
      <Sidebar />
      <SettingsContainer>
       <DashboardBanner />

        <SettingsSection>
          <SectionTitle>Account Settings</SectionTitle>
          <InputGroup>
            <Label>Password</Label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button>Change Password</Button>
              <DangerButton>Delete Account</DangerButton>
            </div>
          </InputGroup>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection>
          <SectionTitle>Appearance</SectionTitle>
          <InputGroup>
            <Label>Dark Mode</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ToggleSwitch>
                <input type="checkbox" />
                <span />
              </ToggleSwitch>
              <span>Enable Dark Mode</span>
            </div>
          </InputGroup>
        </SettingsSection>
      </SettingsContainer>
    </DashboardContainer>
  );
};

export default SettingsPage;