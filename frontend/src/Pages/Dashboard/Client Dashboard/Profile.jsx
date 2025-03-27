import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import { FiUser, FiEdit, FiLock, FiMail } from "react-icons/fi";
import axios from "axios";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
`;

const Content = styled.div`
  flex: 1;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.875rem;
  padding-left: 2.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8fafc;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: white;
  }

  &:disabled {
    background: #f1f5f9;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SaveButton = styled.button`
  background: ${({ secondary }) => (secondary ? "#64748b" : "#3b82f6")};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    background: ${({ secondary }) => (secondary ? "#475569" : "#2563eb")};
  }
`;

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // Password is handled separately
  const userId = 1;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const { username, first_name, last_name, email } = response.data;
        setUserData({ username, first_name, last_name, email });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...userData };
      if (newPassword) updatedData.password = newPassword;

      await axios.patch(`http://localhost:5000/api/users/${userId}`, updatedData);
      setEditMode(false);
      setNewPassword(""); // Reset password field after update
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <DashboardBanner />
        <FormContainer>
          <FormRow>
            <InputGroup>
              <Label>Username</Label>
              <InputWrapper>
                <IconWrapper>
                  <FiUser size={18} />
                </IconWrapper>
                <Input
                  value={userData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  disabled={!editMode}
                  placeholder="Enter username"
                />
              </InputWrapper>
            </InputGroup>
            <ActionButtons>
              {editMode ? (
                <>
                  <SaveButton onClick={handleSave}>
                    <FiUser /> Save Changes
                  </SaveButton>
                  <SaveButton onClick={() => setEditMode(false)} secondary>
                    Cancel
                  </SaveButton>
                </>
              ) : (
                <SaveButton onClick={() => setEditMode(true)}>
                  <FiEdit /> Edit Profile
                </SaveButton>
              )}
            </ActionButtons>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label>First Name</Label>
              <Input
                value={userData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                disabled={!editMode}
                placeholder="First name"
              />
            </InputGroup>

            <InputGroup>
              <Label>Last Name</Label>
              <Input
                value={userData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                disabled={!editMode}
                placeholder="Last name"
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label>Email Address</Label>
              <InputWrapper>
                <IconWrapper>
                  <FiMail size={18} />
                </IconWrapper>
                <Input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!editMode}
                  placeholder="your.email@example.com"
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <Label>New Password</Label>
              <InputWrapper>
                <IconWrapper>
                  <FiLock size={18} />
                </IconWrapper>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!editMode}
                  placeholder="••••••••"
                />
              </InputWrapper>
            </InputGroup>
          </FormRow>
        </FormContainer>
      </Content>
    </DashboardContainer>
  );
};

export default ProfilePage;